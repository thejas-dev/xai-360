import {motion} from 'framer-motion'
import {BiCopyAlt} from 'react-icons/bi'
import Header2 from './Header2';	
import {useState,useEffect} from 'react'
import {AiOutlineQuestionCircle,AiOutlineHeart,AiFillHeart,AiOutlinePlusCircle} from 'react-icons/ai'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import {useRouter} from 'next/router'


export default function StorageComponent(argument) {
	// body...
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [imageArray,setImageArray] = useState([]);
	const [cdnArray,setCdnArray] = useState([]);
	const router = useRouter();

	const scrollToCreate = () => {
  		router.push('/imagegenerate');
  	}

  	useEffect(()=>{
  		if(currentUser){
  			setImageArray(currentUser.imagesArray);
  			setCdnArray(currentUser.cdnArray);
  		}
  	},[currentUser])

  	const redirectToCdn = () => {
  		router.push('/cdn')
  	}

  	const copyText = (url) => {
  		navigator.clipboard.writeText(url)
  	}


	return (
		<div 
	id="main"
		className="relative min-h-screen scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-100/30 -top-[5%] -right-14 blur-3xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-100/30 -bottom-[5%] blur-3xl -left-14 md:-left-20"/>
				

		<Header2 hide="true" token="all" redirect="profile"/>
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
        className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px] scroll-smooth">
        	<h1 className="text-3xl md:text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">My<span className="text-sky-500"> Storage</span></h1>	
    		<div className="h-[2px] w-[60%] md:w-[15%] mx-auto bg-orange-500 "/>
    		<h2 className="text-2xl mt-10 font-semibold text-gray-300 font-mono">
				Your Generated Images
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 px-2 py-3">
				{
					imageArray.map((image)=>{

						return(
							<motion.div 
							initial={{
								opacity:0.1,
								y:100
							}}
							whileInView={{
								opacity:1,
								y:0
							}}
							transition={{
								duration:1
							}}
							className="rounded-md relative cursor-pointer group m-2 overflow-hidden">
								<img key={image} src={image} className="group-hover:opacity-90 z-0 transition duration-200 ease-out" alt=""/>
							</motion.div>

						)
					})
				}
				<motion.div 
				initial={{
					opacity:0.1,
					y:100
				}}
				whileInView={{
					opacity:1,
					y:0
				}}
				transition={{
					duration:1
				}}
				onClick={scrollToCreate}
				className="rounded-md bg-gray-900 hover:bg-gray-700 relative cursor-pointer 
				px-2 py-2 group m-2 overflow-hidden flex flex-col items-center justify-center">
					<AiOutlinePlusCircle className="h-7 md:h-10 md:w-10 w-7 text-gray-400"/>
					<h1 className="text-center text-md md:text-xl text-gray-200 mt-3 font-semibold">To Generate More Visit /imagegenerate</h1>
				</motion.div>            					
			</div>
			<h2 className="text-2xl mt-10 font-semibold text-gray-300 font-mono">
				Your CDN's
			</h2>
			<div className="mt-1 w-full rounded-xl mb-10 px-4 py-3 border-gray-500/50 border-[1px] bg-black/50">
				{
					cdnArray.map((cdn)=>{
						return (
							<>
							<h1 className="text-lg mt-5 font-mono text-gray-200">{cdn.split('a/')[1].split('.')[0].replace(/_/g," ")}</h1>
							<div className="w-full mt-1 break-all flex px-2 gap-1 py-3 bg-black/70 rounded-xl border-[1px] border-gray-400">
								<div className="md:w-[95%] w-[90%]">
									<h1 className="font-sourceCode text-gray-300 text-md md:text-lg">{cdn}</h1>
								</div>
								<div 
								onClick={()=>copyText(cdn)}
								className="md:w-[5%] w-[10%] flex items-center justify-center border-l-[1px] border-orange-500 rounded-xl px-[2px] md:px-2 md:py-3">
									<BiCopyAlt className="h-7 w-7 text-gray-300 cursor-pointer hover:text-sky-500 transition-all duration-200 ease-out"/>
								</div>
							</div>
							</>

						)
					})
				}
				<div className="w-full mt-5 px-2 py-3 bg-black/70 cursor-pointer hover:bg-gray-700/80 transition-all 
				duration-200 ease-out rounded-xl border-[1px] border-gray-400 ">
					<div 
					onClick={redirectToCdn}
					className="w-[100%]">
						<h1 className="font-sourceCode text-orange-500 text-lg text-center">Generate More</h1>
					</div>
					
				</div>
			</div>
        </motion.div>
    </div>


	)
}