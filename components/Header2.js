import {motion} from 'framer-motion'
import {MdOutlineLogout} from 'react-icons/md'
import {BsChevronDown} from 'react-icons/bs'
import {useState,useEffect} from 'react'
import Sidebar from './Sidebar';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {FiDatabase} from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg';


export default function Header({hide,redirect,token}) {
	const [revealMenu,setRevealMenu] = useState(false);
	const router = useRouter();
	const [openServicesTab,setOpenServicesTab] = useState(false)
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [revealProfile,setRevealProfile] = useState(false);

	const textServices = [
	{url:'/gf',name:'Virtual GF/BF'},
	{url:'/debug',name:'Code Debug'},
	{url:'/code',name:'Write Code'},
	{url:'/imagegenerate',name:'Image Generation'},
	{url:'/product',name:'Product Description'},
	{url:'/ideas',name:'Bussiness Ideas'},
	{url:'/article',name:'Article Writing'},
	{url:'/answer',name:'Answer Queries'},
	{url:'/question',name:'Question for Answer'},
	{url:'/youtube',name:'Youtube'},
	{url:'/insta',name:'Instagram'},
	{url:'/letter',name:'Letter Writing'},
	{url:'/profanity',name:'Profanity Filter'},
	]

	const freeServices = [
		{url:'/cdn',name:'CDN convertor'},
		{url:'/texttospeech',name:'Text to Speech'},
		{url:'/converttoaudiofile',name:'Speech & Text to Audio FIle'},
		{url:'/pdf',name:'PDF to Audio File'}
	]

	const audioServices = [
		{url:'/transcribe',name:'Audio Transcribing'},
		{url:'/summary',name:'Audio Summary'},
		{url:'/chapter',name:'Chapter Detection'},
		{url:'/multiplespeakers',name:'Multiple Speakers Detection'},
		{url:'/search',name:'Find word in Audio'},
		{url:'/phone',name:'Phone Call Transcribing'},
		{url:'/entity',name:'Entity Detection'},
		{url:'/sentiment',name:'Sentiment Analysis'},
		{url:'/safety',name:'Audio Safety Detection'}
	]

	const moveToStorage = () => {
		router.push('/storage');
		setRevealProfile(false);
	}

	const movetoProfile = () => {
		router.push('/profile')
		setRevealProfile(false)
	}

	const loginRedirect = () => {
		router.push(`/login?redirect=${redirect}`);
		setRevealProfile(false)
	}

	const aboutRedirect = () => {
		router.push('/#about');
		setRevealProfile(false)
	}

	const supportRedirect = ()=> {
		router.push('/#support');
		setRevealProfile(false)
	}

	const pricingRedirect = () => {
		router.push('/#pricing');
		setRevealProfile(false)
	}

	const openProfile = () => {
		router.push('/profile');
		setRevealProfile(false)
	}

	const redirectUrl = (url) => {
		router.push(`/${url}`);
		setRevealProfile(false)
	}

	return (
			<div className={`w-full mx-auto px-4 py-4 md:py-2 fixed z-40 drop-shadow-xl top-0 ${hide ? "backdrop-blur-md":""} `}>
				<motion.div 
				className="max-w-6xl flex w-full items-center gap-5 justify-between mx-auto">
					<motion.div
					initial={{
						opacity:0
					}}
					whileInView={{
						opacity:1
					}}
					transition={{
						duration:2
					}}>
						<p className="md:text-3xl text-2xl text-gray-200
						font-varino tracking-[2px]">XAI-360</p>
					</motion.div>
					<motion.div 
					initial={{
						x:100,
						opacity:0
					}}
					whileInView={{
						opacity:1,
						x:0
					}}
					transition={{
						duration:2
					}}
					className=" hidden md:flex md:gap-7 gap-2 items-center md:p-3 p-2">
						<p 
						onClick={loginRedirect}
						className={`md:text-xl text-md ${currentUser && 'hidden'} cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500`}>
							Login
						</p>
						{
							currentUser &&
							<>
							{
								token==='blue'?
								<div className="flex gap-1 z-50 items-center">
									<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
									<h1 className="md:text-xl text-md font-bold text-sky-400">{currentUser.blueToken}</h1>
								</div>
								:
								token==='orange'?
								<div className="flex z-50 md:gap-2 items-center">
									<img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
									<h1 className="md:text-xl text-md font-bold text-orange-400">{currentUser.orangeToken}</h1>
								</div>
								:
								token==='pink'?
								<div className="flex z-50 md:gap-2 items-center">
									<img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
									<h1 className="md:text-xl text-md font-bold text-pink-400">{currentUser.pinkToken}</h1>
								</div>
								:
								token==='all'?
								<>
								<div className="flex gap-1 z-50 items-center">
									<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
									<h1 className="md:text-xl text-md font-bold text-sky-400">{currentUser.blueToken}</h1>
								</div>
								<div className="flex z-50 md:gap-2 items-center">
									<img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
									<h1 className="md:text-xl text-md font-bold text-orange-400">{currentUser.orangeToken}</h1>
								</div>
								<div className="flex z-50 md:gap-2 items-center">
									<img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
									<h1 className="md:text-xl text-md font-bold text-pink-400">{currentUser.pinkToken}</h1>
								</div>
								</>
								:
								""
							}
							</>
						}
						<p 
						onClick={()=>setOpenServicesTab(!openServicesTab)}
						className={`md:text-xl z-50 text-md ${!currentUser && 'hidden'} cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500 flex items-center gap-2`}>
							Services <BsChevronDown className={`h-5 w-5  ${openServicesTab ? 'rotate-180':''} transition duration-200 ease-in-out`} color="inherit"/>
						</p>
						<div className={`z-40 hidden md:block fixed  ${openServicesTab ? "h-[400px] top-[70px] py-2 transition-all duration-400 ease-in-out":"h-0 -top-[100px] transition-all duration-400 ease-in-out"} ${!currentUser && 'hidden'}
						w-[400px] transition-all duration-500 ease-in-out border-[1.5px] border-gray-400/50 rounded-xl px-2 overflow-y-scroll scroll-smooth bg-black/60 backdrop-blur-md`}>
							<h1 className="text-2xl text-sky-500 text-shadow-fire text-center px-3 font-cormorant">Text Services</h1>
							<div className="h-[1px] w-[30%] bg-orange-500 mx-auto mt-2"/>
							{
								textServices.map((service)=>(
									<div 
									onClick={()=>redirectUrl(service.url)}
									key={service.name}
									className="mt-3 cursor-pointer border-b-[1px] py-2 border-orange-500 hover:border-purple-500 px-3 hover:bg-gray-700 
									rounded-xl transition-all duration-200 ease-in-out bg-black/40">
										<h1 className="text-lg text-gray-300 text-center">{service.name}</h1>
									</div>
								))
							}
							<h1 className="text-2xl text-sky-500 mt-6 text-shadow-fire text-center px-3 font-cormorant">Free Services</h1>
							<div className="h-[1px] w-[30%] bg-orange-500 mx-auto mt-2"/>
							{
								freeServices.map((service)=>(
									<div 
									onClick={()=>redirectUrl(service.url)}
									key={service.name}
									className="mt-3 cursor-pointer border-b-[1px] py-2 border-orange-500 px-3 hover:border-purple-500 px-3 hover:bg-gray-700 
									rounded-xl transition-all duration-200 ease-in-out bg-black/40">
										<h1 className="text-lg text-gray-300 text-center">{service.name}</h1>
									</div>
								))
							}
							<h1 className="text-2xl text-sky-500 mt-6 text-shadow-fire text-center px-3 font-cormorant">Audio Services</h1>
							<div className="h-[1px] w-[30%] bg-orange-500 mx-auto mt-2"/>
							{
								audioServices.map((service)=>(
									<div 
									onClick={()=>redirectUrl(service.url)}
									key={service.name}
									className="mt-3 cursor-pointer border-b-[1px] py-2 border-orange-500 px-3 hover:border-purple-500 px-3 hover:bg-gray-700 
									rounded-xl transition-all duration-200 ease-in-out bg-black/40">
										<h1 className="text-lg text-gray-300 text-center">{service.name}</h1>
									</div>
								))
							}
						</div>
						<p 
						onClick={pricingRedirect}
						className="md:text-xl z-50 text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							Pricing
						</p>
						<p 
						onClick={supportRedirect}
						className="md:text-xl z-50 text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							Support
						</p>
						<p 
						onClick={aboutRedirect}
						className="md:text-xl z-50 text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							About
						</p>
						{
							currentUser &&
							<img
							onClick={()=>setRevealProfile(!revealProfile)}
							src={currentUser.profile} className="h-8 z-50 cursor-pointer w-8 drop-shadow-xl rounded-full"/>
						}
						<div className={`fixed ${revealProfile ? "top-[70px] opacity-1" : "-top-[170px] opacity-[70%]"} border-[1px] right-14 bg-black/50 backdrop-blur-lg 
						border-gray-700 py-1 pb-2 px-1 rounded-xl flex flex-col gap-2 transition-all duration-400 ease-in-out`}>
							<div 
							onClick={movetoProfile}
							className=" flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
							duration-200 ease-in-out cursor-pointer py-2 border-orange-500 gap-2">
								<img src={currentUser.profile} className="h-7 w-7 rounded-full"/>
								<h1 className="text-md text-gray-300 font-mono">My Profile</h1>
							</div>
							<div 
							onClick={moveToStorage}
							className="flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
							duration-200 ease-in-out cursor-pointer py-2 border-orange-500 gap-2">
								<FiDatabase className="h-7 w-7 text-blue-700"/>
								<h1 className="text-md text-gray-300 font-mono">My Storage</h1>
							</div>	
							<div 
							onClick={signOut}
							className="flex px-2 rounded-xl border-b-[1.5px] hover:bg-gray-700 transition-all 
							duration-200 ease-in-out cursor-pointer py-2 border-red-500 gap-2">
								<MdOutlineLogout className="h-7 w-7 text-red-500"/>
								<h1 className="text-md text-gray-300 font-mono">Log out</h1>
							</div>							
						</div>
					</motion.div>
					<div className="flex items-center gap-8 md:hidden">
					<motion.div
					initial={{
						opacity:0
					}}
					whileInView={{
						opacity:1,
					}}
					transition={{
						duration:2
					}}
					className="active:scale-90 flex 
					mx-auto rounded-xl justify-between gap-3 z-50 p-[6px] "
					>
					{
						currentUser &&
						<>
						{
							token==='blue'?
							<div className="flex gap-1 z-50 items-center">
								<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
								<h1 className="md:text-xl text-md font-bold text-sky-400">{currentUser.blueToken}</h1>
							</div>
							:
							token==='orange'?
							<div className="flex z-50 md:gap-2 items-center">
								<img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
								<h1 className="md:text-xl text-md font-bold text-orange-400">{currentUser.orangeToken}</h1>
							</div>
							:
							token==='pink'?
							<div className="flex z-50 md:gap-2 items-center">
								<img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
								<h1 className="md:text-xl text-md font-bold text-pink-400">{currentUser.pinkToken}</h1>
							</div>
							:
							""
						}
						</>
					}
					</motion.div>
					<motion.div
					initial={{
						opacity:0
					}}
					whileInView={{
						opacity:1,						
					}}
					transition={{
						duration:2
					}}
					onClick={()=>setRevealMenu(!revealMenu)}
					className="active:scale-90 hover:bg-gray-700/20 transition-all duration-300 ease-in flex flex-col 
					 rounded-xl justify-between z-50 p-[6px] h-8 w-10 mb-2"
					>
						<div className={`h-[1.5px] z-50 w-full bg-white transition-all duration-300 ease-in-out ${revealMenu  ? "mt-[12px] -rotate-45" :  "" }`}/>
						<div className={`h-[1.5px] z-50 bg-white transition-all w-full duration-300 ease-in-out ${revealMenu ? "w-0" : "w-full" }`}/>
						<div className={`h-[2px] z-50 w-full bg-white transition-all duration-300 ease-in-out ${revealMenu  ? "mb-[7px] rotate-45" :  "" }`}/>
					</motion.div>
				</div>
				</motion.div>
				<div className={`fixed ${revealMenu ? "left-0": "left-[100%]"} top-0 z-40 transition-all duration-500 ease-in-out w-full h-full  `}>
		          <Sidebar loginRedirect={loginRedirect} currentUser={currentUser} signOut={signOut} aboutRedirect={aboutRedirect} openProfile={openProfile} 
		          supportRedirect={supportRedirect} pricingRedirect={pricingRedirect} token={token}/>    
		        </div>

			</div>


	)
}