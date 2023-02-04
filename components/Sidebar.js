import {FiDatabase} from 'react-icons/fi';
import {motion} from 'framer-motion'
import {BsChevronDown} from 'react-icons/bs'
import {useState} from 'react';
import {useRouter} from 'next/router'
import {signOut} from 'next-auth/react';
import {MdOutlineLogout} from 'react-icons/md'

export default function Sidebar({loginRedirect,currentUser,signOut,aboutRedirect,openProfile,pricingRedirect,supportRedirect,token}) {
	// body...
	const [openServicesTab,setOpenServicesTab] = useState(false)
	const router = useRouter();
	const textServices = [
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

	const redirect = (url) => {
		router.push(`/${url}`)
	}

	const moveToStorage = () => {
		router.push('/storage');
	}

	return (

		<div className="fixed h-screen scroll-smooth z-40 w-full backdrop-blur-lg overflow-y-scroll bg-black/90">
			<motion.div className=" flex h-full mt-12 flex-col gap-4 items-center p-3 overflow-y-scroll">
				<p 
				onClick={loginRedirect}
				className={`text-2xl ${currentUser && 'hidden'} cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2 
				border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl ease-in-out font-mono text-gray-200`}>
					Login
				</p>
				<p 
				onClick={()=>setOpenServicesTab(!openServicesTab)}
				className={`text-2xl  cursor-pointer hover:text-sky-400 transition duration-100 ${!currentUser && 'hidden'} px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200 flex items-center gap-2`}>
					Services <BsChevronDown className={`h-5 w-5  ${openServicesTab ? 'rotate-180':''} transition duration-200 ease-in-out`} color="inherit"/>
				</p>
				<div className={`z-50 ${openServicesTab ? "h-[400px] py-2 transition-all duration-400 ease-in-out":"h-0 transition-all duration-400 ease-in-out"} ${!currentUser && 'hidden'}
				w-[95%] transition-all duration-200 ease-in-out border-[1.5px] border-gray-400/50 rounded-xl px-2 overflow-y-scroll scroll-smooth`}>
					<h1 className="text-2xl text-sky-500 text-shadow-fire text-center px-3 font-cormorant">Text Services</h1>
					<div className="h-[1px] w-[30%] bg-orange-500 mx-auto mt-2"/>
					{
						textServices.map((service)=>(
							<div 
							onClick={()=>redirect(service.url)}
							key={service.name}
							className="mt-4 border-b-[1px] py-2 border-orange-500 px-3 hover:bg-gray-500 
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
							onClick={()=>redirect(service.url)}
							key={service.name}
							className="mt-4 border-b-[1px] py-2 border-orange-500 px-3 hover:bg-gray-500 
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
							onClick={()=>redirect(service.url)}
							key={service.name}
							className="mt-4 border-b-[1px] py-2 border-orange-500 px-3 hover:bg-gray-500 
							rounded-xl transition-all duration-200 ease-in-out bg-black/40">
								<h1 className="text-lg text-gray-300 text-center">{service.name}</h1>
							</div>
						))
					}
				</div>
				<p 
				onClick={pricingRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100
				px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl ease-in-out font-mono text-gray-200">
					Pricing
				</p>
				<p 
				onClick={supportRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					Support
				</p>
				<p 
				onClick={aboutRedirect}
				className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl
				ease-in-out font-mono text-gray-200">
					About
				</p>
				{
					currentUser &&
					<>
					<div 
					onClick={moveToStorage}
					className="flex gap-2 items-center">
					<p className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl ease-in-out
					font-mono text-gray-200">My Storage</p>
					</div>
					<div 
					onClick={openProfile}
					className="flex gap-2 items-center px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl">
					<img src={currentUser.profile} className="h-8 cursor-pointer w-8 drop-shadow-xl rounded-full"/>
					<p className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 ease-in-out
					font-mono text-gray-200">Profile</p>
					</div>
					<div 
					onClick={signOut}
					className="flex gap-2 items-center px-2 py-2 border-b-[1px] hover:border-sky-400 border-orange-500 rounded-xl">
					<MdOutlineLogout className="h-7 w-7 text-red-500"/>
					<p className="text-2xl cursor-pointer hover:text-sky-400 transition duration-100 ease-in-out
					font-mono text-gray-200">SignOut</p>
					</div>
					</>
				}
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
							token==='all'?
							<>
							<div className="flex gap-1 z-50 items-center">
								<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
								<h1 className="md:text-xl text-md font-bold text-sky-400">{currentUser.blueToken}</h1>
							</div>
							<div className="flex z-50  items-center">
								<img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
								<h1 className="md:text-xl text-md font-bold text-orange-400">{currentUser.orangeToken}</h1>
							</div>
							<div className="flex z-50  items-center">
								<img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
								<h1 className="md:text-xl text-md font-bold text-pink-400">{currentUser.pinkToken}</h1>
							</div>
							</>
							:
							""
						}
						</>
					}
					</motion.div>
			</motion.div>
		</div>	

	)
}

