import {useEffect,useState} from 'react'
import {MdOutlineNavigateNext} from 'react-icons/md'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'

export default function Hero(argument) {
	// body...
	const router = useRouter();
	const [buttonAnimation,setButtonAnimation] = useState(false);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

	const redirectByUser = () => {
		if(currentUser){
			router.push('#services')
		}else{
			router.push('/login')
		}
	}

	useEffect(()=>{
	    typeMessage('At XAI, we use the latest artificial intelligence technologies to offer a variety of powerful services, including audio-to-text, image generation, and video title creation. Let us help you achieve your goals and take your business to the next level.')
	 },[])

	  const typeMessage = (text) =>{
	    let index=0;
	    const element =document.getElementById('description');
	    element.innerHTML = "";
	    const interval = setInterval(()=>{
	      if(index<text.length){
	        element.innerHTML += text.charAt(index);
	        index++;
	      }else{
	        clearInterval(interval);
	        setButtonAnimation(true);
	        document.getElementById('tryfree').classList.remove('opacity-0')
	        document.getElementById('tryfree').classList.add('animate-buttonBlink');
	        setTimeout(function() {
	        	document.getElementById('nextIcon').classList.remove('hidden');
	        	document.getElementById('tryfree').classList.remove('w-[150px]');
	        	document.getElementById('tryfree').classList.add('w-[185px]');
	        	document.getElementById('nextIcon').classList.add('opacity-100');	        	
	        }, 3400);
	      }
	    },30)
	    
	  }

	return (
		<div className="min-h-screen max-w-6xl z-20 flex flex-col justify-center">
			<div className="h-full w-full flex flex-col justify-center md:mt-[60px] md:p-10 p-2 " >
				<h1 className="md:text-[200px] text-[100px] text-gray-200 text-shadow-md font-anurati text-shadow-fire ">
					XAI &
				</h1>
				
				<p 
				id="description"
				className="md:text-xl text-md text-gray-300 font-Cormorant">
					
				</p>
				
			</div>
			<button 
			id="tryfree"
			onClick={redirectByUser}
			className={`flex md:mx-10 mx-2 mt-3 opacity-0 md:mt-0 w-[150px] whitespace-nowrap items-center text-black z-1 px-5 py-2 
			uppercase rounded-full bg-gray-300 border-2 border-gray-900 hover:border-purple-500 hover:bg-gray-100 transition-all 
			transition-all duration-400 ease-out active:bg-gray-400 font-mono`}>
				Try for free 
				<MdOutlineNavigateNext 
				id="nextIcon"
				className={`h-7 ml-3 w-7 text-black transition-all duration-300 ease-in-out hidden`} />
			</button>
		</div>

	)
}