import {useState,useEffect} from 'react';
import ImageKit from "imagekit"
import {BiCopyAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import CircularProgress from '@mui/material/CircularProgress';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import axios from 'axios';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import {reduceOneOrangeTokenRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from './LowTokenComponent';

export default function EntityComponent() {
	// body...
	const [loader,setLoader] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState('');
	const [language,setLanguage] = useState('en');
	const [uploadFile,setUploadFile] = useState('');
	const [path2,setPath2] = useState('');
	const [fileName,setFileName] = useState('');
	const [generatedText,setGeneratedText] = useState('');
	const [summaryModel,setSummaryModel] = useState('informative');
	const [summaryType,setSummaryType] = useState('select');	
	const [uploadedUrl,setUploadUrl] = useState('');
	const [entityArray,setEntityArray] = useState([]);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [showPricingState,setShowPricingState] = useState(false);
	const language_array = [
		{ code: 'en', name: 'Global English' },
		{ code: 'en_au', name: 'Australian English' },
		{ code: 'en_uk', name: 'British English' },
		{ code: 'en_us', name: 'US English' },
		{ code: 'es', name: 'Spanish' },
		{ code: 'fr', name: 'French' },
		{ code: 'de', name: 'German' },
		{ code: 'it', name: 'Italian' },
		{ code: 'pt', name: 'Portugese' },
		{ code: 'nl', name: 'Dutch' },
		{ code: 'hi', name: 'Hindi' },
		{ code: 'ja', name: 'Japanese' },
	]


	const entityTypesDetected1 = [
		{name:'blood_type',description:'Blood type (e.g., O-, AB positive)'},
		{name:'credit card cvv',description:'Credit card verification code (e.g., CVV: 080)'},
		{name:'credit card expiration',description:'Expiration date of a credit card'},
		{name:'credit card number',description:'Credit card number'},
		{name:'date',description:'Specific calendar date (e.g., December 18)'},
		{name:'date of birth',description:'Date of Birth (e.g., Date of Birth: March 7, 1961)'},
		{name:'drug',description:'Medications, vitamins, or supplements (e.g., Advil, Acetaminophen, Panadol)'},
		{name:'event',description:'Name of an event or holiday (e.g., Olympics, Yom Kippur)'},
		{name:'email address',description:'Email address (e.g., support @assemblyai.com)'},
		{name:'injury',description:'Bodily injury (e.g., I broke my arm, I have a sprained wrist)'},
		{name:'language',description:'Name of a natural language (e.g., Spanish, French)'},
		{name:'location',description:'Any Location reference including mailing address, postal code, city, state, province, or country'},
		{name:'medical condition',description:'Name of a medical condition, disease, syndrome, deficit, or disorder (e.g., chronic fatigue syndrome, arrhythmia, depression)'},
		{name:'medical process',description:'Medical process, including treatments, procedures, and tests (e.g., heart surgery, CT scan)'},
		]
	const entityTypesDetected2 = [
		
		{name:'money amount',description:'Name and/or amount of currency (e.g., 15 pesos, 1000 inr)'},
		{name:'nationality',description:'Terms indicating nationality, ethnicity, or race (e.g., American, Asian, Caucasian)'},
		{name:'occupation',description:'Job title or profession (e.g., professor, actors, engineer, CPA)'},
		{name:'organization',description:'Name of an organization (e.g., CNN, McDonalds, University of Alaska)'},
		{name:'person age',description:'Number associated with an age (e.g., 27, 75)'},
		{name:'person name',description:'Name of a person (e.g., Bob, Doug Jones)'},
		{name:'phone number',description:'Telephone or fax number'},
		{name:'political affiliation',description:'Terms referring to a political party, movement, or ideology (e.g., Republican, Liberal)'},
		{name:'religion',description:'Terms indicating religious affiliation (e.g., Hindu, Catholic)'},
		{name:'us social security number',description:'Social Security Number or equivalent'},
		{name:'drivers license',description:'Driver’s license number (e.g., DL# 356933-540)'},
		{name:'banking information',description:'Banking information, including account and routing numbers'}
	]

	const imagekit = new ImageKit({
	    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_ID,
	    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
	    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT
	});

	const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: process.env.NEXT_PUBLIC_ASSEMBLY_API_TOKEN,
        },
    })

	useEffect(()=>{
		if(loader){
			document.getElementById('upperDesign').classList.add('animate-ping');
			document.getElementById('lowerDesign').classList.add('animate-ping');
		}else{
			document.getElementById('upperDesign').classList.remove('animate-ping');
			document.getElementById('lowerDesign').classList.remove('animate-ping');
		}
	},[loader])	

	const audioPathCheck = (path) =>{
		if(path){
			if(path.split('/').includes('data:audio')){
				return true;
			}
		}
	}

	const openInput = () => {
		if(!loader){
			document.getElementById('file_input').click();
		}    	
    }

    function convertToMinutesAndSeconds(milliseconds) {
	  var minutes = Math.floor(milliseconds / 60000);
	  var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
	  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

 	const url1Setter = async() =>{
    
      const file_input = document.querySelector('#file_input');
      const reader = new FileReader();

      reader.addEventListener('load',async()=>{
        let uploaded_file = reader.result;
        if(audioPathCheck(uploaded_file)){
        	const audio = new Audio();
        	audio.src = uploaded_file;
        	setUploadFile(uploaded_file);
        	audio.onloadedmetadata = () => {
        		if(audio.duration < 300){
	        		setUploadUrl('');
		        	uploadAudio(uploaded_file);
	        	}else{
	        		const element = document.getElementById('overduration_text')
			    	element.classList.remove('hidden');
			    	element.classList.add('animate-pulse');
			    	setUploadFile('');
			    	setTimeout(function() {
			    		element.classList.add('hidden');
			    		element.classList.remove('animate-pulse');
			    	}, 5000);
	        	}
        	}      	
        }else{
        	const element = document.getElementById('notsupported_text')
        	element.classList.remove('hidden');
        	element.classList.add('animate-pulse');
        	setTimeout(function() {
        		element.classList.add('hidden');
        		element.classList.remove('animate-pulse');
        	}, 5000);
        }        
      });
      if(file_input){
      	setFileName(file_input.files[0].name)
        reader.readAsDataURL(file_input.files[0]);
      }
    
  }

  const uploadAudio = async(uploadFileUrl) => {
		imagekit.upload({
	    file : uploadFileUrl, //required
	    folder:"Audio",
	    fileName : 'XAI-audio',   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	setUploadUrl(response.url);
		}).catch(error => {
		    console.log(error)
		});
	}

    const transcribe = () => {
    	if(currentUser?.orangeToken>0){
	    	setLoader(true);
	    	document.getElementById('resultContainer').classList.remove('hidden');
	    	const loading_container =  document.getElementById('loading_container')
	    	loading_container.classList.remove('hidden');
	    	loading_container.scrollIntoView({behavior:"smooth",block:"center"});
			assembly
	        .post("/transcript", {
	            audio_url: uploadedUrl,
	            language_code: language,
		        entity_detection: true
	        })
	        .then((res) => {
	        	repeatRequest(res.data.id)
	        })
	        .catch((err) => console.error(err));
	        reduceOneBlueToken();
    	}else{
    		showPricing();
    	}
    }

    const repeatRequest = async(Id) => {
    	setGeneratedText('');
    	setEntityArray([])
    	const interval = setInterval(()=>{
    		assembly
		    .get(`/transcript/${Id}`)
		    .then((res) => {
		    	setGeneratedResponse(res.data);
		    	if(res.data.status === 'completed'){
		    		clearInterval(interval);
		    	}
		    })
		    .catch((err) => console.error(err));
    	},500)
    	
    }

    useEffect(()=>{
    	if(generatedResponse){
	    	const loading_bar = document.getElementById('loading_bar');
	    	const loading_text = document.getElementById('loading_text');
	    	const element = document.getElementById('resultBox');
	    	if(generatedResponse.status==='queued'){
	    		loading_bar.style.width = '20%'
	    		typeMessageLoading(loading_text,'Summarizing...')
	    	}else if(generatedResponse.status==='processing'){
	    		loading_bar.style.width = '60%'
	    		typeMessageLoading(loading_text,'Processing...')
	    	}else if(generatedResponse.status==='completed'){
	    		loading_bar.style.width = '100%'
	    		typeMessageLoading(loading_text,'Completed...')
	    		setGeneratedText(generatedResponse.text)
	    		setEntityArray(generatedResponse.entities)
	    	}else{
	    		loading_bar.style.width = '0%'
	    		typeMessageLoading(loading_text,'Error...')
	    		typeMessageMain(element,'Error...')
	    	}
    	}
    	
    },[generatedResponse?.status])


   const typeMessageLoading = (element,text) => {
    	let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:'center'});

		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
			}
		},20)
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
		},50)
	}

	useEffect(()=>{
		if(entityArray.length>0){
			for(var i=0;i<entityArray.length;i++){
				const element = document.getElementById(`text-${i}`)
				typeMessageMain(element,entityArray[i].text);
			}
		}else{
			setLoader(false);
		}		
	},[entityArray])
	
	const reduceOneBlueToken = async() => {
 		let orangeToken = currentUser.orangeToken;
 		orangeToken = orangeToken - 1;
 		const userId = currentUser._id
 		const {data} = await axios.post(reduceOneOrangeTokenRoutes,{
 			orangeToken,userId
 		});
        setCurrentUser(data.obj)
 	}

  	const showPricing = () => {
		setShowPricingState(!showPricingState)
  	}

    const copyResponse = () => {
    	navigator.clipboard.writeText(generatedText);
    }

	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-pink-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-pink-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
		<div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
			<LowTokenComponent token="orange" showPricing={showPricing}/>
		</div>

		<Header2 hide="true" redirect="entity" token="orange"/>
		<motion.div 
          initial={{
            opacity:0
          }}
          whileInView={{
            opacity:[0.4,0.1]
          }}
          transition={{
            duration:2
          }}
          className="absolute z-0 h-full w-full bg-fixed
          bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/audio_background_rkb6cCJOY.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673964563329')] "
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
    		<h1 className="text-4xl md:text-5xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Audio <span className="text-sky-500">Entity Detection</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[40%] mx-auto bg-orange-500 "/>
    		<h1 className="text-xl md:text-2xl mb-3 mt-10 text-[#FFF] text-shadow-fire mx-auto">Entities <span className="text-purple-500">Types Detected</span></h1>	
			<div className="mt-2 flex justify-between border-[1px] border-gray-400 bg-black/20 rounded-xl px-2 md:px-3 py-2 flex md:flex-row flex-col w-full">
				<div className="flex flex-col w-full md:px-2">
					<div className="w-full md:px-1 py-2 flex items-center">
						<div className="w-[50%] font-medium text-sky-500 text-lg">
							Entity Name
							<div className="w-[50%] md:w-[40%]  ml-1 mt-3 mb-2 bg-orange-500 h-[2px]"/>
						</div>
						<div className="w-[50%] font-medium text-green-500 text-lg">
							Description
							<div className="w-[50%] md:w-[40%]  ml-1 mt-3 mb-2 bg-orange-500 h-[2px]"/>
						</div>
					</div>
					
					{
						entityTypesDetected1.map((entity,i)=>(
							<div key={i} className="w-full mt-3 md:px-1 py-2 flex items-center">
								<div className="text-gray-400 text-lg w-[50%]">
									<h1 className="px-2 py-1 text-gray-300 rounded-xl">{entity.name}</h1>
								</div>
								<div className="text-gray-400 items-start text-lg w-[50%]">{entity.description}</div>
							</div>
						))
					}
				</div>
				<div className="flex flex-col w-full md:border-l-2 md:pl-3 md:border-gray-400">
					<div className="w-full md:px-1 py-2 md:flex hidden items-center">
						<div className="w-[50%] font-medium text-sky-500 text-lg">
							Entity Name
							<div className="w-[50%] md:w-[40%] ml-1 mt-3 mb-2 bg-orange-500 h-[2px]"/>
						</div>
						<div className="w-[50%] font-medium text-green-500 text-lg">
							Description
							<div className="w-[50%] md:w-[40%] ml-1 mt-3 mb-2 bg-orange-500 h-[2px]"/>
						</div>
					</div>
					{
						entityTypesDetected2.map((entity,i)=>(
							<div key={i} className="w-full mt-3 md:px-1 py-2 flex items-center">
								<div className="text-gray-400 text-lg w-[50%]">
									<h1 className="px-2 py-1 text-gray-300 rounded-xl">{entity.name}</h1>
								</div>
								<div className="text-gray-400 items-start text-lg w-[50%]">{entity.description}</div>
							</div>
						))
					}
				</div>
			</div>
    		<input 
    			id="file_input"
    			type="file" value={path2} onChange={(e)=>{
              		setPath2(e.target.value);url1Setter();
              	}} hidden />
    			<div 
    			id="prompt_container"
    			className="px-3 py-4 mt-7 flex flex-col w-full">
    				<h1 className="text-4xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Upload <span className="text-sky-500">Audio</span> <span className="text-red-500">*</span> </h1>
    				<div 
    				onClick={openInput}
    				id="prompt_box"
    				className="w-full mt-5 mb-5 backdrop-blur-sm items-center flex flex-wrap px-3 py-2 rounded-xl border-[1px] 
    				border-dashed border-gray-400 focus-within:border-orange-400 flex-col">
						<div className="w-full h-full items-center flex-col break-all flex flex-wrap">
							{
								uploadFile?
								<h1 className="md:text-xl text-md font-medium text-[#FFF]">
									{fileName}
								</h1>
								:
								<AiOutlinePlusCircle className="text-sky-500 cursor-pointer h-20 w-20 mx-auto mt-3"/>
							}							
							<h1 className="md:text-xl text-md text-center md:mt-0 mt-3 text-sky-600 font-medium mb-3">
							{
								uploadFile ? 
								uploadedUrl?
								<div className="mt-5" >Successfully Uploaded <span className="text-orange-500">{fileName}</span></div>
								:
								<div className="flex mx-auto mt-3">
									<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
			    					alt=""
			    					className="h-7 w-7 mr-5"
			    					/>
			    					Uploading {fileName} 
								</div>
								:
								'Tap to Upload'
							}
							{
								uploadedUrl && !loader ? <p className="text-md mt-3 text-center font-medium text-gray-400">Tap to Upload Again</p> : ""
							}
							<p 
							id="overduration_text"
							className="text-md hidden md:text-lg text-center font-serif text-red-500">Audio with duration less than 5 minutes are only supported</p>
							<p 
							id="notsupported_text"
							className="text-md hidden md:text-lg text-center font-serif text-red-500">Not an Audio File</p>
							</h1>
						</div>
					</div>
				</div>
				<h1 className="flex mx-auto text-xl mt-7 text-gray-500 text-center">Currently some of the dominant languages are only supported</h1>
				<div className="w-full z-10 mt-6 rounded-xl px-2 py-2 flex md:flex-row justify-center flex-col">
	    			<div 
	    			id="language_container"
	    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
	    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Audio <span className="text-sky-500">Language</span></h1>
	    				<div 
	    				id="language_box"
	    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
	    				border-gray-400 focus-within:border-sky-400 flex-col">
							<select 
							value={language}
							onChange={(e)=>setLanguage(e.target.value)}
							id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
							  {
							  	language_array.map((lang)=>(
							  		<option key={lang.name} value={lang.code}>{lang.name}</option>
							  	))
							  }
							</select>												
	    				</div>
	    			</div>    			
	    		</div>
	    		<center>
				<button onClick={()=>{if(!loader && uploadedUrl )transcribe();}} className={`mt-7 ${uploadedUrl ? "bg-green-600" : "bg-green-700/30" }
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:scale-110 active:scale-90 
				transition-all duration-200 uppercase flex items-center justify-center font-mono ease-in-out`}>
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Detect'
					}
				</button>
			</center>
			<div className="flex gap-1 mt-4 items-center justify-center">
				<img src="https://ik.imagekit.io/d3kzbpbila/orangeToken-removebg-preview_Az37BoK1x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674741223618" 
				alt="" className="h-10 w-7"/>
				<h1 className={` md:text-xl text-md font-bold ${currentUser?.orangeToken < 1 ? 'text-red-500':'text-orange-400'}`}>1</h1>
			</div>
			<div 
			id="loading_container"
			className="w-full hidden z-10 px-5 py-2 mt-10 rounded-xl py-2 flex md:px-20 px-6 flex-col justify-center items-center">
				<h1 className="text-center text-xl text-gray-500">Do not Refresh the page untill summarization is finished</h1> 
				<div className="flex mx-auto mt-3">
					{
						!generatedText && 
						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
						alt=""
						className="h-7 w-7 mr-3"
						/>
					}
					<h1 id="loading_text" className="text-xl text-gray-300">Summarizing...</h1> 
				</div>
				<div className="w-full mt-5 rounded-xl h-[6px] bg-gray-700">
					<div 
					id="loading_bar"
					className="h-full w-[20%] transition-all duration-300 ease-in-out rounded-xl bg-orange-500"/>
				</div>
			</div>
			<div id="resultContainer" className="flex hidden flex-col relative mt-10 min-h-screen rounded-xl text-[#dcdcdc] max-w-[100%] 
			px-3 font-sourceCode py-3 no-scrollbar">
				<h1 className="text-xl font-medium mx-auto mb-5 text-center text-shadow-fire">Entity Detection <span className="text-sky-500">Result</span></h1>
				{
					generatedText ? 
					entityArray.length===0 &&
					<div className="flex mx-auto">
    					No Entities Detected please verify the entity list from above list
					</div>
					:
					<div className="flex mx-auto">
						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
    					alt=""
    					className="h-7 w-7 mr-5"
    					/>
    					Detecting Entity
					</div>
				}
				<div id="resultBox" className="flex font-sourceCode mt-5 whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll flex-col">
					{
						entityArray.map((entity,i)=>(
							<div key={i} className="mt-7 px-2 py-3 border-[1px] border-gray-400 rounded-xl bg-black/30">
								<h1 className="text-2xl text-sky-500 text-center mx-auto">Entity {i+1}</h1>
								<h1 className="text-xl mt-2 text-orange-500 text-center mx-auto">{entity.entity_type}</h1>
								<h1 className="text-lg text-gray-500/50 text-center mt-2 mx-auto">Starts from {convertToMinutesAndSeconds(entity.start)} to {convertToMinutesAndSeconds(entity.end)}</h1>
								<h1 
								id={`text-${i}`}
								className="text-md text-[#FFF] mt-2 text-center mx-auto"/>
							</div>
						))
					}

				</div>
			</div>

			<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 font-sourceCode mt-10 mb-10 mx-auto"/>


    	</motion.div>


		</div>


	)
}
