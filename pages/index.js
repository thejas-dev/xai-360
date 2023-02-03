import {useEffect,useState} from 'react'
import Services from '../components/Services'
import Header2 from '../components/Header2';
import Join from '../components/Join.tsx'
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Mvv from '../components/Mvv';
import AboutComponent from '../components/AboutComponent';
import {motion} from 'framer-motion'
import PricingComponent from '../components/PricingComponent';
import Head from 'next/head'
import {getSession,useSession} from 'next-auth/react'
import axios from 'axios';
import {loginRoutes} from '../utils/ApiRoutes'
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'

const index = () =>{
  const [theme,setTheme] = useState('light');
  const [revealMenu,setRevealMenu] = useState(false);
  const {data:session,status} = useSession();
  const router = useRouter();
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

  useEffect(()=>{
    console.log(window.matchMedia('(prefers-color-scheme:dark)').matches)
    if(!localStorage.getItem('xai-360')){
      const theme = "dark"
      localStorage.setItem('xai-360',theme)
    }else{
      if(localStorage.getItem('xai-360')==="dark"){
        makeMeDark();
        setTheme('dark')
      }else{
        makeMeLight();
        setTheme('light')
      }
    }
    makeMeDark();
    console.log('speechSynthesis' in window)
  },[])


  
  
  const makeMeDark=()=>{
    document.getElementById('imdark').classList.add('dark')
    const theme = "dark"
    localStorage.setItem('xai-360',theme)
  }

  const makeMeLight = () =>{
    document.getElementById('imdark').classList.remove('dark')
    const theme = "light";
    localStorage.setItem('xai-360',theme);
  }


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

    return(
        <div id="imdark" className="relative w-full  bg-black" >
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>
        <motion.div 
              initial={{
                opacity:0
              }}
              whileInView={{
                opacity:[0.9,0.4]
              }}
              transition={{
                duration:2
              }}
              className="absolute z-0 h-full w-full flex flex-col items-center justify-center bg-fixed 
              bg-center bg-no-repeat bg-cover bg-[url('https://ik.imagekit.io/d3kzbpbila/Thejas_Hari_server_images_dark_theme_for_background_website_bac_066a3751-b352-4573-8040-3a72662727c1_2_gprggFjOS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674835809364')] "
            />  
          <div className="h-screen flex flex-col z-10 w-fullsnap-y snap-mandatory  relative
        z-0  overflow-x-hidden scroll-smooth">
        <div className={`fixed ${revealMenu ? "left-0": "left-[100%]"} z-50 transition-all duration-500 ease-in-out w-full h-full  `}>
          <Sidebar />    
        </div>
        <Header2 token="all" hide="true" redirect="/"/>
        <section id="hero" className="snap-center">
          <Hero />
        </section>      
        <section id="about" className="snap-center">
          <AboutComponent />
        </section> 
        <section id="mvv" className="snap-center">
          <Mvv/>
        </section>
        <section id="services" className="snap-center">
          <Services/>
        </section>
        <section id="pricing" className="snap-center">
          <PricingComponent/>
        </section>
        <section id="support" className="snap-center">
          <Join/>
        </section>
        <section id="projects" className="snap-center">
          <Projects/>
        </section>
      </div>
      </div>
   

    ) 
} 


export default index;

//https://ik.imagekit.io/d3kzbpbila/DALL_E_2023-01-04_20.43.02_-_Place__XAI__in_erased_area_2_FUUJ28KEi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672910028085

export async function getServerSideProps(ctx) {
return{
    props: {
      session: await getSession(ctx)
    }
  }
}