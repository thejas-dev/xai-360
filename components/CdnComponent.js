import {useState,useEffect} from 'react';
import ImageKit from "imagekit"
import {BiCopyAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';
import Header2 from './Header2';	
import CircularProgress from '@mui/material/CircularProgress';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useRecoilState} from 'recoil';
import {setCdnArrayRoutes} from '../utils/ApiRoutes';
import axios from 'axios';
import {currentUserState} from '../atoms/userAtom'




export default function CdnComponent() {
	// body...
	const [loader,setLoader] = useState('');
	const [generatedResponse,setGeneratedResponse] = useState([]);
	const [path2,setPath2] = useState('');
	const [url,setUrl] = useState('');
	const [file,setFile] = useState('');
	const [fileName,setFileName] = useState('XAI-CDN');
	const [fileType,setFileType] = useState('');
	const [uploadArray,setUploadArray] = useState([]);
	const [uploadFileName,setUploadFileName] = useState([]);
	const imagekit = new ImageKit({
	    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_ID,
	    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
	    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT
	});
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

	const openInput = () => {
    	document.getElementById('file_input').click();
    }

    const imagePathCheck = (path) =>{
		if(path){
			if(path.split('/').includes('data:image')){
				return true;				
			}
		}
	}

	const audioPathCheck = (path) =>{
		if(path){
			if(path.split('/').includes('data:audio')){
				return true;
			}
		}
	}

	const videoPathCheck = (path) =>{
		if(path){
			if(path.split('/').includes('data:video')){
				return true;
			}
		}
	}

	const zipPathCheck = (path) => {
		if(path){
			if(path.split(';').includes('data:application/zip')){
				return true;
			}
		}
	}
 
	const pdfPathCheck = (path) => {
		if(path){
			if(path.split(';').includes('data:application/pdf')){
				return true;
			}
		}
	}


	const url1Setter = () =>{
		const file_input = document.getElementById('file_input');
		const files = file_input.files;
		Object.keys(files).forEach(i=>{
			const file = files[i];
			setUploadFileName(uploadFileName=>[...uploadFileName,file.name]);
			const reader = new FileReader();
			reader.addEventListener('load',()=>{
				let uploaded_file = reader.result;
				setUploadArray(uploadArray=>[...uploadArray,uploaded_file])
			})
			reader.readAsDataURL(file);
		})	
	}

	const uploadImage = (url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"Images",
	    fileName : fileName,   //required
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,'Something went wrong');
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}
			
	const uploadAudio = async(url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"Audio",
	    fileName : fileName,   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,'Something went wrong');
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}

	const uploadVideo = async(url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"Video",
	    fileName : fileName,   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,'Something went wrong');
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}

	const uploadZip = async(url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"Zip",
	    fileName : fileName,   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,'Something went wrong');
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}
		
	const uploadPdf = async(url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"PDF",
	    fileName : fileName,   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,err.message);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}

		
	const uploadCode = async(url,i) => {
		imagekit.upload({
	    file : url, //required
	    folder:"Code",
	    fileName : fileName,   //required
	    extensions: [
	        {
	            name: "google-auto-tagging",
	            maxTags: 5,
	            minConfidence: 95
	        }
	    ]
		}).then(response => {
		   	const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,response.url);
			setGeneratedResponse(generatedResponse=>[...generatedResponse,response.url])
		}).catch(error => {
		    const element = document.getElementById(`resultBox-${i}`);
			typeMessageMain(element,'Something went wrong');
			setGeneratedResponse(generatedResponse=>[...generatedResponse,"Something went wrong"])
		});
	}
	
	const uploadNow = async() => {
		const element2 = document.getElementById('resultContainer')
		element2.classList.remove('hidden')
		element2.scrollIntoView({behavior:"smooth",block:"center"})
		for(var i=0;i<uploadArray.length;i++){
			const upload_file = uploadArray[i];
			if(await imagePathCheck(upload_file)){
				await uploadImage(upload_file,i)								
			}else if(await audioPathCheck(upload_file)){
				await uploadAudio(upload_file,i);
			}else if(await videoPathCheck(upload_file)){
				await uploadVideo(upload_file,i)
			}else if(await zipPathCheck(upload_file)){
				await uploadZip(upload_file,i)
			}else if(await pdfPathCheck(upload_file)){
				await uploadPdf(upload_file,i)
			}else{
				await uploadCode(upload_file,i)
			}
		}
	}

	const typeMessageMain = (element,text) =>{
		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:'center'});
		updateDatabaseArray(text)
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

	const upload = () => {
		if(uploadArray.length>0 && fileName){
			uploadNow();
		}
	}

	const updateDatabaseArray = async(url) => {
      const cdn = currentUser.cdnArray;
      const cdnArray = [...cdn,url]
      const userId = currentUser._id;
      const {data} = await axios.post(setCdnArrayRoutes,{
        cdnArray,userId
      })
      setCurrentUser(data.obj)
    }
	

	const copyText = (i) => {
		console.log(i)
		navigator.clipboard.writeText(generatedResponse[i])
		document.getElementById(`copycode_icon-${i}`).classList.add('text-green-500')
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
    		<h1 className="text-4xl md:text-5xl mb-3 text-[#FFF] text-shadow-fire mx-auto">CDN <span className="text-sky-500">Convertor</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
    		<input 
    			id="file_input"
    			type="file" value={path2} onChange={(e)=>{
              		setPath2(e.target.value);url1Setter();
              	}} hidden multiple="multiple" />
    			<div 
    			id="prompt_container"
    			className="px-3 py-4 mt-7 flex flex-col w-full">
    				<h1 className="text-4xl text-[#FFF] whitespace-nowrap font-semibold ml-3">Upload <span className="text-sky-500">Files</span> <span className="text-red-500">*</span> </h1>
    				<div 
    				onClick={openInput}
    				id="prompt_box"
    				className="w-full mt-5 mb-5 backdrop-blur-sm items-center flex flex-wrap px-3 py-2 rounded-xl border-[1px] 
    				border-dashed border-gray-400 focus-within:border-orange-400 flex-col">
						<div className="w-full h-full items-center flex-col break-all flex flex-wrap">
							{
								uploadArray.length>0?
								<h1 className="md:text-xl text-md font-medium text-[#FFF]">
								{
									uploadFileName.map((name,i)=>{
										return (
										<>
											<span>{name}</span>
											{
												i < uploadArray.length && <span className="text-orange-500"> ,</span>
											}
										</>
										)
									})
								}
								</h1>
								:
								<AiOutlinePlusCircle className="text-sky-500 cursor-pointer h-20 w-20 mx-auto mt-3"/>
							}							
							<h1 className="md:text-xl text-md text-center md:mt-0 mt-3 text-sky-600 font-medium mb-3">
							{
								uploadArray.length>0 ? 
								'Successfully Mounted'
								:
								'Upload'
							}
							<p 
							id="notsupported_text"
							className="text-md hidden md:text-lg text-center font-serif text-red-500">Format is not supported</p>
							</h1>
						</div>
					</div>
			<div className="w-full z-10 mt-10 rounded-xl px-2 py-2 flex md:flex-row flex-col">
    			<div 
    			id="language_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">File Name<span className="text-red-500">*</span></h1>
    				<div 
    				id="language_box"
    				className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
						<input 
						value={fileName}
						placeholder=""
						onChange={(e)=>setFileName(e.target.value)}
						id="countries" className="border outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 
						text-white focus:ring-orange-500 focus:border-orange-500"/>
    				</div>
    			</div>
    			<div 
    			id="filter_container"
    			className="md:w-[50%] px-3 py-4 md:items-center flex flex-col border-l-2 md:flex-row border-gray-400 focus-within:border-sky-400 w-full">
    				<h1 className="text-xl text-[#FFF] whitespace-nowrap font-semibold ml-3">File <span className="text-sky-500">Type</span></h1>
    				<div 
    				id="moderate_box"
    				className="w-full md:ml-5 md:mt-0 mt-3 flex px-3 py-2 rounded-xl border-[1px] 
    				border-gray-400 focus-within:border-sky-400 flex-col">
						<select 
						value={fileType}
						onChange={(e)=>setFileType(e.target.value)}
						id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
						border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">
						  <option value="strict">Any</option>						  
						</select>												
    				</div>
    			</div>    			
    		</div>
    		</div>
    		<h1 className="text-md text-gray-500 text-center font-medium">Do not exit or refresh the page while uploading</h1>
    		<center>
				<button onClick={()=>{if(!loader && uploadArray )upload();}} className={`mt-7 ${uploadArray ? "bg-green-600" : "bg-green-700/60" }
				w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
				transition duration-200 uppercase flex items-center justify-center font-mono ease-in-out`}>
					{
						loader? 
						<CircularProgress color="inherit" />
						:
						'Upload'
					}
				</button>
			</center>
			<div id="resultContainer" className="flex flex-col relative hidden mt-7 border-[0.01px] border-gray-400/70 rounded-xl text-[#dcdcdc] max-w-[100%] 
			px-5 font-sourceCode py-3 no-scrollbar  bg-black/10">
				<h1 className="text-xl font-medium mx-auto mb-5 text-center">Result</h1>
				{
					uploadFileName.map((name,i)=>(
						<div className="mb-7 px-2 py-3 border-[1px] border-gray-400 rounded-xl" >
							{
								generatedResponse.length>i ? 
								<div className="text-center" >{name} Uploaded Successfully</div>
								:
								<div className="flex mx-auto">
									<img src="https://ik.imagekit.io/d3kzbpbila/loading-gif_6ZZ0dqfMG.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1673616220454"
			    					alt=""
			    					className="h-7 w-7 mr-5"
			    					/>
			    					Uploading {name} 
								</div>
							}
							<div id={`resultBox-${i}`} className="flex relative mt-7 mb-3 font-sourceCode break-all rounded-xl p-2 m-2 border-[1px] 
							border-pink-500 whitespace-pre-wrap md:overflow-x-hidden overflow-x-scroll z-50">
								{
									generatedResponse.length>i &&
									<div 
									className="absolute cursor-pointer rounded-xl top-2 right-2 p-1 bg-gray-700/80">									
										<BiCopyAlt 
										onClick={()=>{copyText(i)}}
										id={`copycode_icon-${i}`} className="md:h-4 h-3 w-3 md:w-4 text-gray-300 hover:text-sky-300"/>
									</div>
								}								
							</div>
						</div>
					))
				}
				
			</div>

			<div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>

    	</motion.div>
    </div>


	)
}