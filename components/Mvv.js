import {useEffect,useState} from 'react';



export default function Mvv(argument) {
	// body...
	const [edit,setEdit] = useState(false);

		useEffect(()=>{
			const container = document.querySelector('.container-1');
			const card = document.querySelector('.card-1');
			const card2 = document.querySelector('.card-2');
			const card3 = document.querySelector('.card-3');


			container.addEventListener('mousemove',e=>{
				if(!edit){
					let xAxis = (window.innerWidth / 2 - e.pageX) /17
					let yAxis = (window.innerWidth / 2 - e.pageY) /17
					card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
					card2.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
					card3.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
				}		
			})

			container.addEventListener('mouseenter',e=>{
				if(!edit){
					card.style.transition = 'none';				
					card2.style.transition = 'none';				
					card3.style.transition = 'none';				
				}			
			})

			

			container.addEventListener('mouseleave',(e)=>{
				card.style.transition = 'all 0.5s ease';
				card.style.transform = `rotateY(0deg) rotateY(0deg)`;
				card2.style.transition = 'all 0.5s ease';
				card2.style.transform = `rotateY(0deg) rotateY(0deg)`;
				card3.style.transition = 'all 0.5s ease';
				card3.style.transform = `rotateY(0deg) rotateY(0deg)`;
				
			})

		},[])
		

	return (

		<div className="min-h-screen max-w-6xl mx-auto" >
			<div className="h-full w-full perspective-1000 flex flex-col p-5">
				<h1 className="text-center head text-2xl tracking-[10px] uppercase text-gray-400 font-open">
					M-V-V
				</h1>
				<div className="grid container-1 group md:grid-cols-3 md:mt-[150px] grid-cols-1 mt-5 gap-7 px-3	md:px-0">
					<div className="card-1 flex-col flex items-center text-center  text-center border-[3px] backdrop-blur-md 
					group-hover:border-orange-500/80 border-gray-600/70 md:px-2 px-5 py-5 rounded-3xl transition-all duration-300 ease-in-out">
						<h1 className="text-2xl text-gray-200 uppercase tracking-[7px] font-mono">
							Our Mission
						</h1>
						<div className="mx-10 mt-2 h-[2px] w-[180px] bg-sky-500/90 mx-auto"/>
						<p className="text-xl mt-7 text-gray-300/90 font-serif">
							"To empower businesses and individuals with cutting-edge artificial 
							intelligence technology, helping them to achieve their goals and reach their full potential."
						</p>
					</div>
					<div className="flex card-2 flex-col items-center text-center border-[3px] backdrop-blur-md 
					group-hover:border-orange-500/80 border-gray-600/70 px-5 md:px-2 py-5 rounded-3xl transition-all duration-300 ease-in-out">
						<h1 className="text-2xl text-gray-200 uppercase tracking-[7px] font-mono">
							Our Vision
						</h1>
						<div className="mx-10 mt-2 h-[2px] w-[180px] bg-sky-500/90 mx-auto"/>
						<p className="text-xl mt-7 text-gray-300/90 font-serif">
							"To be the leading provider of AI-powered solutions and a catalyst for innovation and growth in the industry."
						</p>
					</div>
					<div className="flex card-3 flex-col items-center text-center border-[3px] backdrop-blur-md 
				 	group-hover:border-orange-500/80 border-gray-600/70 px-5 md:px-2 py-5 rounded-3xl transition-all duration-300 ease-in-out">
						<h1 className="text-2xl text-gray-200 uppercase tracking-[7px] font-mono">
							Our Value
						</h1>
						<div className="mx-10 mt-2 h-[2px] w-[180px] bg-sky-500/90 mx-auto"/>
						<p className="text-xl mt-7 text-gray-300/90 font-serif">
							"Innovation, collaboration, excellence, customer focus, and social responsibility."
						</p>
					</div>
				</div>
			</div>

		</div>

	)
}