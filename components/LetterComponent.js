import {useState,useEffect} from 'react';
import {BiCopyAlt} from 'react-icons/bi';
import InfoBox from './InfoBox';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';



export default function LetterComponent() {
	// body...
	const [infoVisiblity,setInfoVisiblity] = useState(false);
	const [prompt,setPrompt] = useState('');
	const [loader,setLoader] = useState('');
	const [otherLetterType,setOtherLetterType] = useState('');
	const [otherFormalType,setOtherFormalType] = useState('');
	const [confirmBoxVisibility,setConfirmBoxVisibility] = useState(false);
	const [formalOrInformal,setFormalOrInformal] = useState('formal');
	const [letterType,setLetterType] = useState('');
	const [senderName,setSenderName] = useState('');
	const [recipientName,setRecipientName] = useState('');
	const [generatedLetter,setGeneratedLetter] = useState('');
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

	const formal_letter = ["Business letter","Cover letter","Formal letter","Request letter",
	"Complaint letter","Acknowledgment letter","Sales letter","Appointment letter","Confirmation letter",
	"Credit letter","Adjustment letter","Termination letter","Authorization letter","Reference letter",
	"Retirement letter","Transfer letter","Disciplinary letter","Warning letter","Memo letter","Appeal letter"]

	const informal_letter = ["Personal letter","Love Letter","Information letter","Invitation letter","Compliment letter",
	"Thank-you letter","Proposal letter","Welcome letter","Farewell letter","Recommendation letter",
	"Apology letter"];


	const writeLetterNow = async() => {
		setLoader(true);
		setGeneratedLetter('');
		document.getElementById('resultContainer').classList.remove('hidden');
		const element =document.getElementById('letter_block');
		element.innerHTML = "";
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt:`Please generate a ${formalOrInformal==='other' ? otherFormalType : formalOrInformal } ${letterType==='other' ? otherLetterType : letterType} letter for ${senderName} to ${recipientName}.\nThe letter should include the following information: ${prompt}. \nPlease ensure that the letter follows the proper format and language for a ${formalOrInformal==='other' ? otherFormalType : formalOrInformal } ${letterType==='other' ? otherLetterType : letterType} letter, and includes the sender's and recipient's contact information and any closing or signature information.`,
			temperature: 0.3,
	  		max_tokens: 2000,
	  		top_p: 1,
	  		frequency_penalty: 0.5,
	  		presence_penalty: 0
		})
		const parsedData = response.data.choices[0].text;
		setGeneratedLetter(parsedData);
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




	const writeNow = () => {
		if(prompt.length<10){
			document.getElementById('content_box').classList.add('border-red-500');
			setTimeout(function() {
				document.getElementById('content_box').classList.remove('border-red-500');
			}, 1500);
		}else if(senderName.length<3){
			document.getElementById('sender_box').classList.add('border-red-500');
			setTimeout(function() {
				document.getElementById('sender_box').classList.remove('border-red-500');
			}, 1500);
		}else if(recipientName.length<3){
			document.getElementById('recipient_box').classList.add('border-red-500');
			setTimeout(function() {
				document.getElementById('recipient_box').classList.remove('border-red-500');
			}, 1500);
		}else if(formalOrInformal==='other' || letterType==='other' ){
			if(formalOrInformal==='other' && otherFormalType.length<3){
				document.getElementById('formalorinformal_box').classList.add('border-red-500');
				document.getElementById('formalorinformal_container').classList.add('border-red-500');
				document.getElementById('formalorinformal_box').scrollIntoView({behavior:"smooth",block:"center"})
				setTimeout(function() {
					document.getElementById('formalorinformal_box').classList.remove('border-red-500');
					document.getElementById('formalorinformal_container').classList.remove('border-red-500');
				}, 3000);
			}else if(letterType==='other' && otherLetterType.length<3){
				document.getElementById('lettertype_box').classList.add('border-red-500');
				document.getElementById('lettertype_container').classList.add('border-red-500');
				document.getElementById('lettertype_box').scrollIntoView({behavior:"smooth",block:"center"})
				setTimeout(function() {
					document.getElementById('lettertype_box').classList.remove('border-red-500');
					document.getElementById('lettertype_container').classList.remove('border-red-500');
				}, 3000);
			}else if(currentUser?.blueToken>0){
				writeLetterNow();
				reduceOneBlueToken();
			}else{
				showPricing();
			}
		}else if(currentUser?.blueToken>0){
 			writeLetterNow();
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

	const copyLetter = () => {
		navigator.clipboard.writeText(generatedLetter);
		document.getElementById('copyletter_icon').classList.add('text-green-500')
		
	}



	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed ${infoVisiblity ? "z-50" : "w-[95%] z-0"}`}>
			<InfoBox Heading="Debug Code" Description=""
			Visible={infoVisiblity} setVisible={setInfoVisiblity}
			/>
		</div>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>		

		<Header2 hide="true" redirect="letter" token="blue"/>
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
    		<h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Letter <span className="text-sky-500">Writing</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
    		<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
    			<div 
    			id="formalorinformal_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] font-semibold ml-3">Formal/Informal</h1>
    				<div 
    				id="formalorinformal_box"
    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
						<select 
						value={formalOrInformal}
						onChange={(e)=>setFormalOrInformal(e.target.value)}
						id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
						  <option value="formal">Formal</option>
						  <option value="informal">Informal</option>
						  <option value="other">Other</option>
						</select>
						{
							formalOrInformal === 'other'?
							<input type="text" className="mt-2 text-[#FFF] w-full p-2 bg-transparent outline-none"
							value={otherFormalType}
							placeholder="Specify the type here"
							onChange={(e)=>setOtherFormalType(e.target.value)}
							/>
							:
							""
						}
    				</div>
    			</div>
    			<div 
    			id="lettertype_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Letter Type</h1>
    				<div 
    				id="lettertype_box"
    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
    				border-gray-400 focus-within:border-sky-400 flex-col">
						<select 
						value={letterType}
						onChange={(e)=>setLetterType(e.target.value)}
						id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 
						text-white focus:ring-orange-500 focus:border-orange-500">
						  {
						  	formalOrInformal === 'formal' ?
						  	formal_letter.map((formal)=>(
						  		<option value={formal}>{formal}</option>
						  	))
						  	:
						  	informal_letter.map((informal)=>(
						  		<option value={informal}>{informal}</option>
						  	))
						  }
						  <option value="other">Other</option>
						</select>
						{
							letterType === 'other' ?
							<input type="text" className="mt-2 text-[#FFF] w-full p-2 bg-transparent outline-none"
							value={otherLetterType}
							placeholder="Specify the type here"
							onChange={(e)=>setOtherLetterType(e.target.value)}
							/>
							:
							""
						}						
    				</div>
    			</div>
    			
    		</div>
    		<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
    			<div className="flex px-5 flex-col md:w-[50%] w-full">
    				<h1 className="text-xl text-[#FFF] font-medium">Sender's Name</h1>
    				<div 
    				id="sender_box"
    				className="flex w-full px-4 py-3 mt-3 border-[1px] rounded-xl border-gray-400 focus-within:border-orange-500" >
	    				<input type="text" 
	    				onChange={(e)=>setSenderName(e.target.value)}
	    				value={senderName}
	    				className="w-full bg-transparent outline-none text-[#FFF] font-sourceCode"
	    				placeholder="Hint:- Personal or Company Name"
	    				/>
    				</div>
    			</div>
    			<div className="flex px-5 flex-col md:w-[50%] mt-7 md:mt-0 w-full">
    				<h1 className="text-xl text-[#FFF] font-medium">Recipient's Name</h1>
    				<div 
    				id="recipient_box"
    				className="flex w-full px-4 py-3 mt-3 border-[1px] rounded-xl border-gray-400 focus-within:border-orange-500" >
	    				<input type="text" 
	    				onChange={(e)=>setRecipientName(e.target.value)}
	    				value={recipientName}
	    				className="w-full bg-transparent outline-none text-[#FFF] font-sourceCode"
	    				placeholder="Hint:- Personal or Company Name"
	    				/>
    				</div>
    			</div>

    		</div>
    		<h1 className="text-xl font-medium mt-7 text-[#FFF]"><span className="text-sky-500">Explain the purpose/content</span> of letter</h1>
			<div 
			id="content_box"
			className="w-full md:h-[150px] h-[200px] px-2 py-4 mt-2 border border-[2.5px] rounded-xl border-gray-400
			transition-all duration-200 backdrop-blur-sm bg-black/40 ease-in-out focus-within:border-sky-400">
				<textarea 
				value={prompt}
				onChange={(e)=>setPrompt(e.target.value)}
				className="bg-transparent resize-none scroll-smooth placeholder:text-gray-600 text-gray-300 w-full h-full outline-none font-sourceCode"
				placeholder="Hint:-  John Smith would like to request a meeting with Jane Doe next week to discuss a potential partnership"
				/>
			</div>
			<center>
				<button onClick={()=>{if(!loader)writeNow();}} className="mt-7 active:scale-90 transition-all ease-in-out duration-200 z-10 w-[120px] mx-auto 
    			rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Submit'
					}
				</button>
			</center>
			<div className="flex gap-1 mt-4 items-center justify-center">
				<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-10 w-10"/>
				<h1 className={` md:text-xl text-md font-bold ${currentUser?.blueToken < 1 ? 'text-red-500':'text-sky-400'}`}>1</h1>
			</div>
    	</motion.div>
    	<div className="h-[0.5px] mt-10 w-[80%] bg-gray-100 mx-auto"/>
		<div className="min-h-screen relative mb-10 px-3 flex flex-col items-center max-w-6xl mx-auto z-10">
			<div className="absolute w-full top-[50%] mx-auto">
				<h1 className="text-center text-3xl text-gray-700 font-bold">Result Will Be Displayed Here</h1>
			</div>
			<button className="text-2xl md:text-5xl text-sky-400 font-anurati tracking-[10px] uppercase hover:text-sky-300 cursor-pointer mt-10">Result</button>
			<div className="mx-auto w-[120px] md:w-[180px] mt-2 h-[2px] bg-orange-500"/>
			<div id="resultContainer" className={`relative bg-black/60 mt-7 hidden px-4 py-5 rounded-xl border-2 border-gray-700/80`}>
				<h1 id="copy_text" className="text-md absolute top-3 right-[45px] md:right-[55px] text-gray-300 hidden font-semibold">Copied!</h1>
    			<div id="text_block" className="flex relative mt-2 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
				px-3 font-sourceCode py-6 no-scrollbar bg-black/20">
					<div 
    				onClick={copyLetter}
    				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
    					
    					<BiCopyAlt id="copyletter_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
    				</div>
    				{
    					generatedLetter ? 
    					""
    					:
    					<div className="flex">
    						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
        					alt=""
        					className="h-7 w-7 mr-5"
        					/>
        					Preparing {letterType ==='other' ? otherLetterType : letterType } letter
    					</div>
    				}
    				<div id="letter_block" className="flex whitespace-pre-wrap"/>
				</div>
    		</div>
		</div>
    </div>


	)
}