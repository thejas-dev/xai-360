import {motion} from 'framer-motion'
import {useRouter} 	from 'next/router';
import {RxCross2} from 'react-icons/rx'
import Header2 from './Header2';	
import {useState} from 'react'
import {paymentRoute} from '../utils/ApiRoutes'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'

export default function PricingComponent() {
	// body...
	const [rupee,setRupee] = useState('inr');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const router = useRouter();
	
	const purchaseRedirect = (token) => {
		if(currentUser){
			fetch(`${paymentRoute}?request=${token}`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				userId:currentUser._id,
				items:[
					{id:token,currencyType:rupee}
				]
			})
		}).then(res=>{
			if(res.ok) return res.json();
			return res.json().then(json=>Promise.reject(json))
		}).then(({url})=>{
			window.location = url;
		}).catch(e=>{
			console.error(e.error)
		})
		}else{
			router.push('/login')
		}		
	}

	return (
		<div 
	id="main"
	className="relative min-h-screen scroll-smooth z-0 w-full overflow-x-hidden ">
       <h1 className="text-3xl md:text-5xl md:mt-10 mt-10 ml-4 font-varino text-[#FFF] tracking-[3px] mt-[100px] md:pl-20 pl-2">Pricing</h1>
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
        className="h-full flex flex-col md:flex-row px-4 gap-5 z-10 max-w-6xl mx-auto md:mt-7 mt-3 mb-[100px]
    	scroll-smooth">	    		
    		<div class="bg-gray-800/70 p-6 rounded-lg text-center relative border-[1.5px] flex flex-col justify-center border-gray-600">
    		
    			<select 
				id="countries" 
				value={rupee}
				onChange={(e)=>setRupee(e.target.value)}
				className="border absolute cursor-pointer text-md rounded-lg block top-6 right-5 w-[70px] p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">			  
    				<option value="inr">INR</option>
    				<option value="usd">USD</option>
    			</select>
			  <h3 class="text-lg font-medium font-turret text-white">Weak AI</h3>
			  <div class="text-4xl font-varino mt-2 text-gradient">{rupee === 'inr' ? '49 INR':'0.60 $'}</div>
			  <div class="flex items-center mt-4 text-white justify-center w-full">
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
			    </div>
			    <div class="mr-4">+50</div>
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
			    </div>
			    <div class="mr-4">+5</div>
			    <div class="">
			      <img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
			    </div>
			    <div>+10</div>
			  </div>
			  <div class="text-gray-500 mt-2">
			    This package not includes additional features to enhance your AI experience.
			  </div>
			  <div class="mt-3 w-full flex flex-col px-4 py-1 bg-black/40 border-[1px] border-gray-800 rounded-lg">
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		Access to our discord server
			  	</h1>
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		Access to our discord AI bot
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		<strike>Custom Chat Bot</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		<strike>AI customer support</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  </div>
			  <div class="mt-4">
			    <button 
			    onClick={()=>purchaseRedirect('xai-49')}
			    class="bg-gradient-to-r2 from-instagram transition-all hover:scale-110 duration-200 ease-in-out shadow-lg to-instagram text-white py-2 
			    px-4 rounded-lg text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline-instagram text-lg font-semibold hover:shadow-xl">
			      Purchase
			    </button>
			  </div>
			</div>
			<div class="bg-gray-800/70 p-6 rounded-lg text-center relative flex flex-col justify-center border-[1.5px] border-gray-600">
    		
    			<select 
				id="countries" 
				value={rupee}
				onChange={(e)=>setRupee(e.target.value)}
				className="border absolute cursor-pointer text-md rounded-lg block top-6 right-3 w-[70px] p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">			  
    				<option value="inr">INR</option>
    				<option value="usd">USD</option>
    			</select>
			  <h3 class="text-lg  font-medium font-turret text-white">Strong AI</h3>
			  <div class="text-4xl mt-2 font-varino  text-gradient">{rupee === 'inr' ? '99 INR':'1.21 $'}</div>
			  <div class="flex items-center mt-4 text-white justify-center w-full">
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
			    </div>
			    <div class="mr-4">+120</div>
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
			    </div>
			    <div class="mr-4">+10</div>
			    <div class="">
			      <img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
			    </div>
			    <div>+15</div>
			  </div>
			  <div class="text-gray-500 mt-2">
			    This package includes additional features to enhance your AI experience.
			  </div>
			  <div class="mt-3 w-full flex flex-col px-4 py-1 bg-black/40 border-[1px] border-gray-800 rounded-lg">
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<div class="h-2 w-2 ml-1 rounded-full bg-sky-500"/>
			  		Access to our discord server
			  	</h1>
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		Access to our discord AI bot
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<RxCross2 className="h-4 w-4 text-red-500"/>
			  		<strike>Custom Chat Bot</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<div class="h-2 ml-1 w-2 rounded-full bg-sky-500"/>
			  		<strike>AI customer support</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  </div>
			  <div class="mt-4">
			    <button 
			    onClick={()=>purchaseRedirect('xai-99')}
			    class="bg-gradient-to-r2 from-instagram transition-all hover:scale-110 duration-200 ease-in-out shadow-lg to-instagram text-white py-2 
			    px-4 rounded-lg text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline-instagram text-lg font-semibold hover:shadow-xl">
			      Purchase
			    </button>
			  </div>
			</div>
			<div class="bg-gray-800/70 p-6 rounded-lg text-center relative flex flex-col justify-center border-[1.5px] border-gray-600">
    		
    			<select 
				id="countries" 
				value={rupee}
				onChange={(e)=>setRupee(e.target.value)}
				className="border absolute cursor-pointer text-md rounded-lg block top-6 right-3 w-[70px] p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500">			  
    				<option value="inr">INR</option>
    				<option value="usd">USD</option>
    			</select>
			  <h3 class="text-lg font-medium font-turret text-white">Super AI</h3>
			  <div class="text-4xl mt-2 font-varino  text-gradient">{rupee === 'inr' ? '179 INR':'2.20 $'}</div>
			  <div class="flex items-center mt-4 text-white justify-center w-full">
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/thejashari_Cl77Fbt7p2" alt="" className="h-9 w-9"/>
			    </div>
			    <div class="mr-4">+230</div>
			    <div class="">
			      <img src="https://ik.imagekit.io/d3kzbpbila/pink_token-removebg-preview_n7gntN4i3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675259140856" alt="" className="h-7 w-7"/>
			    </div>
			    <div class="mr-4">+15</div>
			    <div class="">
			      <img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-eclair-orange.png" alt="" className="h-8 w-7"/>
			    </div>
			    <div>+25</div>
			  </div>
			  <div class="text-gray-500 mt-2">
			    This package includes additional features to enhance your AI experience.
			  </div>
			  <div class="mt-3 w-full flex flex-col px-4 py-1 bg-black/40 border-[1px] border-gray-800 rounded-lg">
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<div class="h-2 w-2 rounded-full bg-sky-500"/>
			  		Access to our discord server
			  	</h1>
			  	<h1 class="text-md text-[#FFF] gap-2 flex items-center">
			  		<div class="h-2 w-2 rounded-full bg-sky-500"/>
			  		Access to our discord AI bot
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<div class="h-2 w-2 rounded-full bg-sky-500"/>
			  		<strike>Custom Chat Bot</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  	<h1 class="text-md text-gray-700 gap-2 flex items-center">
			  		<div class="h-2 w-2 rounded-full bg-sky-500"/>
			  		<strike>AI customer support</strike>
			  		<span class="text-red-500 text-md">Coming Soon</span>
			  	</h1>
			  </div>
			  <div class="mt-4">
			    <button 
			    onClick={()=>purchaseRedirect('xai-179')}
			    class="bg-gradient-to-r2 from-instagram transition-all hover:scale-110 duration-200 ease-in-out shadow-lg to-instagram text-white py-2 
			    px-4 rounded-lg text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline-instagram text-lg font-semibold hover:shadow-xl">
			      Purchase
			    </button>
			  </div>
			</div>
			



    	</motion.div>	
    </div>

	)
};