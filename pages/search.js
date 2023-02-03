import SearchComponent from '../components/SearchComponent';
import Header2 from '../components/Header2';
import {motion} from 'framer-motion';
import {useEffect} from 'react'
import {getSession,useSession} from 'next-auth/react'
import axios from 'axios';
import {loginRoutes} from '../utils/ApiRoutes'
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'


export default function search() {
    // body...
    const {data:session,status} = useSession();
    const router = useRouter();
    const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

    

    useEffect(()=>{
        if(status==='authenticated'){
            handleValidation();
        }else{
            router.push('/login?redirect=search');
        }
    },[])

    const handleValidation = async() =>{
        const email = session.user.email
        const {data} = await axios.post(loginRoutes,{
            email,
        });
        setCurrentUser(data.user);  
    }

    useEffect(()=>{
        document.addEventListener('keydown',(e)=>{
            var name = e.key;
            if(name === 'Enter'){
                changeWindow();
            }
        })
    },[])



    const changeWindow = () => {
        document.getElementById('intro').classList.add('hidden');
        document.getElementById('main').classList.remove('hidden');
    }

   

    return (
<div className="" >
        <div 
        id="intro"
        className="relative z-0 w-full bg-[#0C0C0C] md:overflow-y-hidden overflow-x-hidden">
            <Header2 hide="true" redirect="search" token="orange"/>
            <motion.div 
              initial={{
                opacity:0
              }}
              whileInView={{
                opacity:[0.4,0.1]
              }}
              transition={{
                duration:2
              }}
              className="absolute z-0 h-full w-full bg-fixed
              bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/audio_background_rkb6cCJOY.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673964563329')] "
            />
            <div 
            className="h-screen flex flex-col z-10 max-w-6xl mx-auto snap-y snap-mandatory 
            scrollbar-hidden scroll-smooth">
                <div className="w-full md:px-2 px-4 mt-[55px] z-10 flex md:flex-row flex-col">
                    <motion.div 
                    initial={{
                        opacity:0,
                    }}
                    whileInView={{
                        opacity:1,
                    }}
                    transition={{
                        duration:2
                    }}
                    className="md:w-[50%] relative md:mt-10 mt-7 rounded-xl">
                        <img src="https://ik.imagekit.io/d3kzbpbila/product_JKxkQNRAZO.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675189497792"
                        alt=""
                        className="relative z-10  border-[2.5px] border-gray-300/80 rounded-xl"
                        />
                        <motion.div 
                        initial={{
                            opacity:0,
                            rotate:0
                        }}
                        whileInView={{
                            opacity:1,
                            rotate:4
                        }}
                        transition={{
                            duration:3
                        }}
                        className="absolute md:blur-xl blur-lg h-full top-0 w-full bg-[#c3d4ee]/50"/>
                    </motion.div>
                    <motion.div 
                    initial={{
                        opacity:0.2,
                        y:200
                    }}
                    animate={{
                        opacity:1,
                        y:0
                    }}
                    transition={{
                        duration:2
                    }}
                    className="md:w-[50%] items-center p-4 md:p-6 md:ml-2 justify-center flex flex-col">
                        <h1 className="md:text-2xl text-lg md:mt-20 mt-5 font-anurati text-gray-200 uppercase tracking-[5px] text-center">Search Words in Audio</h1>
                        <p 
                        className="text-center text-md md:text-xl mt-5 text-gray-300 font-mono">{process.env.NEXT_PUBLIC_SEARCH_TEXT}</p>
                        <button 
                        onClick={changeWindow}
                        className="mt-10 rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">Try it Now</button>
                        
                    </motion.div>

                </div>
            </div>

        </div>
        <SearchComponent/>
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