import {useState,useEffect} from 'react';
import {BiCopyAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';

export default function IdeasComponent(argument) {
	// body...
	const [loader,setLoader] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState('');
	const [industry,setIndustry] = useState('');
	const [target,setTarget] = useState('');
	const [budget,setBudget] = useState('');
	const [problem,setProblem] = useState('');
	const [additional,setAdditional] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showPricingState,setShowPricingState] = useState(false);
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


	const ideasNowWithPrompt = async() => {
		setLoader(true);
		setGeneratedResponse('');
		document.getElementById('resultContainer').classList.remove('hidden');
		const element =document.getElementById('resultBox');
		document.getElementById('resultContainer').scrollIntoView({behavior:"smooth",block:"center"})
		element.innerHTML = "";
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt:`Generate several variation of business ideas for the ${industry} industry that target ${target}, have a budget of ${budget},with a focus on solving the problem of ${problem} ${additional ? `and take into account the additional information provided: ${additional}`:"."} `,
			temperature: 0.3,
	  		max_tokens: 2500,
	  		top_p: 1,
	  		frequency_penalty: 0.5,
	  		presence_penalty: 0
		})
		const parsedData = response.data.choices[0].text;
		setGeneratedResponse(parsedData);
		typeMessageMain(element,parsedData)
	}

	const typeMessageMain = (element,text) =>{

		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth"});

		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
				setLoader(false); 	
			}
		},20)
	}


	const ideasNow = () => {
		if(!industry){
			const element = document.getElementById('industry_box')
			element.classList.add('animate-pulse','border-red-500')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('animate-pulse','border-red-500');
			}, 2500);
		}else if(!target){
			const element = document.getElementById('target_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!budget){
			const element = document.getElementById('budget_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!problem){
			const element = document.getElementById('problem_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(currentUser?.blueToken>0){
 			ideasNowWithPrompt();
 			reduceOneBlueToken();
 		}else{
 			showPricing();
 		}
	}

 	const reduceOneBlueToken = async() => {
 		let blueToken = currentUser.blueToken;
 		blueToken = blueToken - 1;
 		const userId = currentUser._id
 		const {data} = await axios.post(reduceOneBlueTokenRoutes,{
 			blueToken,userId
 		});
        setCurrentUser(data.obj)
 	}

  	const showPricing = () => {
		setShowPricingState(!showPricingState)
  	}

	const copyResponse = () => {
		navigator.clipboard.writeText(generatedResponse);
		document.getElementById('copycode_icon').classList.add('text-green-500');
	}

	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-indigo-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-indigo-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>	

		<Header2 hide="true" redirect="ideas" token="blue" />
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
    		<h1 className="text-4xl md:text-5xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Bussiness <span className="text-orange-500">Ideas</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
    			<div className="w-full z-10 mt-10 rounded-xl py-2 flex md:flex-row flex-col">
	    			<div 
	    			id="industry_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Industry <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="industry_box"
	    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
							<input 
							value={industry}
							placeholder="ex:- Technology, food and beverage..."
							onChange={(e)=>setIndustry(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 
							text-white focus:ring-orange-500 focus:border-orange-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="target_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Target <span className="text-sky-500">Audience</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="target_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-sky-400 flex-col">
							<input 
							value={target}
							placeholder="ex:- Normal Peoples, Students..."
							onChange={(e)=>setTarget(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>
	    		</div>
	    		<div className="w-full z-10 mt-10 rounded-xl py-2 flex flex-col">
	    			<div 
	    			id="budget_container"
	    			className="px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-orange-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Your <span className="text-orange-500">budget</span> range <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="budget_box"
	    				className="w-full md:ml-[52px] md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-orange-500 flex-col">
							<input 
							value={budget}
							placeholder="ex:- Between 50000 to 100000 in INR"
							onChange={(e)=>setBudget(e.target.value)}
							id="countries" className="border h-full outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 resize-none
							text-white focus:ring-sky-500 focus:border-sky-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="problem_container"
	    			className="px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-orange-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Problem to be <span className="text-orange-500">solved </span><span className="text-red-500">*</span></h1>
	    				<div 
	    				id="problem_box"
	    				className="w-full h-[170px] md:h-[110px] md:ml-8 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-orange-500 flex-col">
							<textarea 
							value={problem}
							placeholder="ex:- Difficulty in finding healthy meal options"
							onChange={(e)=>setProblem(e.target.value)}
							className="border h-full outline-none resize-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-500 placeholder-gray-400 text-white focus:ring-sky-500 focus:border-sky-500"/>												
	    				</div>
	    			</div>
	    			<div 
	    			id="additional_container"
	    			className="px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-orange-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Additional <span className="text-sky-500">Information</span></h1>
	    				<div 
	    				id="additional_box"
	    				className="w-full h-[170px] md:h-[110px] md:ml-8 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-orange-500 flex-col">
							<textarea 
							value={additional}
							placeholder="ex:- I want ideas to be eco friendly"
							onChange={(e)=>setAdditional(e.target.value)}
							className="border h-full outline-none resize-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-500 placeholder-gray-400 text-white focus:ring-sky-500 focus:border-sky-500"/>												
	    				</div>
	    			</div>
	    		</div>
	    		<center>
				<button onClick={()=>{if(!loader)ideasNow();}} className="mt-7 bg-green-700 
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
				transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Generate'
					}
				</button>
			</center>
			<div className="flex gap-1 mt-4 items-center justify-center">
				<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-10 w-10"/>
				<h1 className={` md:text-xl text-md font-bold ${currentUser?.blueToken < 1 ? 'text-red-500':'text-sky-400'}`}>1</h1>
			</div>
    		<div id="resultContainer" className="flex flex-col hidden relative hiden mt-7 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
				px-3 font-sourceCode py-3 no-scrollbar bg-black/20">
					<h1 className="text-xl font-medium mx-auto mb-2	 text-center">Result</h1>
					<div 
    				onClick={copyResponse}
    				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
    					
    					<BiCopyAlt id="copycode_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
    				</div>
    				{
    					generatedResponse ? 
    					""
    					:
    					<div className="flex mx-auto">
    						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
        					alt=""
        					className="h-7 w-7 mr-5"
        					/>
        					Generating Ideas
    					</div>
    				}
    				<div id="resultBox" className="flex font-sourceCode whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll"/>
				</div>

				<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>
    	</motion.div>

    </div>



	)
}