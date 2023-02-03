import Mvv from '../components/Mvv';
import Header2 from '../components/Header2';
import {motion} from 'framer-motion'
import {getSession,useSession} from 'next-auth/react'
import axios from 'axios';
import {useEffect} from 'react'
import {loginRoutes} from '../utils/ApiRoutes'
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'

export default function mvv() {
	// body...
    const {data:session,status} = useSession();
    const router = useRouter();
    const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

    useEffect(()=>{
        if(status==='authenticated'){
            handleValidation();
        }else{
            router.push('/login?redirect=debug');
        }
    },[])

    const handleValidation = async() =>{
        const email = session.user.email
        const {data} = await axios.post(loginRoutes,{
            email,
        });
        setCurrentUser(data.user);  
    }

	const changeWindow = () => {
		document.getElementById('intro').classList.add('hidden');
		document.getElementById('main').classList.remove('hidden');
	}

	return (
<div className="min-h-screen bg-black" >
		
		<Mvv/>
	</div>

	)
}

export async function getServerSideProps(ctx) {
return{
    props: {
      session: await getSession(ctx)
    }
  }
}