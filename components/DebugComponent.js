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

export default function DebugComponent() {
	// body...
	
	const [infoVisiblity,setInfoVisiblity] = useState(false);
	const [languageType,setLanguageType] = useState('javascript');
	const [description,setDescription] = useState('');
	const [result,setResult] = useState('');
	const configuration = new Configuration({
	  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const [prompt,setPrompt] = useState('');
	const [loader,setLoader] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showPricingState,setShowPricingState] = useState(false);
	
	useEffect(()=>{
		if(loader){
			document.getElementById('upperDesign').classList.add('animate-ping');
			document.getElementById('lowerDesign').classList.add('animate-ping');
		}else{
			document.getElementById('upperDesign').classList.remove('animate-ping');
			document.getElementById('lowerDesign').classList.remove('animate-ping');
		}
	},[loader])


	const debugNow = async() => {
		setLoader(true);
		const element =document.getElementById('resultBox');
		element.innerHTML = "";
		document.getElementById('resultContainer').classList.add('hidden');
		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt: `Debug this piece of ${languageType} code and return only the code , if cannot debug the code return "Something went Wrong" and the error type or reference for the error is also provided in Error In This Code:\n\n
		   Code:${prompt}\n\n
		   Error In This Code:${description}\n\n
		   Result:
		   `,
		  temperature: 0,
		  max_tokens: 3500,
		  top_p: 1,
		  frequency_penalty: 0.5,
		  presence_penalty: 0,
		});
		setLoader(false);
		document.getElementById('resultContainer').classList.remove('hidden');
		const parsedData = response.data.choices[0].text
		typeMessage(parsedData)
		setResult(parsedData)
	}

	const typeMessage = (text) =>{

		let index=0;
		const element =document.getElementById('resultBox');
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:"center"});

		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
			}
		},20)
		setLoader(false);		
	}
		
 	const debug = () => {
 		if(currentUser?.blueToken>0){
 			debugNow();
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

	const copyCode = () => {
		navigator.clipboard.writeText(result);
		document.getElementById('copy_text').classList.remove('hidden');
		setTimeout(function() {
			document.getElementById('copy_text').classList.add('hidden');
		}, 1400);
	}

	return (
		<div 
		id="main"
		className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden">
		<div id="upperDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed ${infoVisiblity ? "z-50" : "w-[95%] z-0"}`}>
			<InfoBox Heading="Debug Code" Description=""
			Visible={infoVisiblity} setVisible={setInfoVisiblity}
			/>
		</div>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>
			<Header2 hide="true" redirect="debug" token="blue" />
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
            <div 
            className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px]">
        		<div className="w-full h-full z-10">
        			<label htmlFor="countries" className="block mb-2 text-xl font-medium text-white">Select Language</label>
					<select 
					value={languageType}
					onChange={(e)=>setLanguageType(e.target.value)}
					id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
					  <option value="javascript">Javascript</option>
					  <option value="python">Python</option>
					  <option value="java">Java</option>
					  <option value="c++">C++</option>
					  <option value="c#">C#</option>
					  <option value="ruby">Ruby</option>
					  <option value="go">Go</option>
					  <option value="typescript">Typescript</option>
					  <option value="PHP">PHP</option>
					  <option value="swift">Swift</option>
					  <option value="perl">Perl</option>
					  <option value="sql">SQL</option>
					</select>
					<h1 className="block mt-5 text-xl font-medium text-red-500">Describe The Error</h1>
					<div className="w-full h-[80px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-sky-400">
						<textarea 
						value={description}
						onChange={(e)=>setDescription(e.target.value)}
						className="bg-transparent placeholder:text-gray-700 resize-none text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Hint:- Copy paste the error message"
						/>


					</div>
					<h1 className="block mt-5 text-xl font-medium text-white">Paste Your <span className="text-sky-400" >Code Here</span></h1>
					<div className="w-full h-[500px] px-2 py-4 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-sky-400">
						
						<textarea 
						value={prompt}
						onChange={(e)=>setPrompt(e.target.value)}
						className="bg-transparent placeholder:text-gray-700 resize-none text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Your Code Goes Here"
						/>

						
					</div>
					<center>
						<button onClick={()=>{if(!loader && prompt.length>10)debug();}} className="mt-7 bg-green-700 
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
        		</div>
        		<div className="h-[0.5px] mt-10 w-[80%] bg-gray-100 mx-auto"/>
        		<div className="min-h-screen relative mb-10 flex flex-col items-center w-full z-10">
        			<div className="absolute w-full top-[50%] mx-auto">
        				<h1 className="text-center text-3xl text-gray-700 font-bold">Result Will Be Displayed Here</h1>
        			</div>
        			<button className="text-2xl md:text-5xl text-sky-400 font-anurati tracking-[10px] uppercase hover:text-sky-300 cursor-pointer mt-10">Result</button>
        			<div className="mx-auto w-[120px] md:w-[180px] mt-2 h-[2px] bg-orange-500"/>
        			<div id="resultContainer" className={`relative bg-black/60 mt-7 hidden px-4 py-5 rounded-xl border-2 border-gray-700/80`}>
        				<h1 id="copy_text" className="text-md absolute top-3 right-[45px] md:right-[55px] text-gray-300 hidden font-semibold">Copied!</h1>
        				<div 
        				onClick={copyCode}
        				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
        					
        					<BiCopyAlt id="copy_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
        				</div>
	        			<code id="resultBox" className={`text-[#dcdcdc] max-w-[100%] overflow-x-scroll no-scrollbar whitespace-pre-wrap`}>

	        			</code>
	        		</div>
        		</div>
        	</div>



        </div>

	)
}


