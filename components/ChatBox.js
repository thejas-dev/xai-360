import {useState,useEffect,useRef} from 'react';
import {BsThreeDotsVertical,BsTrash} from 'react-icons/bs'
import {motion} from 'framer-motion';
import {AiOutlineSend,AiOutlineUserDelete} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';




export default function ChatBox({currentUser,sendMessage,setWriteText,writeText,
	currentChats,setCurrentChats,clearChat,deletePartner}) {
	// body...
	const [message,setMessage] = useState('');
	const [typingId,setTypingId] = useState('');
	const scrollRef = useRef();
	const [revealOption,setRevealOption] = useState(false);

	useEffect(()=>{
		if(currentUser?.chats?.length>0){
			setCurrentChats(currentUser.chats)	
		}		
	},[])




	const updateArray = () => {
		const chat = {
			ai:false,
			message:message
		}
		const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
		const chat2 = {
			ai:true,
			message:'',
			id:id
		}
		setCurrentChats([...currentChats,chat,chat2]);
		setTypingId(id);
	}

	const typeMessageMain = (element,text) =>{

		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth"});
		element.classList.remove('animate-pulse');
		element.classList.add('text-[#FFF]')
		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
				setWriteText('');
				setTypingId('');
			}
		},20)
	}

	useEffect(()=>{
		if(writeText){
			const element = document.getElementById(typingId);
			typeMessageMain(element,writeText)
		}
	},[writeText])


	useEffect(()=>{
		scrollRef.current?.scrollIntoView({behaviour:"smooth"});
	},[currentChats]);

	return (
		
        
    		
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
		className="min-h-screen flex flex-col w-full mx-auto relative  ">
			<div className={`fixed ${revealOption ? "top-[120px]":"-top-[180px]"}  md:right-7 right-3 px-2 py-1 z-40 rounded-xl 
			bg-[#0C0C0C]/80 backdrop-blur-md border-[1px] border-gray-500/50 transition-all duration-300 ease-in-out gap-1`}>
				<div className="gap-1 flex mt-1 border-gray-700 hover:border-sky-600 hover:bg-gray-400/20 border-b-[2px] rounded-xl px-1 py-2">
					<CgProfile className="h-6 w-6 text-gray-600"/>
					<button className="text-md text-gray-600 font-semibold">Partner profile</button>
				</div>
				<div 
				onClick={clearChat}
				className="gap-1 flex mt-1 border-gray-700 hover:border-red-600 hover:bg-gray-400/20 border-b-[2px] rounded-xl px-1 py-2">
					<BsTrash className="h-6 w-6 text-red-500"/>
					<button className="text-md text-red-500 font-semibold">Clear Chat</button>
				</div>
				<div 
				onClick={deletePartner}
				className="gap-1 flex mt-1 border-gray-700 hover:border-orange-600 hover:bg-gray-400/20 border-b-[2px] rounded-xl px-1 py-2">
					<AiOutlineUserDelete className="h-6 w-6 text-orange-500"/>
					<button className="text-md text-orange-500 font-semibold">Delete Partner</button>
				</div>
			</div>
			<div 
			onClick={()=>setRevealOption(!revealOption)}
			className={`fixed top-[80px] md:right-7 right-3 md:p-1 p-[2px] z-30 rounded-full ${revealOption && '-rotate-[90deg]'}  bg-gray-700/60 border-[1px] 
			hover:bg-gray-600/60 border-gray-700/50 transition-all duration-200 ease-in-out`}>
				<BsThreeDotsVertical className="md:h-8 h-7 w-7 md:w-8 text-gray-300"/>
			</div>
			<div className="flex flex-col md:py-10 py-3 md:gap-3 gap-2 mt-[70px] md:mb-[45px] mb-[68px] overflow-hidden
			scrollbar-none">
				{
					currentChats?.map((chat)=>(
						chat.ai ? 
						<div ref={scrollRef} className="flex md:gap-5 gap-2 items-center w-full px-2 py-3 bg-gray-700/30 md:px-[120px] shadow-xl">
							<img src="https://img.freepik.com/free-psd/3d-rendering-wedding-icon_23-2149621227.jpg" 
							alt="" className="h-9 w-9 rounded-full"/>
							<h1 className={`md:text-lg text-md text-[#FFF] font-semibold`}>{
								chat.message.length>0 ?
								chat.message
								:
								<div id={chat?.id} className="animate-pulse text-gray-400">. . . . .</div>
							}</h1>
						</div>
						:
						<div ref={scrollRef} className="flex md:gap-5 gap-2 items-center w-full p-2 rounded-xl md:px-[120px]">
							<img src={currentUser.profile} alt="" className="h-9 w-9 rounded-full"/>
							<h1 className="md:text-lg text-md text-gray-300 font-semibold">{chat.message}</h1>
						</div>					
					))
				}
			</div>
			<center>
			<div className={`fixed left-0 right-0 bottom-0 mx-auto w-[97%] md:max-w-6xl bg-gray-900/70 rounded-full border-[1.8px] border-gray-700/70 focus-within:backdrop-blur-lg focus-within:border-rose-500/70
			backdrop-blur-md  mb-4 md:px-3 px-2 md:py-2 py-1 flex items-center transition duration-200 ease-in-out ${message && 'backdrop-blur-lg'}`}> 
				<form className="w-full h-full" onSubmit={(e)=>{e.preventDefault();if(!writeText && !typingId){sendMessage(message);updateArray();setMessage('');}}} >
				<input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} 
				className="bg-transparent outline-none w-full text-[#FFF] ml-2"
				/>
				</form>
				<div className="p-2 border-l-[2px] border-gray-800 rounded-xl hover:border-orange-400 cursor-pointer">
					<AiOutlineSend onClick={()=>{if(!writeText && !typingId){sendMessage(message);updateArray();setMessage('');}}} className="text-gray-400 h-7 w-7 hover:text-orange-500"/>
				</div>
			</div>
			</center>
		</motion.div>


	)
}

