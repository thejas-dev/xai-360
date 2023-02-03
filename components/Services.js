import {motion} from 'framer-motion';
import {TiTickOutline} from 'react-icons/ti';
import {TbPhoneCall} from 'react-icons/tb';
import {SiAirplayaudio} from 'react-icons/si'
import {FaKeycdn} from 'react-icons/fa'
import {RxCodesandboxLogo} from 'react-icons/rx';
import {GiMusicalScore} from 'react-icons/gi'
import { RiCodeSSlashLine } from 'react-icons/ri';
import {FaRegFileAudio} from 'react-icons/fa'
import {CgDebug,CgNotes} from 'react-icons/cg'
import {BiSearchAlt} from 'react-icons/bi'
import {TbBulb} from 'react-icons/tb'
import {MdOutlineArticle,MdOutlineQuestionAnswer,MdOutlineTopic,MdOutlineNotes,MdOutlinePeople} from 'react-icons/md'
import {SlSpeech,SlEnvolopeLetter} from 'react-icons/sl';
import {useRouter} from 'next/router'
import {BsImages,BsCardHeading} from 'react-icons/bs';
import {GoQuestion} from 'react-icons/go'
import {AiFillYoutube,AiOutlineInstagram,AiOutlineFilePdf} from 'react-icons/ai'

export default function Services(argument) {
	// body...
	const router = useRouter();
	
	return (
		<div className="min-h-screen w-full z-20 relative flex flex-col mx-auto" >
			<div className="absolute w-full h-[433px] z-0 md:top-[30%] top-[40%] bg-[#F7AB0A]/10 left-0 -skew-y-12"/>
			<h1 className="md:text-3xl text-xl mt-10 tracking-[10px] uppercase font-mono text-center text-gray-300"
			>
				Our Services
			</h1>
			<h1 className="md:text-xl mt-5 text-md text-gray-400 text-center uppercase">Unleashing the full potential of AI</h1>
			<div className="z-10 grid mt-5 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto md:gap-5 md:p-5 gap-7 p-2 ">
				<div 
				onClick={()=>{router.push('/code')}}
				className="w-full border-[2.5px]  border-sky-500/80 gap-5 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-sky-400/70 rounded-full p-2">
						<RiCodeSSlashLine className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full flex flex-col items-start gap-1">
						<button className="text-xl font-mono text-white/80">Write Code with NLP</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/imagegenerate')}}
				className="w-full border-[2px] border-purple-500/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-purple-500/70 rounded-full p-2">
						<BsImages className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full flex flex-col items-start">
						<button className="text-xl font-mono text-white/80">Image Generation</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/debug')}}
				className="w-full border-[2px] border-orange-500/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-orange-400/70 rounded-full p-2">
						<CgDebug className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-xl font-mono text-white/80">Code Debugging</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/ideas')}}
				className="w-full border-[2px] border-yellow-500/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-yellow-500/70 rounded-full p-2">
						<TbBulb className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-xl font-mono text-white/80">Bussiness Ideas</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/product')}}
				className="w-full border-[2px] border-red-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-red-400/70 rounded-full p-2">
						<RxCodesandboxLogo className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-xl font-mono text-white/80">Product Description</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/article')}}
				className="w-full border-[2px] border-sky-300/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-blue-200/70 rounded-full p-2">
						<MdOutlineArticle className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-xl font-mono text-white/80">Article Writing</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/answer')}}
				className="w-full border-[2.5px]  border-blue-800/80 gap-5 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-blue-700/70 rounded-full p-2">
						<MdOutlineQuestionAnswer className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full flex flex-col items-start gap-1">
						<button className="text-xl font-mono text-white/80">Answer to Queries</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/question')}}
				className="w-full overflow-hidden border-[2px] border-indigo-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-indigo-500/70 rounded-full p-2">
						<GoQuestion className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full ">
						<button className="text-xl font-mono text-white/80">Question for answer</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/youtube')}}
				className="w-full border-[2px] border-red-500/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-red-500/70 rounded-full p-2">
						<AiFillYoutube className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-md md:text-lg font-mono text-white/80">Title, Description & Tags</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/insta')}}
				className="w-full border-[2px] border-[#cc3179]/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-[url('https://img.freepik.com/premium-vector/colorful-abstract-background-vector_76552-45.jpg?w=360')] bg-cover bg-center rounded-full p-1">
						<AiOutlineInstagram className="h-9 w-9 text-gray-200"/>
					</div>
					<div className="w-full">
						<button className="text-xl font-mono text-white/80">Caption & Tags</button>
					</div>
				</div>
				<div 
				onClick={()=>{router.push('/letter')}}
				className="w-full overflow-hidden border-[2px] border-yellow-500/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-yellow-500/70 rounded-full p-2">
						<SlEnvolopeLetter className="h-7 w-7 text-gray-200"/>
					</div>
					<div className="w-full ">
						<button className="text-xl font-mono text-white/80">Letter Writing</button>
					</div>
				</div>	
				<div 
				onClick={()=>{router.push('/profanity')}}
				className="w-full overflow-hidden border-[2px] border-purple-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
					<div className="bg-purple-500/70 rounded-full p-2 flex items-center justify-center">
						<img src="https://cdn-icons-png.flaticon.com/512/1686/1686501.png" className="h-7 w-9 text-gray-200"/>
					</div>
					<div className="w-full ">
						<button className="text-xl font-mono text-white/80">Profanity Filter</button>
					</div>
				</div>
				</div>
				<h1 className="md:text-xl mt-4 text-xl text-gray-400 text-center uppercase">Free Services</h1>
				<div className="z-10 grid mt-2 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto md:gap-5 md:p-5 gap-7 p-2 ">
					<div 
					onClick={()=>{router.push('/cdn')}}
					className="w-full overflow-hidden border-[2px] border-orange-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-orange-500/70 rounded-full p-2 flex items-center justify-center">
							<FaKeycdn className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-lg xl:whitespace-nowrap font-mono text-white/80">File To CDN Convertor</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/texttospeech')}}
					className="w-full border-[2px] border-green-500/60 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-green-500/70 rounded-full p-2">
							<SlSpeech className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full">
							<button className="text-xl font-mono text-white/80">Text To Speech</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/converttoaudiofile')}}
					className="w-full overflow-hidden border-[2px] border-green-500/60 md:gap-2 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-green-500/70 rounded-full p-2">
							<FaRegFileAudio className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-md xl:whitespace-nowrap md:text-lg font-mono text-white/80">Speech & Text To Audio File</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/pdf')}}
					className="w-full overflow-hidden border-[2px] border-red-500/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-red-500/70 rounded-full p-2">
							<AiOutlineFilePdf className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">PDF to Audio File</button>
						</div>
					</div>
				</div>
				<h1 className="md:text-xl mt-4 text-xl text-gray-400 text-center uppercase">Audio Transcribing</h1>
				<div className="z-10 grid mt-2 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto md:gap-5 md:p-5 gap-7 p-2 ">
					<div 
					onClick={()=>{router.push('/transcribe')}}
					className="w-full overflow-hidden border-[2px] border-orange-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-orange-400/70 rounded-full p-2">
							<SiAirplayaudio className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Audio Transcribing</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/summary')}}
					className="w-full overflow-hidden border-[2px] border-sky-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-sky-400/70 rounded-full p-2">
							<CgNotes className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Summary of an Audio</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/chapter')}}
					className="w-full overflow-hidden border-[2px] border-indigo-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-indigo-500/70 rounded-full p-2">
							<BsCardHeading className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Chapter Detection</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/multiplespeakers')}}
					className="w-full overflow-hidden border-[2px] border-yellow-400/80 md:gap-2 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-yellow-400/70 rounded-full p-2">
							<MdOutlinePeople className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="md:text-lg xl:whitespace-nowrap text-md font-mono text-white/80">Multiple Speakers Detection</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/search')}}
					className="w-full overflow-hidden border-[2px] border-purple-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-purple-500/70 rounded-full p-2">
							<BiSearchAlt className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl xl:whitespace-nowrap font-mono text-white/80">Find a word in Audio</button>
						</div>
					</div>
					<div className="w-full overflow-hidden border-[2px] border-red-400/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-red-400/70 rounded-full p-2">
							<MdOutlineTopic className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Topic Detection</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/phone')}}
					className="w-full overflow-hidden border-[2px] border-gray-700/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-gray-700/70 rounded-full p-2">
							<TbPhoneCall className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Phone Call Recording</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/entity')}}
					className="w-full overflow-hidden border-[2px] border-yellow-600/70 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-yellow-500/70 rounded-full p-2">
							<MdOutlineNotes className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Entity Detection</button>
						</div>
					</div>
					<div 
					onClick={()=>{router.push('/sentiment')}}
					className="w-full overflow-hidden border-[2px] border-rose-600/80 md:gap-5 gap-4 rounded-xl bg-gray-700/20 hover:bg-gray-500/30 active:scale-90 active:bg-gray-300/40 transiton-all duration-100 cursor-pointer ease-out backdrop-blur-sm flex items-center py-5 px-5">
						<div className="bg-pink-500/70 rounded-full p-2">
							<BiSearchAlt className="h-7 w-7 text-gray-200"/>
						</div>
						<div className="w-full ">
							<button className="text-xl font-mono text-white/80">Sentiment Analysis</button>
						</div>
					</div>
					<div className="hidden md:block"/>
				</div>
		</div>


	)
}

