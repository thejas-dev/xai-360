import {motion} from 'framer-motion';
import ThanksComponent from '../components/ThanksComponent';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {getSession,useSession} from 'next-auth/react'
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {loginRoutes} from '../utils/ApiRoutes'




export default function thanks() {
	// body...
  const {data:session,status} = useSession();
  const router = useRouter();
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

  useEffect(()=>{
      if(status==='authenticated'){
          handleValidation();
      }
  },[])

  const handleValidation = async() =>{
      const email = session.user.email
      const {data} = await axios.post(loginRoutes,{
          email,
      });
      setCurrentUser(data.user);  
  }	




	return (
		<div className="" >
		<div 
		id="intro"
		className="relative z-0 w-full bg-[#0C0C0C] md:overflow-y-hidden overflow-x-hidden">
			<motion.div 
              initial={{
                opacity:0
              }}
              whileInView={{
                opacity:[0.45,0.9]
              }}
              transition={{
                duration:2
              }}
              className="absolute z-0 h-full w-full bg-fixed
              bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/loginbg_0KCvhp2um.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674493342588')] "
            />
            <div 
            className="h-screen flex flex-col z-10 w-full mx-auto snap-y snap-mandatory 
        	scrollbar-hidden scroll-smooth">
        		<ThanksComponent/>
        	</div>
        </div>


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

