import {useState,useEffect} from 'react';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import {BiCopyAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {setPromptRoute,setChatRoute,setNamesRoute} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';






export default function GfComponent() {
	// body...
	const [prompt,setPrompt] = useState('');
	const [name,setName] = useState('');
	const [triats,setTriats] = useState('');
	const [loader,setLoader] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState('');
	const [type,setType] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [answerFor,setAnswerFor] = useState('');
	const [showPricingState,setShowPricingState] = useState(false);
	const [interests,setInterests] = useState('');
	const [goals,setGoals] = useState('');
	const [gender,setGender] = useState('girl');
	const [communication,setCommunication] = useState('');
	const [writeText,setWriteText] = useState('');
	const [currentChats,setCurrentChats] = useState([]);

	const configuration = new Configuration({
	  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	useEffect(()=>{
		if(loader){
			document.getElementById('upperDesign').classList.add('animate-ping');
			document.getElementById('lowerDesign').classList.add('animate-ping');
		}else{
			document.getElementById('upperDesign').classList.remove('animate-ping');
			document.getElementById('lowerDesign').classList.remove('animate-ping');
		}
	},[loader])	

	const createNow = () => {
		if(!name){
			const element = document.getElementById('name_box')
			element.classList.add('animate-pulse','border-red-500')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('animate-pulse','border-red-500');
			}, 2500);
		}else if(!triats){
			const element = document.getElementById('triats_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!interests){
			const element = document.getElementById('interests_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!goals){
			const element = document.getElementById('goals_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!communication){
			const element = document.getElementById('communcation_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else{
 			createNowConfirm();
 		}
	}

	const createNowConfirm = async() => {
		setLoader(true);
		const userId=currentUser._id
		const chats = [{
			ai:true,
			message:`Hey! ${currentUser.username}, What's up`
		}]
		const {data} = await axios.post(setChatRoute,{
			chats,userId
		})
		setCurrentUser(data.obj);
		setNames(userId);	
	}

	const setNames = async(userId) => {
		const gfName = name;
		const currentName = currentUser.username;
		const {data} = await axios.post(setNamesRoute,{
			gfName,currentName,userId
		})
		setCurrentUser(data.obj);
		setPromptGf(userId);
	}

	const setPromptGf = async(userId) => {
		const gfPrompt = `Hello OpenAi, I want you to act like my ${gender}friend , my name is ${currentUser.username}, your name and age should be ${name}. Your Personality triats is ${triats}, and your interests include ${interests}. Our Relationship goal is ${goals} and your communication style should be ${communication}.Start the conversation.`
		const {data} = await axios.post(setPromptRoute,{
			gfPrompt,userId
		})
		setCurrentUser(data.obj);
		setLoader(false);
	}


	const setExample = () => {
		if(gender==='girl'){
			setName('Sara , Age:- 19');
		}else{
			setName('Surya , Age:- 19');
		}
		setTriats('Caring,Independent,Fun-Loving,Creative');
		setInterests('Traveling,Gaming,Art,Karathe');
		setGoals('Supportive and understanding partner who is open to new experiences and always up for an adventure');
		setCommunication('Casual and light-hearted conversations that are fun and engaging');

	}

	const sendMessage = async(text) => {
		const chat = {
			ai:false,
			message:text
		}
		const userId = currentUser._id;
		const chats = [...currentUser.chats,chat];
		replyFromAi(text,chats);
                const {data} = await axios.post(setChatRoute,{
			chats,userId
		})
		setCurrentUser(data.obj);
		
	}

	const replyFromAi = async(text,chatsArg) => {
		
		const prompt = `${currentUser.gfPrompt}\n
		${chatsArg.chats.map((chat,i,{length})=>{
			const reqIndex = length-6
			if(i>reqIndex){
				return (
					chat.ai ? 
					`${currentUser.gfName} :- ${chat.message}\n\n`
					:
					`${currentUser.currentName} :- ${chat.message}\n\n`
				)	
			}
			})}
		${currentUser.gfName} :- 
		`
		
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt:prompt,
			temperature: 0.3,
	  		max_tokens: 2500,
	  		top_p: 1,
	  		frequency_penalty: 0.5,
	  		presence_penalty: 0
		})
		const parsedData = response.data.choices[0].text;
		setWriteText(parsedData);
		const chat = {
			ai:true,
			message:parsedData
		}
		const userId = currentUser._id;
		const chats = [...chatsArg.chats,chat];
		const {data} = await axios.post(setChatRoute,{
			chats,userId
		})
		setCurrentUser(data.obj);
	}

  	const showPricing = () => {
		setShowPricingState(!showPricingState)
  	}

  	const clearChat = async() => {
  		if(confirm('Do You Really wish to clear all the chats with your AI partner')){
  			setLoader(true)
  			const chats = [];
  			const userId = currentUser._id;
			const {data} = await axios.post(setChatRoute,{
				chats,userId
			})
			setCurrentUser(data.obj);
			setLoader(false)
			location.reload()
  		}
  	}

  	const deletePartner = async() => {
  		if(confirm('Do you really wish to delete your AI partner and all the chats')){
  			setLoader(true);
	  		const gfPrompt = "";
	  		const userId = currentUser._id;
	  		const {data} = await axios.post(setPromptRoute,{
				gfPrompt,userId
			})
			setCurrentUser(data.obj);
			setLoader(false);
		}
  	}


	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-pink-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-pink-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<img src="https://static.vecteezy.com/system/resources/thumbnails/010/975/971/small/pink-gradient-heart-gradient-heart-button-free-png.png" 
		className="fixed md:h-[190px] md:w-[190px] h-[115px] w-[115px] top-[120px] left-8 -rotate-[30deg] opacity-20" alt=""
		/>
		<img src="https://static.vecteezy.com/system/resources/thumbnails/010/975/971/small/pink-gradient-heart-gradient-heart-button-free-png.png" 
		className="fixed md:h-[190px] md:w-[190px] h-[115px] w-[115px] md:bottom-[90px] bottom-[40px] right-8 rotate-[30deg] opacity-20" alt=""
		/>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>
		<motion.div 
          initial={{
            opacity:0
          }}
          whileInView={{
            opacity:[0.4,0.15]
          }}
          transition={{
            duration:2
          }}
          className="absolute z-0 h-full w-full bg-fixed
          bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/Robot_Black_background_509385_xg9dLEZncY.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673449581991')] "
        />

		<Header2 hide="true" redirect="gf" />
		{
			currentUser.gfPrompt ? 
			<div className="w-full h-full">
    			<ChatBox currentUser={currentUser} sendMessage={sendMessage} writeText={writeText} 
    			setWriteText={setWriteText} currentChats={currentChats} setCurrentChats={setCurrentChats} 
    			clearChat={clearChat} deletePartner={deletePartner} />    			
			</div>
			:
		<>
        <motion.div 
        initial={{
        	opacity:0,
        }}
        whileInView={{
        	opacity:1,
        }}
        transition={{
        	duration:1
        }}
        className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px]
    	scroll-smooth">	
    		<h1 className={`${currentUser.gfPrompt ? "text-xl md:text-2xl" : "text-4xl md:text-5xl"}  mb-3 text-[#FFF] text-shadow-fire mx-auto`}>Virtual AI<span className="text-rose-400"> Partner</span></h1>	
    		<div className={`h-[2px] w-[50%] md:w-[25%] mx-auto bg-rose-500 ${currentUser.gfPrompt && 'md:w-[15%] w-[40%]'} `}/>
    			<h1 className="text-2xl md:text-3xl text-[#FFF] mt-5 text-shadow-fire mx-auto">Create your AI Girlfriend / Boyfriend</h1>	
    			<center>
					<button onClick={setExample} className="mt-7 bg-indigo-700 
					w-[130px] mx-auto md:text-lg text-md text-gray-200 tracking-[3px] px-3 py-2 rounded-full hover:bg-indigo-500/90 
					transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
						{
							loader? 
							<CircularProgress color="inherit" />
							:
							'Sample'
						}
					</button>
				</center>
				<div className="w-full z-10 mt-6 rounded-xl px-2 py-2 flex md:flex-row justify-center flex-col">
	    			<div 
	    			id="language_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-rose-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3"><span className="text-sky-500">Gender</span></h1>
	    				<div 
	    				id="language_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-rose-400 focus-within:border-sky-400 flex-col">
							<select 
							value={gender}
							onChange={(e)=>setGender(e.target.value)}
							id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
							  <option value="girl">Female</option>
							  <option value="boy">Male</option>
							</select>												
	    				</div>
	    			</div>    			
	    		</div>
				<div className="w-full z-10 mt-10 rounded-xl py-2 flex md:flex-row flex-col">
	    			<div 
	    			id="industry_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-rose-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Name & Age <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="name_box"
	    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-rose-400 focus-within:border-sky-400 flex-col">
							<input 
							value={name}
							placeholder="Name,age and preferences"
							onChange={(e)=>setName(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 
							text-white focus:ring-orange-500 focus:border-orange-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="target_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-rose-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Personality <span className="text-sky-500">triats</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="triats_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-rose-400 focus-within:border-sky-400 flex-col">
							<input 
							value={triats}
							placeholder="Personality partner to have"
							onChange={(e)=>setTriats(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>
	    		</div>
	    		<div className="w-full z-10 mt-10 rounded-xl py-2 flex md:flex-row flex-col">
	    			<div 
	    			id="industry_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-rose-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Interests <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="interests_box"
	    				className="w-full md:h-[150px] h-[200px] md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-rose-400 focus-within:border-sky-400 flex-col">
							<textarea 
							value={interests}
							placeholder="3-5 Interests of your virtual partner"
							onChange={(e)=>setInterests(e.target.value)}
							id="countries" className="border h-full outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white resize-none focus:ring-orange-500 focus:border-orange-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="goals_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-rose-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Relationship<span className="text-orange-500"> Goals</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="goals_box"
	    				className="w-full md:h-[150px] h-[200px]  md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-rose-400 focus-within:border-sky-400 flex-col">
							<textarea 
							value={goals}
							placeholder="Your goals with AI partner"
							onChange={(e)=>setGoals(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 h-full resize-none text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>
	    		</div>
				<div className="w-full z-10 mt-6 rounded-xl px-2 py-2 flex md:flex-row justify-center flex-col">
				<div 
				id="communication_container"
				className="md:w-[70%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-rose-400 focus-within:border-sky-400 w-full">
					<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Communication <span className="text-sky-500">Style</span></h1>
					<div 
					id="communication_box"
					className="w-full md:h-[150px] h-[200px]  md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
					border-rose-400 focus-within:border-sky-400 flex-col">
						<textarea 
						value={communication}
						placeholder="Preferred communication style"
						onChange={(e)=>setCommunication(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 h-full resize-none text-white focus:ring-orange-500 focus:border-orange-500"/>												
					</div>
				</div>    			
			</div>
			<center>
				<button onClick={()=>{if(!loader)createNow();}} className="mt-7 bg-green-700 
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
				transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Create'
					}
				</button>
			</center>	
			<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>    		
    		</motion.div>
    		</>	
    		}
    		
    </div>


	)
}
