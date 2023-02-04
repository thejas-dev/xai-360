import {useState,useEffect} from 'react';
import { Configuration, OpenAIApi } from "openai";
import {BiCopyAlt} from 'react-icons/bi';
import Header2 from './Header2';	
import InfoBox from './InfoBox';
import CircularProgress from '@mui/material/CircularProgress';
import {motion} from 'framer-motion';
import ConfirmBox from './ConfirmBox'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';

export default function YoutuneComponent(argument) {
	// body...
	const [infoVisiblity,setInfoVisiblity] = useState(false);
	const [prompt,setPrompt] = useState('');
	const [promotingProducts,setPromotingProducts] = useState(false);
	const [category,setCategory] = useState('');
	const [productName,setProductName] = useState('');
	const [productDescription,setProductDescription] = useState('');
	const [loader,setLoader] = useState(false);
	const [keywords,setKeywords] = useState('');
	const [channelName,setChannelName] = useState('');
	const [confirmBoxVisibility,setConfirmBoxVisibility] = useState(false);
	const [generatedTitle,setGeneratedTitle] = useState('');
	const [generatedDescription,setGeneratedDescription] = useState('');
	const [generatedTags,setGeneratedTags] = useState('');
	const [generatedIdeas,setGeneratedIdeas] = useState('');
	const [topic,setTopic] = useState('');
	const [topicKeywords,setTopicKeywords] = useState('');
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

	const generateNow = async() => {
		if(currentUser?.blueToken>0){
 			setLoader(true);
			setGeneratedTitle('');
			setGeneratedDescription('');
			setGeneratedTags('');
			document.getElementById('title_block').innerHTML = "";
			document.getElementById('description_block').innerHTML = "";
			document.getElementById('tags_block').innerHTML = "";
			document.getElementById('background_text').classList.add('hidden');		
			const element = document.getElementById('result_container');
			element.classList.remove('hidden');
			setTimeout(function() {
				document.getElementById('result_text').scrollIntoView({behaviour:"smooth"});	
			}, 1000);
			generateTitle();
 			reduceOneBlueToken();
 		}else{
 			showPricing();
 		}
		
	}

	const generateIdeasNow = () => {
		if(currentUser?.blueToken>0){
 			document.getElementById('idea_container').classList.remove('hidden');
			generateIdeas()
 			reduceOneBlueToken();
 		}else{
 			showPricing();
 		}		
	}

	const generateIdeas = async() => {
		setGeneratedIdeas('');
		setLoader(true);
		document.getElementById('ideas_block').innerHTML ="";
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt:`Can you Suggest some attractive and nice youtube content ideas in the topic of ${topic} about ${keywords}`,
			temperature: 0.5,
	  		max_tokens: 1000,
	  		top_p: 1,
	  		frequency_penalty: 0.5,
	  		presence_penalty: 0
		})
		const parsedData = response.data.choices[0].text;
		const element = document.getElementById('ideas_block');
		setGeneratedIdeas(parsedData);
		typeMessageIdeas(element,parsedData)
	}

	const typeMessageIdeas = (element,text) =>{

		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:"center"});

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

	const generateTitle = async() => {
		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt: `Generate an full, SEO optimized and attractive youtube title for this video content,\n
		  channel name:${channelName ? channelName : "not provided"}\n
		  category of the video:${category}\n
		  concept or purpose of the video:${prompt}\n
		  keywords:${keywords ? keywords : 'not provided'}\n
		  ${promotingProducts && `promoting a product with name:${productName}`}
		   `,
		  temperature: 0.2,
		  max_tokens: 100,
		  top_p: 1,
		  frequency_penalty: 0.5,
		  presence_penalty: 0,
		});
		const parsedData = response.data.choices[0].text;
		const element =document.getElementById('title_block');
		typeMessage(element,parsedData,'title');
		setGeneratedTitle(parsedData)
	}

	const generateDescription = async() => {
		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt: `Generate an full, attractive and informative youtube video description (with hashtags at starting and in ending) with minimum of 500 words and 3 paragraphs to use in this youtube video,video details is given below,\n
		  channel name:${channelName ? channelName : "not provided"}\n
		  category of the video:${category}\n
		  concept or purpose of the video:${prompt}\n
		  keywords:${keywords ? keywords : 'not provided'}\n
		  ${promotingProducts && `promoting a product with name:${productName}`}
		   `,
		  temperature: 0.4,
		  max_tokens: 500,
		  top_p: 1,
		  frequency_penalty: 0.5,
		  presence_penalty: 0,
		});
		const parsedData = response.data.choices[0].text;
		console.log(parsedData)
		const element =document.getElementById('description_block');
		typeMessage(element,parsedData,'description');
		setGeneratedDescription(parsedData)
	}

	const generateTags = async() => {
		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt: `Generate 15 Tags for this Youtube Video and return them by separating each tags by comma,\n
		  channel name:${channelName ? channelName : "not provided"}\n
		  category of the video:${category}\n
		  concept or purpose of the video:${prompt}\n
		  keywords:${keywords ? keywords : 'not provided'}\n
		  ${promotingProducts && `promoting a product with name:${productName}`}
		   `,
		  temperature: 0.3,
		  max_tokens: 300,
		  top_p: 1,
		  frequency_penalty: 0.5,
		  presence_penalty: 0,
		});
		const parsedData = response.data.choices[0].text;
		const element =document.getElementById('tags_block');
		typeMessage(element,parsedData,'tags');
		setGeneratedTags(parsedData)
	}

	const typeMessage = (element,text,block) =>{

		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:"center"});

		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
				if(block==='title'){
					generateDescription();
				}else if(block==='description'){
					generateTags();
				}else if(block==='tags'){
					setLoader(false);
				}
			}
		},20)
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

	const copyTitle = () => {
		navigator.clipboard.writeText(generatedTitle);
		document.getElementById('titlecopy_icon').classList.add('text-green-500')
	}

	const copyDescription = () => {
		navigator.clipboard.writeText(generatedDescription);
		document.getElementById('descriptioncopy_icon').classList.add('text-green-500')
	}

	const copyTags = () => {
		navigator.clipboard.writeText(generatedTags);
		document.getElementById('tagscopy_icon').classList.add('text-green-500')
	}

	const copyIdeas = () => {
		navigator.clipboard.writeText(generatedIdeas);
		document.getElementById('ideascopy_icon').classList.add('text-green-500')
	}

	return (
	<div 
		id="main"
		className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed ${infoVisiblity ? "z-50" : "w-[95%] z-0"}`}>
			<InfoBox Heading="Debug Code" Description=""
			Visible={infoVisiblity} setVisible={setInfoVisiblity}
			/>
		</div>
		<div className={`fixed ${confirmBoxVisibility ? "z-50 w-full" : "w-[95%] z-0"}`}>
			<ConfirmBox category={category} prompt={prompt} promotingProducts={promotingProducts} productName={productName} 
			Visible={confirmBoxVisibility} setVisible={setConfirmBoxVisibility} generateNow={generateNow} />
		</div>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="blue" showPricing={showPricing}/>
		</div>
			<Header2 hide="true" redirect="youtube" token="blue"/>
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
            className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px]
        	scroll-smooth">
        		<div className="w-full h-full z-10">	
        			<h1 className="md:text-4xl text-xl mb-3 text-[#FFF] text-center text-shadow-fire mx-auto">Suggest Some <span className="text-sky-500">Content</span> Ideas</h1>	
		    		<div className="h-[2px] w-[70%] md:w-[30%] mx-auto bg-orange-500 "/>
		    		<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
		    			<div className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
		    				<div className= "flex">
			    				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
	        					className="h-7 w-7 rounded-full"/>
			    				<h1 className="text-xl text-[#FFF] font-semibold ml-2">Topic</h1>
		    				</div>
		    				<div className="w-full md:ml-5 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400">
		    					<input 
		    					value={topic}
		    					onChange={(e)=>setTopic(e.target.value)}
		    					placeholder="Hint:- Trading, Gaming,...."
		    					className="bg-transparent text-[#FFF] outline-none w-full"/>
		    				</div>
		    			</div>
		    			<div className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
		    				<div className= "flex">
			    				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
	        					className="h-7 w-7 rounded-full"/>
			    				<h1 className="text-xl text-[#FFF] font-semibold ml-2">Keywords</h1>
		    				</div>
		    				<div className="w-full md:ml-10 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400">
		    					<input 
		    					value={topicKeywords}
		    					onChange={(e)=>setTopicKeywords(e.target.value)}
		    					placeholder="Hint:- Stock market, PUBG...."
		    					className="bg-transparent text-[#FFF] outline-none w-full"/>
		    				</div>
		    			</div>
		    		</div>
		    		<center>
		    		<button 
		    		onClick={()=>{
		    			if(topic.length>3 && !loader){
		    				generateIdeasNow();
		    			}
		    		}}
		    		className="mt-7 active:scale-90 transition-all ease-in-out duration-200 z-10 w-[120px] mx-auto 
		    		rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">{
		    			loader ?
		    			<CircularProgress color="inherit"/>
		    			:
		    			"Suggest"
		    		}</button>
		    		</center>
		    		<div className="flex gap-1 mt-4 items-center justify-center">
						<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-10 w-10"/>
						<h1 className={` md:text-xl text-md font-bold ${currentUser?.blueToken < 1 ? 'text-red-500':'text-sky-400'}`}>1</h1>
					</div>
		    		<div 
		    		id="idea_container"
		    		className="w-full hidden px-3 py-4 mt-7 relative rounded-xl border-[1.5px] bg-black/30 border-gray-400">
		    			<div 
						onClick={copyIdeas}
						className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
							
							<BiCopyAlt id="ideascopy_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
						</div>
						{
							generatedIdeas ? 
							""
							:
							<div className="flex text-[#FFF]">
								<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
		    					alt=""
		    					className="h-7 w-7 mr-5"
		    					/>
		    					Generating Ideas
							</div>
						}
						<div className="flex whitespace-pre-wrap font-sourceCode text-[#FFF]" id="ideas_block"></div>
		    		</div>
		    		<div className="h-[2px] w-[80%] bg-slate-400 mx-auto mt-6"/>
		    		<h1 className="md:text-4xl text-xl mb-3 mt-5 text-[#FFF] text-center text-shadow-fire mx-auto">Title Description and <span className="text-sky-500">Tags</span></h1>	
		    		<div className="h-[2px] w-[70%] md:w-[30%] mx-auto bg-orange-500 "/>
        			<div className="flex mt-7 items-center ml-1"> 
        				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
        				className="h-7 w-7 rounded-full"/>
        				<h1 className="text-lg ml-3 md:text-xl font-medium text-[#FFF]">Channel name</h1>
        			</div>
        			<div 
        			id="categoryinput_box"
        			className="w-full h-[50px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-orange-400">
						
						<input 
						value={channelName}
						onChange={(e)=>setChannelName(e.target.value)}
						className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Hint:-Village Cooking Channel"
						/>

						
					</div>
        			<div className="flex items-center mt-7 ml-1"> 
        				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
        				className="h-7 w-7 rounded-full"/>
        				<h1 className="text-lg ml-3 md:text-xl font-medium text-[#FFF]">Video category</h1>
        				<span className="text-sm ml-2 md:text-lg text-gray-400">*Required</span>
        			</div>
        			<div 
        			id="categoryinput_box"
        			className="w-full h-[50px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-orange-400">
						
						<input 
						value={category}
						onChange={(e)=>setCategory(e.target.value)}
						className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Hint:-Gaming, Entertainment, etc..."
						/>

						
					</div>
					<div className="flex items-center ml-1 mt-7"> 
        				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
        				className="h-7 w-7 rounded-full"/>
        				<h1 className="text-lg ml-3 md:text-xl font-medium text-[#FFF]">Keywords</h1>
        			</div>
					<div 
        			id="keyword_box"
        			className="w-full h-[50px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-green-400">
						
						<input 
						value={keywords}
						onChange={(e)=>setKeywords(e.target.value)}
						className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Hint:-Enriching, Happiness, etc.."
						/>

						
					</div>
					<div className="flex items-center ml-1 mt-7"> 
        				<img src="https://ik.imagekit.io/d3kzbpbila/free-youtube-logo-icon-2431-thumb_deajg33VU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673605963136"
        				className="h-7 w-7 rounded-full"/>
        				<h1 className="text-md md:text-xl ml-3 font-medium text-[#FFF]">Write a short info about your video</h1>
        				<span className="text-sm hidden md:block ml-2 md:text-lg text-gray-400">*Required</span>
        			</div>
        			<span className="text-sm md:hidden ml-2 md:text-lg text-gray-400">*Required</span>
        			<div 
        			id="description_box"
        			className="w-full h-[200px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
					transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-sky-400">
						
						<textarea 
						value={prompt}
						onChange={(e)=>setPrompt(e.target.value)}
						className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
						placeholder="Hint:-About the concept and purpose of the video"
						/>

						
					</div>
					<div className="mt-7 flex">
						<h1 className="text-lg md:text-xl font-medium text-[#FFF]">Promoting any products</h1>
						<div class="flex items-center ml-5">
						    <input id="default-radio-1" type="radio" value="" 
						    onClick={()=>setPromotingProducts(true)}
						    name="default-radio" class="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
						    <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-300">Yes</label>
						</div>
						<div class="flex items-center ml-2">
						    <input defaultChecked id="default-radio-2" type="radio" value="" 
						    onClick={()=>setPromotingProducts(false)}
						    name="default-radio" class="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
						    <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-300">No</label>
						</div>
					</div>
					{
						promotingProducts ?
						<div className="mt-7">
							<h1 className="text-lg md:text-xl font-medium text-[#FFF]">Product name and category</h1>
							<div 
							id="productname_box"
							className="w-full h-[50px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
							transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-orange-400">
								<input 
								value={productName}
								onChange={(e)=>setProductName(e.target.value)}
								className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
								placeholder="Hint:-Netflix, OTT platform"
								/>								
							</div>

						</div>
						:
						""
					}
					<center>
						<button onClick={()=>{if(!loader && category.length>5 && prompt.length>10){setConfirmBoxVisibility(true)}else{
							if(category.length<5){
								document.getElementById('categoryinput_box').classList.add('border-red-500');
								setTimeout(function() {
									document.getElementById('categoryinput_box').classList.remove('border-red-500');
								}, 2000);
							}
							if(prompt.length<10){
								document.getElementById('description_box').classList.add('border-red-500');
								setTimeout(function() {
									document.getElementById('description_box').classList.remove('border-red-500');
								}, 2000);
							}
						}}} className="mt-7 active:scale-90 transition-all ease-in-out duration-200 z-10 w-[120px] mx-auto 
    					rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">
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
        		</div>
        		<div className="h-[0.5px] mt-6 w-[90%] md:w-[80%] bg-orange-500 mx-auto"/>
        		<div className="min-h-screen relative mb-10 flex flex-col items-center w-full z-10">
        			<div 
        			id="background_text"
        			className="absolute z-0 w-full top-[50%] mx-auto">
        				<h1 className="text-center text-3xl text-gray-700 font-bold">Result Will Be Displayed Here</h1>
        			</div>
        			<button 
        			id="result_text"
        			className="text-2xl md:text-5xl text-sky-400 font-anurati tracking-[10px] uppercase hover:text-sky-300 cursor-pointer mt-10">Result</button>
        			<div className="mx-auto w-[120px] md:w-[180px] mt-2 h-[2px] bg-orange-500"/>
        			<div 
        			id="result_container"
        			className="mt-5 hidden z-10 w-full h-full">
        				<h1 className="text-md text-center mx-auto font-medium text-gray-400/80">Do not exit or refresh the page while generation</h1>
        				<h1 className="text-xl mt-5 font-medium text-[#FFF]">Suggested <span className="text-sky-400">Title</span></h1>
        				<div className="flex relative mt-2 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
        				px-3 font-sourceCode py-6 no-scrollbar bg-black/50">
        					<div 
	        				onClick={copyTitle}
	        				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
	        					
	        					<BiCopyAlt id="titlecopy_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
	        				</div>
	        				{
	        					generatedTitle ? 
	        					""
	        					:
	        					<div className="flex">
	        						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
		        					alt=""
		        					className="h-7 w-7 mr-5"
		        					/>
		        					Creating Title
	        					</div>
	        				}
	        				<div id="title_block" className="flex whitespace-pre-wrap "/>
        				</div>
        				<h1 className="text-xl font-medium mt-10 text-[#FFF]">Suggested <span className="text-orange-500">Description</span></h1>
        				<div id="text_block" className="flex relative mt-2 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
        				px-3 font-sourceCode py-6 no-scrollbar bg-black/50">
        					<div 
	        				onClick={copyDescription}
	        				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
	        					
	        					<BiCopyAlt id="descriptioncopy_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
	        				</div>
	        				{
	        					generatedDescription ? 
	        					""
	        					:
	        					<div className="flex">
	        						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
		        					alt=""
		        					className="h-7 w-7 mr-5"
		        					/>
		        					Creating Description
	        					</div>
	        				}
	        				<div id="description_block" className="flex whitespace-pre-wrap"/>
        				</div>
        				<h1 className="text-xl font-medium mt-10 text-[#FFF]">Suggested <span className="text-green-400">Tags</span></h1>
        				<div className="flex relative mt-2 border-[1px] border-gray-400 rounded-xl text-[#dcdcdc] max-w-[100%] 
        				px-3 font-sourceCode py-6 no-scrollbar bg-black/50">
        					<div 
	        				onClick={copyTags}
	        				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
	        					
	        					<BiCopyAlt id="tagscopy_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
	        				</div>
	        				{
	        					generatedTags ? 
	        					""
	        					:
	        					<div className="flex">
	        						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
		        					alt=""
		        					className="h-7 w-7 mr-5"
		        					/>
		        					Creating Tags
	        					</div>
	        				}
	        				<div className="flex whitespace-pre-wrap " id="tags_block"></div>
        				</div>
        				<div className="h-10 w-full mb-50"/>
        			</div>
        		</div>
        	</div>


	</div>


	)
}