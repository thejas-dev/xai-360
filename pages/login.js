import Header2 from '../components/Header2';
import {motion} from 'framer-motion';
import {useEffect} from 'react';
import LoginComponent from '../components/LoginComponent';
import {getProviders} from 'next-auth/react'     





export default function login({providers}) {
	// body...
  var id = "";
  useEffect(()=>{
    id = Object.values(providers).map((provider)=>provider.id)
  },[providers])



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
        		<LoginComponent id={id}/>
        	</div>
        </div>


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