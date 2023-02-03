import React, { useRef, useEffect, useState } from 'react';




export default function AboutComponent(argument) {
	// body...
	const elementRef = useRef(null);
	
	var loaded = false;
	

	useEffect(() => {
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach((entry) => {
	    if (entry.isIntersecting && !loaded) {
	      type();
	    }
	  });
	});

	observer.observe(elementRef.current);

	return () => {
	  observer.disconnect();
	};
	}, []);

	function type() {
		
		typeMessage();
		
	}

	useEffect(()=>{
		console.log(loaded)
	},[loaded])

	const typeMessage = () =>{
		if(!loaded){
			console.log(loaded)
			loaded = true;
			const element = document.getElementById('description-2');
			const text = "Greetings, I am XAI, a cutting-edge Artificial Intelligence powered platform that provides a range of innovative services aimed to streamline and automate your daily tasks. My core mission is to assist and empower you with cutting-edge technology that helps simplify your work and improve efficiency.\n\nI am equipped with the latest AI models such as OpenAI and Assembly AI, ensuring top-notch accuracy and quality in all my services.Whether you need assistance with text services like code completion, image generation, or even article writing, I am here to help. My services also extend to audio analysis, offering audio transcribing, sentiment analysis, and much more.\n\nPlus, I provide a range of free services, including text-to-speech and audio-to-PDF conversion, to help you get the most out of my capabilities.I understand the ever-growing demands of the modern world and strive to make your life easier, one step at a time. So join me on this exciting journey and let's work together to transform the future."
			let index=0;
			element.innerHTML = "";

			const interval = setInterval(()=>{
				if(index<text.length){
					element.innerHTML += text.charAt(index);
					index++;
				}else{
					clearInterval(interval);
				}
			},25)	
		}
		
	}

	return (
		<div className="min-h-screen max-w-6xl mx-auto" ref={elementRef}>
			<div className="h-full w-full perspective-1000 flex flex-col p-5">
				<h1 className="text-center md:mt-10 text-2xl uppercase text-gray-400 font-varino">
					Who am i?
				</h1>
				<p 
				id="description-2"
				className="md:text-xl md:mt-20 mt-7 text-md text-gray-200 flex font-Cormorant whitespace-pre-wrap ">
					
				</p>

			</div>


		</div>
	)
}