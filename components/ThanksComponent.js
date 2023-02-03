import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {tokenRechargeRoute} from '../utils/ApiRoutes'

export default function WelcomeComponent({id}){
	const router = useRouter();
	const [ready,setReady] = useState(false);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	useEffect(()=>{console.log(currentUser)},[currentUser])
	useEffect(()=>{
		const element = document.getElementById('textbox');
		const text = "Thank you for investing in the future of AI with us! Your purchase of tokens is powering your journey towards effortless productivity with XAI.";
		typeMessageMain(text,element);
		checkForRecharge();
	},[])

	const checkForRecharge = async() => {
		const params = new URLSearchParams(window.location.search);
		console.log(params)
		if(params){
			const {data} = await axios.post(`${tokenRechargeRoute}?id=${params.get('id')}&userId=${params.get('userId')}&request=${params.get('request')}`);
			console.log(data.obj)
			if(data.status === true){
				setCurrentUser(data.obj)	
			}
		}
	}

	const redirect = () =>{
		router.push('/');
	}

	const typeMessageMain = (text,element) => {
		let index=0;
		element.innerHTML = "";
		element.scrollIntoView({behavior:"smooth",block:'center'});

		const interval = setInterval(()=>{
			if(index<text.length){
				element.innerHTML += text.charAt(index);
				index++;
			}else{
				clearInterval(interval);
			}
		},30)
	}

	return (
		<div className="pt-[170px] md:w-[350px] w-full bg-black/60 md:bg-transparent py-6 rounded-xl z-10 md:ml-3 px-6 h-full">
			<div className="h-[3px] w-[150px] bg-[#c98e28]"/>
			<h1 className="text-xl text-[#debe85] font-varino mt-7">
				Succesfully Purchased
			</h1>
			<h1 id="textbox" className="text-xl font-Cormorant text-[#e6ab6a] md:text-[#aa9d80] mt-10">
				
				
			</h1>			
			<center>
				<button onClick={redirect} className="mt-10 active:scale-90 transition-all ease-in-out duration-200 z-10 mx-auto 
    			rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">
					Go to Home		
				</button>
			</center>
		</div>

	)
}

