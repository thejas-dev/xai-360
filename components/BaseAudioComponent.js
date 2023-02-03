import {useState,useEffect} from 'react';
import ImageKit from "imagekit"
import {BiCopyAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import CircularProgress from '@mui/material/CircularProgress';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import axios from 'axios';

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
    	setLoader(true);
    	document.getElementById('resultContainer').classList.remove('hidden');
    	const loading_container =  document.getElementById('loading_container')
    	loading_container.classList.remove('hidden');
    	loading_container.scrollIntoView({behavior:"smooth",block:"center"});
		assembly
        .post("/transcript", {
            audio_url: uploadedUrl,
            language_code: language,
	        punctuate :true,
	        format_text :true
        })
        .then((res) => {
        	repeatRequest(res.data.id)
        })
        .catch((err) => console.error(err));
    }

    const repeatRequest = async(Id) => {
    	setGeneratedText('');
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
	    		console.log(generatedResponse)
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
		},20)
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
				

		<Header2 hide="true" />
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
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
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
			<div id="resultContainer" className="flex flex-col relative border-[1px] border-gray-400 mt-10 min-h-screen rounded-xl text-[#dcdcdc] max-w-[100%] 
			px-3 font-sourceCode py-3 no-scrollbar">
				<h1 className="text-xl font-medium mx-auto mb-5 text-center text-shadow-fire">Summarized Audio <span className="text-sky-500">Result</span></h1>
				<div 
				onClick={copyResponse}
				className="absolute cursor-pointer rounded-xl top-2 right-2 p-2 bg-gray-700/80">
					<BiCopyAlt id="copycode_icon" className="md:h-5 h-4 w-4 md:w-5 text-gray-300 hover:text-sky-300"/>
				</div>
				{
					generatedText ? 
					""
					:
					<div className="flex mx-auto">
						<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
    					alt=""
    					className="h-7 w-7 mr-5"
    					/>
    					Detecting Entity
					</div>
				}
				<div id="resultBox" className="flex font-sourceCode mt-5 whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll">


				</div>
			</div>

			<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 font-sourceCode mt-10 mb-10 mx-auto"/>


    	</motion.div>


		</div>


	)
}