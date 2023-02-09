import {useState,useEffect} from 'react';
import { Configuration, OpenAIApi } from "openai";
import {BiCopyAlt} from 'react-icons/bi';
import Header2 from './Header2';	
import CircularProgress from '@mui/material/CircularProgress';
import {motion} from 'framer-motion'
import ConfirmBox from './ConfirmBox';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';




export default function ArticleComponent() {
	// body...
	const [prompt,setPrompt] = useState('');
	const [confirmBoxVisibility,setConfirmBoxVisibility] = useState(false);
	const [target,setTarget] = useState('');
	const [loader,setLoader] = useState(false);
	const [keywords,setKeywords] = useState('');
	const [tone,setTone] = useState('');
	const [articleLength,setArticleLength] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState('');
	const [topic,setTopic] = useState('');
	const [optionsVisible,setOptionsVisible] = useState(false);
	const [editable,setEditable] = useState(false);
	const [generatedResponse2,setGeneratedResponse2] = useState('');
	const [generatedTopicArray,setGeneratedTopicArray] = useState([]);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showPricingState,setShowPricingState] = useState(false);
	const tones = ["Formal", "Informal", "Persuasive", "Descriptive", "Narrative", "Expository", "Argumentative",
	"Humorous", "Satirical", "Emotional"];

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
 
	const articleNow = () => {
		if(!topic){
			const element = document.getElementById('topic_box')
			element.classList.add('animate-pulse','border-red-500')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('animate-pulse','border-red-500');
			}, 2500);
		}else if(!articleLength){
			const element = document.getElementById('length_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!target){
			const element = document.getElementById('target_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(!keywords){
			const element = document.getElementById('keywords_box')
			element.classList.add('border-red-500','animate-pulse')
			element.scrollIntoView({behavior:"smooth",block:"center"});		
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse');
			}, 2500);
		}else if(currentUser?.blueToken>0){
 			ArticleNowWithPrompt();
 			reduceOneBlueToken();
 		}else{
 			showPricing();
 		}
	}

	const ArticleNowWithPrompt = async() => {
		setLoader(true);
		setGeneratedResponse('');
		document.getElementById('resultContainer').classList.remove('hidden');
		const element =document.getElementById('resultBox');
		document.getElementById('resultContainer').scrollIntoView({behavior:"smooth",block:"center"})
		element.innerHTML = "";
		setOptionsVisible(false);
		try{
			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt:`Please generate an outline for an article on ${topic}, targeted towards ${target}, with a desired length of ${articleLength}, including keywords/phrases ${keywords}, written in a ${tone} tone. The outline should include sections for introduction, background information, body, conclusion, references, appendices, acknowledgements, and author's note.also indicate that the acknowledgements and author's note should be need to be written by own`,
				temperature: 0.3,
		  		max_tokens: 2500,
		  		top_p: 1,
		  		frequency_penalty: 0.5,
		  		presence_penalty: 0
			})
			let parsedData = response.data.choices[0].text.trim();
			setGeneratedResponse(parsedData);
			typeMessageMain(element,parsedData)
		}catch(err){
			const response = await openai2.createCompletion({
				model: "text-davinci-003",
				prompt:`Please generate an outline for an article on ${topic}, targeted towards ${target}, with a desired length of ${articleLength}, including keywords/phrases ${keywords}, written in a ${tone} tone. The outline should include sections for introduction, background information, body, conclusion, references, appendices, acknowledgements, and author's note.also indicate that the acknowledgements and author's note should be need to be written by own`,
				temperature: 0.3,
		  		max_tokens: 2500,
		  		top_p: 1,
		  		frequency_penalty: 0.5,
		  		presence_penalty: 0
			})
			let parsedData = response.data.choices[0].text.trim();
			setGeneratedResponse(parsedData);
			typeMessageMain(element,parsedData)			
		}
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
				if(!generatedResponse2){
					setOptionsVisible(true);
				}				
			}
		},20)
	}

	const fetchTopics =	async() => {
		setOptionsVisible(false)
		setLoader(true);
		setGeneratedResponse2('')
		document.getElementById('articleContainer').classList.remove('hidden');
		document.getElementById('articleBox').innerHTML = "";
		const parsedData = ['introduction', 'background information', 'body', 'conclusion', 'references', 'appendices']
		generateArticle(parsedData)
	} 

	const generateArticle = async(topics) => {
		const element = document.getElementById('articleBox');
		for(const lesson of topics){
			setLoader(true)
			try{
				const response = await openai.createCompletion({
					model: "text-davinci-003",
					prompt:`
						The outline provided : -\n
						${generatedResponse}\n
						Write a detailed analysis of the ${lesson} from the outline provided mentioning the ${lesson} as heading with some spacing before it, in ${tone} tone and target towards ${target} with a length of ${lesson === 'body' ? articleLength : '200 words'} , in a ${tone} tone.\n
					`,
					temperature: 0.1,
			  		max_tokens: 3000,
			  		top_p: 1,
			  		frequency_penalty: 0.5,
			  		presence_penalty: 0
				})
				let parsedData = response.data.choices[0].text;
				setGeneratedResponse2(parsedData);
				const result = await typeMessageArticle(element,`\n${parsedData}`)
			}catch(err){
				const response = await openai2.createCompletion({
					model: "text-davinci-003",
					prompt:`
						The outline provided : -\n
						${generatedResponse}\n
						Write a detailed analysis of the ${lesson} from the outline provided mentioning the ${lesson} as heading with some spacing before it, in ${tone} tone and target towards ${target} with a length of ${lesson === 'body' ? articleLength : '200 words'} , in a ${tone} tone.\n
					`,
					temperature: 0.1,
			  		max_tokens: 3000,
			  		top_p: 1,
			  		frequency_penalty: 0.5,
			  		presence_penalty: 0
				})
				let parsedData = response.data.choices[0].text;
				setGeneratedResponse2(parsedData);
				const result = await typeMessageArticle(element,`\n${parsedData}`)
			}
		}
	}

	const typeMessageArticle = async(element,text) => {
		let index=0;
		element.scrollIntoView({behavior:"smooth",block:'center'});
		setLoader(false);
		return await new Promise(resolve => {
			const interval = setInterval(()=>{
				if(index<text.length){					
					element.innerHTML += text.charAt(index);
					index++;
				}else{
					clearInterval(interval);
					resolve('foo')
				}
			},10)
		})
	}

	const copyResponse = () => {
		navigator.clipboard.writeText(generatedResponse);
	}

	const setExample = () => {
		setTopic('The impact of social media on mental health');
		setTarget('Young Adults');
		setArticleLength('1000 Words');
		setKeywords('mental health, social media, addiction, self-esteem, depression');
		setTone('Informal and persuasive');
		document.getElementById('tone_box').scrollIntoView({behavior:"smooth",block:'start'});
	}

	const ModifyFunction = () => {
		setEditable(true)
		document.getElementById('resultBox').scrollIntoView({behavior:'smooth',block:'center'});
		document.getElementById('resultBox').focus();
	}

	const saveModify = () => {
		setEditable(false)
	}

	const deleteFunction = () => {
		document.getElementById('resultBox').innerHTML = "";
		document.getElementById('resultContainer').classList.add('hidden');
		setOptionsVisible(false);
		document.getElementById('topic_box').scrollIntoView({behavior:"smooth",block:'start'});
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

	const copyArticle = () => {
		navigator.clipboard.writeText("generating")
	}

	const generateFunction = () => {

	}

	return (
		<div 
		id="main"
		className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed ${confirmBoxVisibility ? "z-50 w-full" : "w-[95%] z-0"}`}>
			<ConfirmBox setVisible={setConfirmBoxVisibility}/>
		</div>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>
		
			<Header2 hide="true" redirect="article" token="blue" />
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
        		<div className="w-full h-full z-10">	
        			<h1 className="md:text-4xl text-3xl mb-3 text-[#FFF] text-center text-shadow-fire mx-auto">Article <span className="text-sky-500">Writing</span></h1>	
		    		<div className="h-[2px] w-[45%] md:w-[17%] mx-auto bg-orange-500 "/>
		    		<center>
					<button onClick={setExample} className="mt-7 bg-indigo-700 
					w-[190px] mx-auto md:text-lg text-md text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-800/90 
					transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
						{
							loader? 
							<CircularProgress color="inherit" />
							:
							'Show Example'
						}
					</button>
				</center>
		    		<div className="w-full z-10 mt-10 rounded-xl py-2 flex md:flex-row flex-col">
	    			<div 
	    			id="industry_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Topic <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="topic_box"
	    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
							<input 
							value={topic}
							placeholder="Topic of the Article"
							onChange={(e)=>setTopic(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 
							text-white focus:ring-orange-500 focus:border-orange-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="target_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Article <span className="text-sky-500">Length</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="length_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-sky-400 flex-col">
							<input 
							value={articleLength}
							placeholder="Length of article"
							onChange={(e)=>setArticleLength(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>
	    		</div>
	    		<div className="w-full z-10 mt-10 rounded-xl py-2 flex md:flex-row flex-col">
	    			<div 
	    			id="industry_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Target <span className="text-orange-500">Audience</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="target_box"
	    				className="w-full md:h-[150px] h-[200px] md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
							<textarea 
							value={target}
							placeholder="ex:- Developers, Student, Teachers..."
							onChange={(e)=>setTarget(e.target.value)}
							id="countries" className="border h-full outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white resize-none focus:ring-orange-500 focus:border-orange-500"/>
	    				</div>
	    			</div>
	    			<div 
	    			id="target_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Specific <span className="text-sky-500">Keywords</span> <span className="text-red-500">*</span></h1>
	    				<div 
	    				id="keywords_box"
	    				className="w-full md:h-[150px] h-[200px]  md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-sky-400 flex-col">
							<textarea 
							value={keywords}
							placeholder="Special keywords to use in your article"
							onChange={(e)=>setKeywords(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 h-full resize-none text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>
	    		</div>
	    		<div className="w-full z-10 mt-6 rounded-xl px-2 py-2 flex md:flex-row justify-center flex-col">
	    			<div 
	    			id="language_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Tone or Style of <span className="text-sky-500">Article</span></h1>
	    				<div 
	    				id="tone_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-sky-400 flex-col">
							<input 
							value={tone}
							placeholder="ex:- Informal,Formal,Persuasive..."
							onChange={(e)=>setTone(e.target.value)}
							id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
							border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>												
	    				</div>
	    			</div>    			
	    		</div>
	    		<center>
					<button onClick={()=>{if(!loader)articleNow();}} className="mt-7 bg-green-700 
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
				<div id="resultContainer" className="flex hidden flex-col relative hiden mt-7 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
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
	        					Generating outline of article
	    					</div>
	    				}
	    				<div id="resultBox" className="flex outline-none font-sourceCode whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll"
	    				contentEditable={editable}
	    				suppressContentEditableWarning={true}
	    				/>
					</div>
					{
						editable &&
						<center>
							<button onClick={saveModify} className="mt-7 bg-green-700 
							w-[80px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
							transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
								save
							</button>
						</center>
					}
					{
	    					optionsVisible &&
	    					<div className="w-full mt-5 flex flex-col border-gray-400 border-[1px] rounded-xl bg-black/20">
	    						<div className="flex justify-between px-3 py-4 gap-3 items-center w-full">
	    							<p className="text-md text-gray-500 font-medium">
	    								Generate the body of the article by using the generated outline. The article will be generated in parts by using the generated topics and subtopic.
	    							</p>
	    							<button 
	    							onClick={()=>{if(!editable)fetchTopics()}}
	    							className={`px-2 w-[140px] py-3 ${editable ? 'opacity-50':'opacity-100'} rounded-lg bg-green-600 text-[#FFF] font-mono flex items-center 
	    							justify-center hover:bg-green-300 transition-all duration-200 ease-in-out`}>
	    								Generate 
	    							</button>
	    						</div>
	    						<div className="flex justify-between px-3 py-4 gap-3 items-center w-full">
	    							<p className="text-md text-gray-500 font-medium">
	    								Modify the generated article outline. Edit and save the article outline to save the changes you made in outline.
	    							</p>
	    							<button 
	    							onClick={ModifyFunction}
	    							className="px-2 w-[140px] py-3 rounded-lg bg-sky-600 text-[#FFF] font-mono flex items-center 
	    							justify-center hover:bg-sky-300 transition-all duration-200 ease-in-out">
	    								Modify
	    							</button>
	    						</div>
	    						<div className="flex justify-between px-3 py-4 gap-3 items-center w-full">
	    							<p className="text-md text-gray-500 font-medium">
	    								Delete the generated article outline and generate again with different options
	    							</p>
	    							<button 
	    							onClick={()=>{if(!editable)deleteFunction()}}
	    							className={`px-2 w-[140px] py-3 ${editable ? 'opacity-50':'opacity-100'} rounded-lg bg-red-600 text-[#FFF] font-mono flex items-center 
	    							justify-center hover:bg-red-300 transition-all duration-200 ease-in-out`}>
	    								Delete
	    							</button>
	    						</div>
	    					</div>
	    				}
	    				{
	    					generatedResponse &&
	    					<h1 className="text-xl mt-7 text-gray-500 text-center">The complete article generating may typically take upto 2-3 minutes, please be patient.</h1>	
	    				}
	    				<div id="articleContainer" className="flex hidden flex-col relative hiden mt-7 border-[1px] border-sky-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
						min-h-screen  px-3 font-sourceCode py-3 no-scrollbar bg-black/20">
							<h1 className="md:text-2xl text-xl font-medium mx-auto mb-2	text-orange-500 text-shadow-fire text-center">{topic}</h1>					
			    				{
			    					generatedResponse2 ? 
			    					""
			    					:
			    					<div className="flex mx-auto">
			    						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
			        					alt=""
			        					className="h-7 w-7 mr-5"
			        					/>
			        					Generating the article
			    					</div>
			    				}
			    				<div id="articleBox" className="flex outline-none font-sourceCode whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll"
			    				contentEditable={editable}
			    				suppressContentEditableWarning={true}
			    				/>
							</div>
					<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>    		
		    	</div>
		    </motion.div>
		</div>


	)
}