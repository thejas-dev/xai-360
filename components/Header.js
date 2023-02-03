import {motion} from 'framer-motion'
import {useEffect} from 'react'


export default function Header({revealMenu,setRevealMenu}) {
	// body...
	// useEffect(()=>{
		
	// 	let utterance = new SpeechSynthesisUtterance('hello world');
	// 	speechSynthesis.speak(utterance);

	// },[])



	return (
			<div className="w-full mx-auto px-4 py-4 md:py-2 fixed backdrop-blur-md z-50 drop-shadow-xl top-0 ">
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
						font-mono tracking-[2px] ">XAI-360</p>
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
					className=" hidden md:flex md:gap-7 gap-2 items-center md:p-5 p-2">
						<p className="md:text-xl text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							Login
						</p>
						<p className="md:text-xl text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							Support
						</p>
						<p className="md:text-xl text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							Pricing
						</p>
						<p className="md:text-xl text-md cursor-pointer hover:text-sky-400 transition duration-100 
						ease-in-out font-mono text-gray-500">
							About
						</p>
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
					onClick={()=>setRevealMenu(!revealMenu)}
					className="md:hidden active:scale-90 hover:bg-gray-700/20 transition-all duration-300 ease-in flex flex-col 
					 rounded-xl justify-between z-50 p-[6px] h-8 w-10 "
					>
						<div className={`h-[1.5px] z-50 w-full bg-white transition-all duration-300 ease-in-out ${revealMenu  ? "mt-[12px] -rotate-45" :  "" }`}/>
						<div className={`h-[1.5px] z-50 bg-white transition-all duration-300 ease-in-out ${revealMenu ? "w-0" : "w-full" }`}/>
						<div className={`h-[1.5px] z-50 w-full bg-white transition-all duration-300 ease-in-out ${revealMenu  ? "mb-[7px] rotate-45" :  "" }`}/>
					</motion.div>
				</motion.div>

			</div>


	)
}