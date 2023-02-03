import axios from 'axios'
import {useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import CircularProgress from '@mui/material/CircularProgress';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'




export default function PdfComponent(argument) {
	// body...
	const [prompt,setPrompt] = useState('');
	const [loader,setLoader] = useState('');
	const [language,setLanguage] = useState('ta');
	const [timestamp,setTimestamp] = useState(false);
	const [name,setName] = useState('XAI-audio');
	const [path2,setPath2] = useState('');
	const [pdf,setPdf] = useState('');
	const [pdfName,setPdfName] = useState('');
	const [pdfDocument, setPdfDocument] = useState(null);
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

    const openInput = () => {
    	document.getElementById('pdf_input').click();
    }


    const url1Setter = async() =>{
    
      const pdf_input = document.querySelector('#pdf_input');
      const reader = new FileReader();

      reader.addEventListener('load',async()=>{
        let uploaded_pdf = reader.result;
        if(uploaded_pdf.split(';')[0].split(':')[1] === 'application/pdf'){
        	setPdf(uploaded_pdf);	
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
      if(pdf_input){
      	setPdfName(pdf_input.files[0].name)
      	
        reader.readAsDataURL(pdf_input.files[0]);
      }
    
  }

  const generateAudio = async() => {
  	document.getElementById('audio_block').classList.remove('hidden');
  	setLoader(true);
	const pdf_input = document.querySelector('#pdf_input');
  	const formData = new FormData();
	formData.append("file", pdf_input.files[0]);
	const response = await fetch(`http://localhost:3333/pdf?language=${language}&name=${name}`, {
		method:'POST',
		body:formData
	}); 
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

	return (
		<div 
	id="main"
	className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-orange-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
				

		<Header2 hide="true" redirect="pdf"  />
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
    		<h1 className="text-4xl md:text-5xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Pdf To <span className="text-sky-500">Audio </span>File</h1>	
    			<input 
    			id="pdf_input"
    			type="file" accept="application/pdf" value={path2} onChange={(e)=>{
              		setPath2(e.target.value);url1Setter();
              	}} hidden />
    			<div 
    			id="prompt_container"
    			className="px-3 py-4 mt-7 flex flex-col focus-within:border-l-2 focus-within:border-orange-400 w-full">
    				<h1 className="text-4xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Upload <span className="text-red-500">*</span> </h1>
    				<div 
    				onClick={openInput}
    				id="prompt_box"
    				className="w-full mt-5 mb-5 backdrop-blur-sm items-center flex px-3 py-2 rounded-xl border-[1px] 
    				border-dashed border-gray-400 focus-within:border-orange-400 flex-col">
						<div className="w-full h-full items-center flex-col flex">
							{
								pdf?
								<h1 className="md:text-xl text-md font-medium text-sky-500">{pdfName}</h1>
								:
								<AiOutlinePlusCircle className="text-sky-500 cursor-pointer h-20 w-20 mx-auto mt-3"/>
							}							
							<h1 className="md:text-xl text-md text-center md:mt-0 mt-3 text-sky-600 font-medium mb-3">
							{
								pdf ? 
								'Successfully Uploaded'
								:
								'Upload'
							}
							<p 
							id="notsupported_text"
							className="text-md hidden md:text-lg text-center font-serif text-red-500">Format is not supported</p>
							</h1>
						</div>
					</div>
    			</div>
    			<div className="w-full z-10 mt-5 rounded-xl px-2 py-2 flex md:flex-row flex-col">
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
	    		<div className={`mx-auto mt-5 items-center ${timestamp ? 'bg-gray-500' : 'bg-gray-700/50' } rounded-xl px-4 py-2 flex gap-3`}>
					<input type="checkbox" onClick={()=>setTimestamp(!timestamp)}
					className=""/>
					<h1 className="text-md font-mono text-gray-200 ">Timestamp</h1>

				</div>
				<div 
				id="audio_block"
				className="mx-auto hidden rounded-xl overflow-hidden mt-5 border-gray-400 px-4 py-2">
					<audio id="audio_source" controls/>
				</div>
				<center>
					<button onClick={()=>{if(!loader && pdf )generateAudio();}} className={`mt-7 ${pdf ? "bg-green-600" : "bg-green-700/60" }
					w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
					transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out`}>
						{
							loader? 
							<CircularProgress color="inherit" />
							:
							'Download'
						}
					</button>
				</center>
    	</motion.div>
    	<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>


    </div>

	)
}