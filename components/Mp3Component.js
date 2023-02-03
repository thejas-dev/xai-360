import {useState,useEffect} from 'react';
import {BiCopyAlt} from 'react-icons/bi';
import InfoBox from './InfoBox';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import { Configuration, OpenAIApi } from "openai";
import CircularProgress from '@mui/material/CircularProgress';
import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
import {AiOutlineDelete,AiOutlineDownload} from 'react-icons/ai';
import {reduceOneBlueTokenRoutes} from '../utils/ApiRoutes';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'

export default function Mp3Component() {
	// body...
	const [infoVisiblity,setInfoVisiblity] = useState(false);
	const [prompt,setPrompt] = useState('');
	const [text,setText] = useState('');
	const [name,setName] = useState('XAI audio');
	const [name2,setName2] = useState('XAI audio')
	const [recording,setRecording] = useState(false);
	const [language,setLanguage] = useState('ta')
	const [loader,setLoader] = useState('');
	const [timestamp,setTimestamp] = useState(false);
	const [voice,setVoice] = useState('');
	const [audioUrl,setAudioUrl] = useState('');
	const [audioUrl2,setAudioUrl2] = useState('');
	const [timestamp2,setTimestamp2] = useState(false);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

	useEffect(()=>{
		if(loader){
			document.getElementById('upperDesign').classList.add('animate-ping');
			document.getElementById('lowerDesign').classList.add('animate-ping');
		}else{
			document.getElementById('upperDesign').classList.remove('animate-ping');
			document.getElementById('lowerDesign').classList.remove('animate-ping');
		}
	},[loader])

	const languages = [
	{ code: 'ta', name: 'Tamil' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hy', name: 'Armenian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'zh', name: 'Chinese' },
    { code: 'zh-cn',name: 'Chinese (Mandarin/Chine)' },
    { code: 'zh-tw', name: 'Chinese (Mandarin/Taiwan)' },
    { code: 'zh-yue', name:'Chinese (Cantonese)' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'en-au', name: 'English (Australia)' },
    { code: 'en-uk', name: 'English (United Kingdom)' },
    { code: 'en-us', name: 'English (United State)' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'id', name: 'Indonesian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'la', name: 'Latin' },
    { code: 'lv', name: 'Latvian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pt-br', name: 'Portuguese (Brazil)' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'es', name: 'Spanish' },
    { code: 'es-es', name: 'Spanish (Spain)' },
    { code: 'en-us', name: 'Spanish (United States)' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' }
    ]


	const generateAudio = async() => {
		setLoader(true);
		document.getElementById('audio_block').classList.remove('hidden');
		const response = await fetch(`http://localhost:3333/audio?text=${text}&language=${language}&name=${name}`);
		const audioBlob = await response.blob();
		const audioUrl = URL.createObjectURL(audioBlob);
		const audio = document.getElementById('audio_source')
		audio.setAttribute('src',audioUrl);
		const link = document.createElement('a');
	    link.href = URL.createObjectURL(audioBlob);
	    if(timestamp){
	    	link.download = `${name}-${Date.now()}.mp3`
	    }else{
	    	link.download = `${name}.mp3`;
	    }	    
	    link.click();
		audio.play();
		setLoader(false);
	}


	const startRecording = () =>{
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true)
        }).catch((e) => console.error(e));
  }
  	

     const stopRecording = () => {
     	navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
     		let tracks = stream.getTracks()
     		tracks.map((track)=>{
     			track.stop();
     		})
     	}).catch((err)=>{
     		console.log(err)
     	})
     	Mp3Recorder
	      .stop()
	      .getMp3()
	      .then(([buffer, blob]) => {
	      	const file = new File(buffer,'XAI-audio.mp3',{
	      		type:blob.type,
	      		lastModified:Date.now()
	      	})
	      	const player = new Audio(URL.createObjectURL(file))
	      	player.controls=true
	      	makeItBetter(URL.createObjectURL(blob));
	      	player.play();
	        setAudioUrl2(blob)
	        setRecording(false);
      	}).catch((e) => console.log(e));
  };


	const makeItBetter = (dataurl) => {	
		const element = document.getElementById('audio_source2');
		element.setAttribute('src',audioUrl2);
	}



	const deleteAudio = () => {
		setAudioUrl2('');
	}
	const downloadAudio = () => {
		const link = document.createElement('a');
	    link.href = URL.createObjectURL(audioUrl2);
	    if(timestamp2){
	    	link.download = `${name2}-${Date.now()}.mp3`
	    }else{
	    	link.download = `${name2}.mp3`;
	    }
	    link.click();
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
		

		<Header2 hide="true" redirect="converttoaudiofile"/>
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
		<h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Text to <span className="text-sky-500">Audio File</span></h1>	
		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
			<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
				<div 
				id="language_container"
				className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
					<h1 className="text-xl text-[#FFF] font-semibold ml-3">Select Language</h1>
					<div 
					id="formalorinformal_box"
					className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
						<select 
						value={language}
						onChange={(e)=>setLanguage(e.target.value)}
						id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
						  {
						  	languages.map((lang)=>(
						  		<option key={lang.name} value={lang.code}>{lang.name}</option>
						  	))
						  }
						</select>
						
					</div>
				</div>
				<div 
				id="voice_container"
				className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
					<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">File name</h1>
					<div 
					id="lettertype_box"
					className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
					border-gray-400 focus-within:border-orange-500 flex-col">
						<input 
						value={name}
						onChange={(e)=>setName(e.target.value)}
						id="countries" className="border text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-sky-600 placeholder-gray-400 focus:border-orange-500 text-white outline-none " />
					</div>
	    		</div>
    		</div>
			<h1 className="font-mono tracking-[2px] text-xl text-gray-200 mt-10">Type Here</h1>
			<div 
			id="text_box"
			className="w-full h-[200px] px-2 py-2 mt-2 border border-[2.5px] rounded-xl border-gray-400
			transition-all duration-200 backdrop-blur-sm ease-in-out focus-within:border-sky-400">
				
				<textarea 
				value={text}
				onChange={(e)=>setText(e.target.value)}
				className="bg-transparent scroll-smooth placeholder:text-gray-700 text-gray-300 w-full h-full outline-none font-sourceCode"
				placeholder="Type here to get audio file"
				/>
			</div>
			<div className={`mx-auto mt-5 items-center ${timestamp ? 'bg-gray-500' : 'bg-gray-700/50' } rounded-xl px-4 py-2 flex gap-3`}>
				<input type="checkbox" onClick={()=>setTimestamp(!timestamp)}
				className=""/>
				<h1 className="text-md font-mono text-gray-200 ">Timestamp</h1>

			</div>
			<div 
			id="audio_block"
			className="mx-auto hidden rounded-xl overflow-hidden mt-5 border-gray-400 px-4 py-2">
				<audio id="audio_source" src="" controls/>
			</div>
			<center>
				<button onClick={()=>{if(!loader && text.length>2 )generateAudio();}} className="mt-7 bg-green-700 
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
				transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out">
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Download'
					}
				</button>
			</center>
		</motion.div>
		<div className="h-[1px] w-[80%] md:w-[70%] mt-7 bg-gray-200 mx-auto"/>

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
        className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[60px]
    	scroll-smooth">
    		<h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Speech to <span className="text-orange-500">Audio File</span></h1>	
    		<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
				<div 
				id="voice_container"
				className="md:w-[50%] mx-auto px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-orange-400 w-full">
					<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">File name</h1>
					<div 
					id="lettertype_box"
					className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
					border-gray-400 focus-within:border-orange-500 flex-col">
						<input 
						value={name2}
						onChange={(e)=>setName2(e.target.value)}
						id="countries" className="border text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-sky-600 placeholder-gray-400 focus:border-orange-500 text-white outline-none " />
					</div>
	    		</div>
    		</div>
    		<div 
    		id="audio_container"
    		className="mt-10 mb-10 w-[100%]">
    			<div className="flex flex-col items-center w-full">
    				<div className="relative flex justify-center">
    					<div className="h-full md:w-[20%] w-[50%] blur-md rounded-full transition-all duration-200 
    					ease-in-out bg-sky-500 z-0 absolute "/>
		    			{
		    				recording ?
		    				<img 
		    				onClick={stopRecording}
		    				src="https://ik.imagekit.io/d3kzbpbila/2906736_d4clBwWt0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673772059408"
		    				alt=""
		    				className="w-[50%] cursor-pointer z-10 md:w-[20%]"
		    				/>
		    				:
		    			
		    				<img 
		    				onClick={startRecording}
		    				src="https://ik.imagekit.io/d3kzbpbila/Election-Mic-Outline-icon_IcyN2TWm1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673771184754"
		    				alt=""
		    				className="w-[50%] cursor-pointer z-10 md:w-[20%]"
		    				/>
		    			}
	    				
	    			</div>
	    			<h1 className="mt-7 text-xl font-medium text-gray-400">Tap to {recording ? "stop" : "speak"}</h1>
    			</div>

    			<div className="mt-10 w-full flex flex-col items-center">
    				<div className="">
    					<audio
    					id="audio_source2"
    					className="rounded-full bg-gray-700" type="audio/mp3" controls />
    				</div>
    				<div className={`mx-auto mt-5 items-center ${timestamp2 ? 'bg-gray-500' : 'bg-gray-700/50' } rounded-xl px-4 py-2 flex gap-3`}>
						<input type="checkbox" onClick={()=>setTimestamp2(!timestamp2)}
						className=""/>
						<h1 className="text-md font-mono text-gray-200 ">Timestamp</h1>
					</div>
    				<div className="flex mt-7 justify-center w-full">
    					<button 
    					onClick={deleteAudio}
    					className="flex text-[#FFF] text-xl font-medium px-3 py-2 rounded-xl bg-red-500">
    						<AiOutlineDelete className="h-7 w-7 mr-3 text-[#FFF]"/>Delete
    					</button>
	    				<button 
	    				onClick={()=>{if(audioUrl2)downloadAudio()}}
	    				className={`flex text-[#FFF] ${audioUrl2 ? "cursor-pointer":"cursor-default"} ml-7 text-xl font-medium px-3 py-2 rounded-xl ${audioUrl2 ? "bg-green-500":"bg-green-700/80" }`}>
	    					<AiOutlineDownload className="h-7 w-7 mr-3 text-[#FFF]"/>Download
	    				</button>
       				</div>

    			</div>
					

			</div>



    	</motion.div>
	</div>


	)
}