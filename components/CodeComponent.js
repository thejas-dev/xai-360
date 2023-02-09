import {useState,useEffect} from 'react';
import {BiCopyAlt} from 'react-icons/bi';
import InfoBox from './InfoBox';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';

export default function CodeComponent() {
	// body...
	const [infoVisiblity,setInfoVisiblity] = useState(true);
	const [prompt,setPrompt] = useState('');
	const [loader,setLoader] = useState('');
	const [language,setLanguage] = useState('');
	const [additionalContext,setAdditionalContext] = useState('');
	const [context,setContext] = useState('');
	const [functionName,setFunctionName] = useState('');
	const [generatedCode,setGeneratedCode] = useState('');
	const [explainCode,setExplainCode] = useState('');
	const [language2,setLanguage2] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showPricingState,setShowPricingState] = useState(false);
	const configuration = new Configuration({
	  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const configuration2 = new Configuration({
	  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY2,
	});
	const openai2 = new OpenAIApi(configuration2);

	useEffect(()=>{
		if(loader){
			document.getElementById('upperDesign').classList.add('animate-ping');
			document.getElementById('lowerDesign').classList.add('animate-ping');
		}else{
			document.getElementById('upperDesign').classList.remove('animate-ping');
			document.getElementById('lowerDesign').classList.remove('animate-ping');
		}
	},[loader])


	const explainNow = () => {
		if(!language2){
			const element = document.getElementById('language_box2')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(explainCode.length<5){
			const element = document.getElementById('explaincode_box');
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"end"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(currentUser?.blueToken>0){
			explainCodeWithPrompt();
 			reduceOneBlueToken();
		}else{
			showPricing();
		}
	}

	const codeNow=()=>{
		if(!language){
			const element = document.getElementById('language_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(prompt.length<5){
			const element = document.getElementById('prompt_box');
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"end"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(currentUser?.blueToken>0){
			codeWithPrompt();
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

	const codeWithPrompt = async() => {
		setLoader(true);
		setGeneratedCode('');
		document.getElementById('resultContainer').classList.remove('hidden');
		document.getElementById('resultContainer').scrollIntoView({behavior:"smooth",block:"center"})
		const element =document.getElementById('resultBox');
		element.innerHTML = "";
		try{
			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt:`Can you write code in ${language} for this problem: ${prompt}. 
				Additional details: ${additionalContext}. 
				Function name: ${functionName}, Variables: ${functionName}`,
				temperature: 0.3,
		  		max_tokens: 3500,
		  		top_p: 1,
		  		frequency_penalty: 0.5,
		  		presence_penalty: 0
			})
			const parsedData = response.data.choices[0].text;
			setGeneratedCode(parsedData);
			typeMessageMain(element,parsedData)
		}catch(err){
			const response = await openai2.createCompletion({
				model: "text-davinci-003",
				prompt:`Can you write code in ${language} for this problem: ${prompt}. 
				Additional details: ${additionalContext}. 
				Function name: ${functionName}, Variables: ${functionName}`,
				temperature: 0.3,
		  		max_tokens: 3500,
		  		top_p: 1,
		  		frequency_penalty: 0.5,
		  		presence_penalty: 0
			})
			const parsedData = response.data.choices[0].text;
			setGeneratedCode(parsedData);
			typeMessageMain(element,parsedData)
		}
	}

	const explainCodeWithPrompt = async() => {
		setLoader(true);
		setGeneratedResponse('');
		document.getElementById('explainCodeResponseContainer').classList.remove('hidden');
		document.getElementById('explainCodeResponseContainer').scrollIntoView({behavior:"smooth",block:"center"});
		const element =document.getElementById('responseBox');
		element.innerHTML = "";
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt:`Please explain the following code in ${language2}: ${explainCode}. 
			The explanation should be in the context of ${context}.`,
			temperature: 0.3,
	  		max_tokens: 2000,
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
		element.scrollIntoView({behavior:"smooth",block:'center'});

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


	const copyCode = () => {
		navigator.clipboard.writeText(generatedCode);
		document.getElementById('copycode_icon').classList.add(border-green-500)
	}

	const copyResponse = () => {
		navigator.clipboard.writeText(generatedResponse);
		document.getElementById('copyresponse_icon').classList.add(border-green-500);
	}

	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-sky-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-sky-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>

		<Header2 hide="true"  redirect="code" token="blue"/>
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
    		<h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Write <span className="text-sky-500">Code</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
    		<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
    			<div 
    			id="language_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] font-semibold ml-3">Programming language <span className="text-red-500">*</span></h1>
    				<div 
    				id="language_box"
    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
						<input 
						value={language}
						placeholder="ex:- javascript,Python,..."
						onChange={(e)=>setLanguage(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 
						text-white focus:ring-orange-500 focus:border-orange-500"/>
    				</div>
    			</div>
    			<div 
    			id="function_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3"><span className="text-purple-500">Function/Variable</span> name</h1>
    				<div 
    				id="function_box"
    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
    				border-gray-400 focus-within:border-sky-400 flex-col">
						<input 
						value={functionName}
						placeholder="ex:- Add2Numbers"
						onChange={(e)=>setFunctionName(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 h-full scroll-smooth 
						text-white focus:ring-orange-500 focus:border-orange-500"/>
					</div>
    			</div>    			
    		</div>
    		<div className="w-full z-10 rounded-xl px-2 py-2 flex flex-col">
    			<div 
    			id="prompt_container"
    			className="px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-orange-400 w-full">
    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Natural Language <span className="text-orange-500">Description</span> <span className="text-red-500">*</span> </h1>
    				<div 
    				id="prompt_box"
    				className="w-full h-[200px] md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-orange-400 flex-col">
						<textarea 
						value={prompt}
						placeholder="Breif Description of problem"
						onChange={(e)=>setPrompt(e.target.value)}
						id="countries" className="border resize-none h-full text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-sky-600 placeholder-gray-400 text-white outline-none"/>
					</div>
    			</div>
    			<div 
    			id="additionalContext_container"
    			className="px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-orange-400 w-full">
    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Additional <span className="text-sky-500">Context</span> of Problem</h1>
    				<div 
    				id="additionalContext_box"
    				className="w-full h-[100px] md:ml-9 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
    				border-gray-400 focus-within:border-orange-400 flex-col">
						<textarea 
						value={additionalContext}
						placeholder="Some additional context of problem"
						onChange={(e)=>setAdditionalContext(e.target.value)}
						id="countries" className="border resize-none h-full text-[#FFF] text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-sky-600 placeholder-gray-400 outline-none"/>
						  					
    				</div>
    			</div>
    			<center>
					<button onClick={()=>{if(!loader)codeNow();}} className="mt-7 bg-green-700 
					w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
					transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
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
				<div id="resultContainer" className="flex flex-col hidden relative hiden mt-7 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
				px-3 font-sourceCode py-3 no-scrollbar bg-black/40">
					<h1 className="text-xl font-medium mx-auto mb-5 text-center">Result</h1>
					<div 
    				onClick={copyCode}
    				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
    					
    					<BiCopyAlt id="copycode_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
    				</div>
    				{
    					generatedCode ? 
    					""
    					:
    					<div className="flex">
    						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
        					alt=""
        					className="h-7 w-7 mr-5"
        					/>
        					Preparing {language} Code
    					</div>
    				}
    				<code id="resultBox" className="flex font-sourceCode whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll"/>
				</div>
				<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-200 mx-auto mt-10"/>
    		</div>



    	</motion.div>
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
        className="h-full flex mb-20 px-4 flex-col z-10 max-w-6xl mx-auto mt-[50px]
    	scroll-smooth">	
    		<h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Explain <span className="text-orange-500">Code</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-sky-500 "/>
			<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
				<div 
				id="language_box2"
				className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
					<h1 className="text-xl text-[#FFF] font-semibold ml-3">Programming language <span className="text-red-500">*</span></h1>
					<div 
					id="language_box2"
					className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
						<input 
						value={language2}
						placeholder="ex:- javascript,Python,..."
						onChange={(e)=>setLanguage2(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 
						text-white focus:ring-orange-500 focus:border-orange-500"/>
					</div>
				</div>
				<div 
				id="context_container"
				className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
					<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Code <span className="text-purple-500">Context</span></h1>
					<div 
					id="context_box"
					className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
					border-gray-400 focus-within:border-sky-400 flex-col">
						<input 
						value={context}
						placeholder="ex:- Adding 2 number"
						onChange={(e)=>setContext(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 h-full scroll-smooth 
						text-white focus:ring-orange-500 focus:border-orange-500"/>
					</div>
				</div>
			</div>
			<h1 className="block mt-7 text-xl font-medium text-white">Paste Your <span className="text-sky-400" >Code Here</span> <span className="text-red-500">*</span></h1>
			<div
			id="explaincode_box"
			className="w-full h-[500px] px-2 py-4 mt-2 border border-[2.5px] rounded-xl border-gray-400
			transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-sky-400">
				<textarea 
				value={explainCode}
				onChange={(e)=>setExplainCode(e.target.value)}
				className="bg-transparent resize-none whitespace-pre-wrap scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
				placeholder="Your Code Goes Here"
				/>
			</div>
			<center>
				<button onClick={()=>{if(!loader && explainCode.length>10)explainNow();}} className="mt-7 bg-green-700 
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px]	px-3 py-2 rounded-full hover:bg-green-500/90 
				transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
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
			<div id="explainCodeResponseContainer" className="flex flex-col hidden relative hiden mt-7 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
				px-3 font-sourceCode py-6 no-scrollbar bg-black/20">
					<h1 className="text-xl mb-5 font-medium mx-auto text-center">Result</h1>
					<div 
    				onClick={copyResponse}
    				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
    					
    					<BiCopyAlt id="copyresponse_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
    				</div>
    				{
    					generatedResponse ? 
    					""
    					:
    					<div className="flex">
    						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
        					alt=""
        					className="h-7 w-7 mr-5"
        					/>
        					Reading Your Code
    					</div>
    				}
    				<div id="responseBox" className="flex font-sourceCode whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll"/>
				</div>

		</motion.div>


    </div>




	)
}