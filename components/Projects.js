import {useState,useEffect} from 'react'
import {FcNext,FcPrevious} from 'react-icons/fc'

export default function Projects(argument) {
	// body...
	useEffect(()=>{
		setInterval(()=>{
			scrollMobilleRight();
		},7000)
	},[])


	const scrollLeft = () =>{
		const element = document.getElementById('scrollme');
		const value = element.scrollLeft -= element.scrollLeftMax/4
		if(value < 0){
			element.scrollLeft = element.scrollLeftMax 
		}else{
			element.scrollLeft -= element.scrollLeftMax/4;
		}
	}

	const scrollMobilleRight = () =>{
		const element = document.getElementById('scrollme');
		if(element){
			const value= element.scrollLeft +=200;
			if(value > element.scrollWidth - element.clientWidth ){
				element.scrollLeft = 0
			}else{
				element.scrollLeft +=200
			}	
		}
		
	}

	const scrollMobilleLeft = () =>{
		const element=document.getElementById('scrollme');
		if(element){
			const value = element.scrollLeft -= 200;
			if(value<0){
				element.scrollLeft = element.scrollLeftMax;
			}else{
				element.scrollLeft -= 200;
			}	
		}
		
	}

	const scrollRight = () =>{
		const element = document.getElementById('scrollme');
		const value = element.scrollLeft += element.scrollLeftMax/4;
		 if(value > element.scrollWidth - element.clientWidth){
		 	element.scrollLeft = 0;
		 }else{
		 	element.scrollLeft += element.scrollLeftMax/4;
		 }
		
	}

	return (
		<div className="h-screen relative w-full mx-auto ">
			
			<div className="h-full  md:mt-[120px] w-full flex items-center justify-center">
			<div 
			id="scrollme"
			className="w-full snap-x snap-mandatory overflow-x-scroll flex flex-nowrap
			z-10 scrollbar scrollbar-track-gray-400/10 scrollbar-thumb-[#F7AB0A]/70 scrollbar-thin scroll-smooth">
				<div className="hidden md:block absolute top-[50%] md:top-[60%] left-3 rounded-full bg-gray-800/80 border-[0.3px] border-gray-500
				transition-all duration-200 ease-out hover:bg-gray-500/70 active:scale-90">
					<FcPrevious 
					onClick={scrollLeft}
					className="h-7 w-7 text-white" color="#FFF"/>
				</div>
				<div className="absolute md:hidden top-[50%] md:top-[60%] left-3 rounded-full bg-gray-800/80 border-[0.3px] border-gray-500
				transition-all duration-200 ease-out hover:bg-gray-500/70 active:scale-90">
					<FcPrevious 
					onClick={scrollMobilleLeft}
					className="h-7 w-7 text-white" color="#FFF"/>
				</div>
				<div className="hidden md:block absolute top-[50%] md:top-[60%] right-3 rounded-full bg-gray-800/80 border-[0.3px] border-gray-500
				transition-all duration-200 ease-out hover:bg-gray-500/70 active:scale-90 ">
					<FcNext 
					onClick={scrollRight}
					className="h-7 w-7 text-white" color="#FFF"/>
				</div>
				<div className="absolute md:hidden top-[50%] md:top-[60%] right-3 rounded-full bg-gray-800/80 border-[0.3px] border-gray-500
				transition-all duration-200 ease-out hover:bg-gray-500/70 active:scale-90 ">
					<FcNext 
					onClick={scrollMobilleRight}
					className="h-7 w-7 text-white" color="#FFF"/>
				</div>
				<div className="snap-center w-screen flex-shrink-0 p-5">
					<h1 className="text-[#b93436]/90 text-3xl md:text-5xl uppercase mb-5 font-bold tracking-[7px] text-center">Spotify</h1>
					<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_8L0YMlwQq"
					className="rounded-xl"
					/>
					<p className="mt-5 md:text-lg text-md text-gray-300 font-sans text-center font-semibold">Integrated Alan AI with Our Spotify Web Application to let users to use the music controls over voice</p>
				</div>
				<div className="snap-center w-screen flex-shrink-0 p-5  ">
					<h1 className="text-[#d3af2e]/90 text-3xl md:text-5xl uppercase mb-5 font-bold tracking-[7px] text-center">ThejasX</h1>
					<img src="https://ik.imagekit.io/d3kzbpbila/discord-modified2_0l_doysWY?ik-sdk-version=javascript-1.4.3&updatedAt=1673105040567"
					className="rounded-xl mx-auto"
					/>
					<p className="mt-5 md:text-lg text-md text-gray-300 font-sans text-center font-semibold">Sarcastic Chat bot for Discord to entertain the users by giving Sarcastic replies. Integrated with OpenAi</p>
				</div>
				<div className="snap-center w-screen flex-shrink-0 p-5">
					<h1 className="text-[#c0937f]/90 text-3xl md:text-5xl uppercase mb-5 font-bold tracking-[7px] text-center">Weather App</h1>
					<img src="https://ik.imagekit.io/d3kzbpbila/weather-modified_Nb6sF6FRx?ik-sdk-version=javascript-1.4.3&updatedAt=1673104347053"
					className="rounded-xl mx-auto"
					/>
					<p className="mt-5 md:text-lg text-md text-gray-300 font-sans text-center font-semibold">Weather Report Application Integrated with AlanAi, users can get the weather report in screen and in voice by asking to alan ai over voice</p>
				</div>
				<div className="snap-center w-screen flex-shrink-0 p-5">
					<h1 className="text-sky-300/90 text-3xl md:text-5xl uppercase mb-5 font-bold tracking-[7px] text-center">XAI-V1</h1>
					<img src="https://ik.imagekit.io/d3kzbpbila/Xai-v1-modified_FVMBP8p-t?ik-sdk-version=javascript-1.4.3&updatedAt=1673104292939"
					className="rounded-xl mx-auto"/>
					<p className="mt-5 md:text-lg text-md text-gray-300 font-sans text-center font-semibold">Chat GPT like UI, Can write code, write an article, solve errors in codes, etc...</p>
				</div>
			</div>
			</div>

		</div>


	)
}