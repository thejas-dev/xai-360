import {signIn,useSession,getProviders} from 'next-auth/react'
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {useState,useEffect} from 'react';
import {loginRoutes,registerRoutes,setNumberRoutes} from '../utils/ApiRoutes'
   


export default function LoginComponent({providers,id2}){
	const router = useRouter();
	const {data:session} = useSession();
	const[ready,setReady] = useState(false);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [verifyNumber,setVerifyNumber] = useState(false);
	const [number,setNumber] = useState('');
	const [code,setCode] = useState('+91');
	const [otpSent,setOtpSent] = useState(false);
	const [firstNumber,setFirstNumber] = useState('');
	const [secondNumber,setSecondNumber] = useState('');
	const [thirdNumber,setThirdNumber] = useState('');
	const [fourthNumber,setFourthNumber] = useState('');
	const [loader,setLoader]  = useState(false);
	const [resentOtp,setResentOtp] = useState(false);

	useEffect(()=>{
		if(session){
			if(!ready){
				setReady(true)
			}
			localStorage.setItem('XAI',JSON.stringify(session.user.name))
			handleValidation()
		}
	},[session])
	var id = "google";
	useEffect(()=>{
		if(id){
			id = Object.values(providers).map((provider)=>provider.id)	
		}		
	},[providers])
	useEffect(()=>{
		if(id2){
			id=id2;
		}
	},[id2])
	const redirect = () =>{
		router.push(`/${router.query.redirect ? router.query.redirect : "/"}`);
	}

	const redirectToWelcomePage = () => {
		router.push(`/welcome?redirect=${router.query.redirect ? router.query.redirect : "/"}`);
	}

	const handleValidation = async() =>{
		let username = session?.user.name
		let email = session?.user.email
		const {data} = await axios.post(loginRoutes,{
			email,
		});
		if(data.status === false){
			const number = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
			const {data} = await axios.post(registerRoutes,{
				username,
				email,
				number
			})
			if(!localStorage.getItem('XAI')){
				localStorage.setItem('XAI',JSON.stringify(data?.user?.username));
			}
			setCurrentUser(data.user);
			redirectToWelcomePage();			
			
		}else{
			if(!localStorage.getItem('XAI')){
				localStorage.setItem('XAI',JSON.stringify(data?.user?.username));
			}
			setCurrentUser(data?.user);
			redirect();
		}
	}

	const sendOtp = async() => {
		if(!number || !code){
			const element = document.getElementById('number_box');
			element.classList.add('border-red-500','animate-pulse')
			setTimeout(function() {
				element.classList.remove('border-red-500','animate-pulse')
			}, 5000);
		}else{
			setOtpSent(true);
			const userId = currentUser._id;
			const {data} = await axios.post(setNumberRoutes,{
				number,
				userId
			})
			setCurrentUser(data.obj);
		}
	}

	const verifyOTP = async() => {

	}


	const ResendOtp = () => {
		sendOtp();
		setResentOtp(true);
	}

	const inputFocus =(e) => {
		if(e.key==="Delete" || e.key==='Backspace'){
			const next = e.target.tabIndex - 2;
			if(next>-1){
				e.target.form.elements[next].focus();
			}
		}else{
			const next = e.target.tabIndex;
			if(next<4){
				e.target.form.elements[next].focus();
			}
		}

	}

	return (
		<div className="pt-[170px] md:w-[350px] w-full bg-black/60 md:bg-transparent py-6 rounded-xl z-10 md:ml-3 px-6 h-full">
			<div className="h-[3px] w-[150px] bg-[#c98e28]"/>
			<h1 className="text-xl text-[#debe85] font-varino mt-7">
				{
					verifyNumber ?
					'You are one step ahead'
					:
					'Login/SignUp'
				}
			</h1>

			<h1 className="text-xl font-Cormorant text-[#e6ab6a] md:text-[#aa9d80] mt-10">
				{
					verifyNumber?
					otpSent?
					'OTP Sent'
					:
					'Please verify your phone number to complete setting up your account'
					:
					'Due to security reasons we support only google authentication. Dual Way authentication is supported, Login or SignUp just by one tap.'
				}
				
			</h1>			
			{
				verifyNumber?
				otpSent ? 
				<form className="mt-8 rounded-xl px-2 py-3 transition-all duration-200 ease-in-out flex gap-2" >
					<input type="text" maxLength={1} className="bg-transparent w-[60px] text-center outline-none text-[#FFF] px-2 py-3 border-[1px] border-[#f1ad2f] rounded-xl text-xl"
					onChange={(e)=>setFirstNumber(e.target.value)}
					onKeyUp={(e)=>inputFocus(e)}
					value={firstNumber}
					tabIndex="1"
					/>
					<input 
					id="second"
					type="text" maxLength={1} className="bg-transparent w-[60px] text-center outline-none text-[#FFF] px-2 py-3 border-[1px] border-[#f1ad2f] rounded-xl text-xl"
					onChange={(e)=>setSecondNumber(e.target.value)}
					value={secondNumber}
					onKeyUp={(e)=>inputFocus(e)}
					tabIndex="2"
					/>
					<input 
					id="third"
					type="text" maxLength={1} className="bg-transparent w-[60px] text-center outline-none text-[#FFF] px-2 py-3 border-[1px] border-[#f1ad2f] rounded-xl text-xl"
					onChange={(e)=>setThirdNumber(e.target.value)}
					value={thirdNumber}
					onKeyUp={(e)=>inputFocus(e)}
					tabIndex="3"
					/>
					<input 
					id="fourth"
					type="text" maxLength={1} className="bg-transparent w-[60px] text-center outline-none text-[#FFF] px-2 py-3 border-[1px] border-[#f1ad2f] rounded-xl text-xl"
					onChange={(e)=>setFourthNumber(e.target.value)}
					value={fourthNumber}
					onKeyUp={(e)=>inputFocus(e)}
					tabIndex="4"
					/>
				</form>
				:
				<div 
				id="number_box"
				className="w-30 transition-all h-10 duration-200 ease-in-out border-[1px] mt-8 rounded-xl 
				focus-within:border-[#e6ab6a] border-[#f1ad2f] p-2 flex gap-1 bg-black/20">
					<input type="text" maxLength={4} className="w-[15%] text-[#f1ad2f] bg-transparent outline-none text-lg"
					value={code}
					onChange={(e)=>setCode(e.target.value)}
					/>
					<input type="text" maxLength={10} className="bg-transparent border-l-[1px] border-gray-700/80 px-2 outline-none w-[85%] text-[#FFF] text-lg"
					value={number}
					onChange={(e)=>setNumber(e.target.value)}
					/>
				</div>
				:
				<div className="mt-14 w-[130px] hover:scale-110 transition-all duration-200 ease-in-out
				active:scale-90 flex justify-center rounded-xl border-[2px] border-[#f1ad2f] p-2">
					<button 
					onClick={()=>{
						if(id){
							signIn(id[0])
						}else{
							signIn()	
						}						
					}}
					className={`${ready ? 'px-5 py-2':'px-6 py-3'} text-[#ca6f2b] font-varino bg-black/70`}>
					{
						ready ?
						<div className="h-8 w-8 border-[4px] border-gray-400 border-t-[#dca763] rounded-full animate-spin">

						</div>
						:
						'LOGIN'
					}
					</button>
				</div>
			}
			{
				otpSent ? 
				resentOtp?
				<h1 className="text-lg text-[#c98e28] ml-2 mt-4 font-Cormorant">
					OTP Sent <span className="text-sky-500">Again</span>
				</h1>
				:
				<h1 
				onClick={ResendOtp}
				className="text-lg text-[#c98e28] ml-2 mt-4 font-Cormorant hover:text-gray-300 cursor-pointer">
					Resend <span className="text-sky-500">OTP</span>
				</h1>	
				:
				""
			}
			{
				verifyNumber ? 
				otpSent ?
				<div className={`mt-10 w-[200px] hover:scale-110 transition-all duration-200 ease-in-out
				active:scale-90 flex justify-center rounded-xl border-[2px] border-[#f1ad2f] p-2`}>
					<button 
					onClick={verifyOTP}
					className={`${loader ? 'px-0' : 'px-6'} py-3 text-[#ca6f2b] font-varino flex bg-black/70 items-center`}>verify OTP {loader &&
						<div role="status" className="ml-2" >
					    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-700 animate-spin fill-[#ca6f2b]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
					        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
					    </svg>
					    <span class="sr-only">Loading...</span>
					</div>
					}</button>
				</div>
				:
				<div className="mt-14 w-[200px] hover:scale-110 transition-all duration-200 ease-in-out
				active:scale-90 flex justify-center rounded-xl border-[2px] border-[#f1ad2f] p-2">
					<button 
					onClick={sendOtp}
					className="px-6 py-3 text-[#ca6f2b] font-varino bg-black/70">SEND OTP</button>
				</div>
				:
				''
			}
		</div>

	)
}

export async function getServerSideProps(context) {
  const providers =await getProviders();
  return{
    props: {
      providers
    }
  }
}