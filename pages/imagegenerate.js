import Header2 from '../components/Header2';
import {motion} from 'framer-motion';
import {BsDownload} from 'react-icons/bs';
import {useEffect,useState} from 'react';
import {AiOutlineQuestionCircle,AiOutlineHeart,AiFillHeart,AiOutlinePlusCircle} from 'react-icons/ai'
import { Configuration, OpenAIApi } from "openai";
import FileSaver from 'file-saver';
import InfoBox from '../components/InfoBox'
import {getSession,useSession} from 'next-auth/react'
import axios from 'axios';
import {loginRoutes} from '../utils/ApiRoutes'
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {reduceOnePinkTokenRoutes,setImagesArrayRoutes} from '../utils/ApiRoutes';
import LowTokenComponent from '../components/LowTokenComponent';

export default function imagegenerate() {
	// body...
	const configuration = new Configuration({
	  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const [imageReady,setImageReady] = useState(false);
	const [liked,setLiked] = useState(false);
	const [prompt,setPrompt] = useState('');
	const [infoVisiblity,setInfoVisiblity] = useState(false);
	const [file,setFile] = useState('');
	const [url2,setUrl2] = useState('');
	const [loader,setLoader] = useState('');
  const [showPricingState,setShowPricingState] = useState(false);
	const [generatedImage,setGeneratedImage] = useState('https://cdn.openai.com/labs/images/A%20photo%20of%20a%20Samoyed%20dog%20with%20its%20tongue%20out%20hugging%20a%20white%20Siamese%20cat.webp?v=1');
	const [imageArray,setImageArray] = useState([
		'https://ik.imagekit.io/d3kzbpbila/A_handpalm_with_a_tree_growing_on_top_of_it.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508250901',
		'https://ik.imagekit.io/d3kzbpbila/A_photograph_of_a_sunflower_with_sunglasses_on_in_the_middle_of_the_flower_in_a_field_on_a_bright_sunny_day.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508137048',
		'https://ik.imagekit.io/d3kzbpbila/A_futuristic_neon_lit_cyborg_face.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673536112456',
		'https://ik.imagekit.io/d3kzbpbila/A_hand-drawn_sailboat_circled_by_birds_on_the_sea_at_sunrise.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508169690',
		'https://ik.imagekit.io/d3kzbpbila/A_plush_toy_robot_sitting_against_a_yellow_wall.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508183814',
		'https://ik.imagekit.io/d3kzbpbila/A_Shiba_Inu_dog_wearing_a_beret_and_black_turtleneck.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508197473',
		'https://ik.imagekit.io/d3kzbpbila/A_sunlit_indoor_lounge_area_with_a_pool_with_clear_water_and_another_pool_with_translucent_pastel_pink_water__next_to_a_big_window__digital_art.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508062355',
		'https://ik.imagekit.io/d3kzbpbila/A_synthwave_style_sunset_above_the_reflecting_water_of_the_sea__digital_art.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508107365',
		'https://ik.imagekit.io/d3kzbpbila/A_van_Gogh_style_painting_of_an_American_football_player.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508119951',
		'https://ik.imagekit.io/d3kzbpbila/An_armchair_in_the_shape_of_an_avocado.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508013425',
		'https://ik.imagekit.io/d3kzbpbila/High_quality_photo_of_a_monkey_astronaut.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673536185926',
		'https://ik.imagekit.io/d3kzbpbila/An_expressive_oil_painting_of_a_basketball_player_dunking__depicted_as_an_explosion_of_a_nebula.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508078589',
		'https://ik.imagekit.io/d3kzbpbila/Two_futuristic_towers_with_a_skybridge_covered_in_lush_foliage__digital_art.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508094648',
	]);
  const {data:session,status} = useSession();
  const router = useRouter();
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

  useEffect(()=>{
    if(loader){
      document.getElementById('upperDesign').classList.add('animate-ping');
      document.getElementById('lowerDesign').classList.add('animate-ping');
    }else{
      document.getElementById('upperDesign').classList.remove('animate-ping');
      document.getElementById('lowerDesign').classList.remove('animate-ping');
    }
  },[loader])

	const pathCheck = (path) =>{
	    if(path){
	      if(path.split('/').includes('data:image')){
	        return true;        
	      }
	    }
	  }

	const changeWindow = () => {
		document.getElementById('intro').classList.add('hidden');
		document.getElementById('main').classList.remove('hidden');

	}

  useEffect(()=>{
        if(status==='authenticated'){
            handleValidation();
        }else{
            router.push('/login?redirect=imagegenerate');
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

	const spring ={
		delay:2,
		duration:2,
		type:"spring",
		damping:5,
		stiffness:100,
		
	}

	const selectFile = () => {
		document.getElementById('input_file').click();
	}

	const url1Setter = () =>{
    
      const image_input = document.getElementById('input_file');
      const reader = new FileReader();

      reader.addEventListener('load',()=>{
        let uploaded_image = reader.result;
        setUrl2(uploaded_image)
        console.log(uploaded_image)
      });
      if(image_input){
        reader.readAsDataURL(image_input.files[0]);
      }
    
  	}

  	const download = () => {
  		FileSaver.saveAs(generatedImage,'XAI_GENERATED_IMAGE');
  	}

  	useEffect(()=>{
  		const upload = async() => {
	  		if(url2){
	  			setLoader(true);
	  			if(pathCheck(url2)){
            if(currentUser?.pinkToken>0){
  	  				setImageReady(true);
  	  				console.log("runing")
  	  				const response = await openai.createImageVariation(
    					  url2,
    					  1,
    					  "1024x1024"
    					);
    					console.log("runing")
    					const image_url = response.data.data[0].url;
              console.log(image_url)
    					setGeneratedImage(image_url)
    					setLoader(false);
              reduceOnePinkToken();
            }else{
              showPricing();
              setLoader(false);
            }
	  			}else{
	  				setLoader(false);
	  				setUrl2('');
	  			}
	  		}
	  	}
	  	upload();
  	},[url2])

  	const createImage = async() => {
  		if(prompt.length > 5 && !loader){
        if(currentUser?.pinkToken>0){
    			setGeneratedImage('');
    			setLoader(true);
    			setImageReady(true);
    			const result = await openai.createImage({
    				prompt:prompt,
    				n:1,
    				size:"1024x1024"
    			})
    			const image_url = result.data.data[0].url;
          updateDatabaseArray(image_url)
    			setGeneratedImage(image_url);
    			setLoader(false);
          reduceOnePinkToken();
        }else{
          showPricing();
        }
  		}
  	}

    const updateDatabaseArray = async(image_url) => {
      const images = currentUser.imagesArray;
      const imagesArray = [...images,image_url]
      const userId = currentUser._id;
      const {data} = await axios.post(setImagesArrayRoutes,{
        imagesArray,userId
      })
      setCurrentUser(data.obj)
    }

    const reduceOnePinkToken = async() => {
      let pinkToken = currentUser.pinkToken;
      pinkToken = pinkToken - 1;
      const userId = currentUser._id
      const {data} = await axios.post(reduceOnePinkTokenRoutes,{
        pinkToken,userId
      });
      setCurrentUser(data.obj)
  }

    const showPricing = () => {
      setShowPricingState(!showPricingState)
    }


  	const scrollToCreate = () => {
  		const element = document.getElementById('input_div');
  		element.scrollIntoView({
  			behavior:"smooth",block:'center'
  		})
  	}
	

	return (
<div>
		<div 
		id="intro"
		className="relative z-0 w-full bg-[#0C0C0C] md:overflow-y-hidden overflow-x-hidden">
			<Header2 hide="true" redirect="imagegenerate" token="pink"/>
      <div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-rose-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
      <div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-purple-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
			<motion.div 
              initial={{
                opacity:0
              }}
              whileInView={{
                opacity:[0.4,0.15]
              }}
              transition={{
                duration:2
              }}
              className="absolute z-0 h-full w-full bg-fixed
              bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/Robot_Black_background_509385_xg9dLEZncY.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673449581991')] "
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
            		className="md:w-[50%] relative mt-7 rounded-xl">
            			<img src="https://ik.imagekit.io/d3kzbpbila/imagegenrate_L56kBZ489.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675189496947"
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
            			className="absolute md:blur-xl blur-lg h-full top-0 w-full bg-[#ed9af4]/70"/>
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
            			<h1 className="md:text-4xl text-2xl md:mt-20 mt-5 font-anurati text-gray-200 uppercase text-center tracking-[5px]">Image Generation</h1>
            			<p 
            			className="text-center text-md md:text-xl mt-5 text-gray-300 font-mono">{process.env.NEXT_PUBLIC_IMAGE_TEXT}</p>
            			<button 
            			onClick={changeWindow}
            			className="mt-10 rounded-xl bg-gray-100/90 px-3 py-2 text-black font-mono tracking-[3px]">Generate Now</button>
            		</motion.div>
            	</div>
            	
            </div>

		</div>
		<div 
		id="main"
		className="relative hidden z-0 w-full bg-[#0C0C0C] overflow-x-hidden">
		<div className={`fixed ${infoVisiblity ? "z-50" : "w-[95%] z-0"}`}>
			<InfoBox Heading="Better Prompts Better Image" Description="While Prompting to AI please provide the full description of the image, otherwise the image will not satisfy your need.Dont know how to make an effective prompt, hover on sample images to see their prompts to get an idea.Note:-Limited number of image generation only will be available in trial mode"
			Visible={infoVisiblity} setVisible={setInfoVisiblity}
			/>
		</div>
		  <div className={`fixed z-50 ${showPricingState ? "left-0":'left-[100%]'} transition-all duration-500 ease-in-out`}>
        <LowTokenComponent token="pink" showPricing={showPricing}/>
      </div>
			<Header2 hide="true" redirect="imagegenerate" token="pink"/>
      <div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-rose-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
      <div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-purple-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>
			<motion.div 
              initial={{
                opacity:0
              }}
              whileInView={{
                opacity:[0.4,0.15]
              }}
              transition={{
                duration:2
              }}
              className="absolute z-0 h-full w-full bg-fixed
              bg-center bg-no-repeat bg-cover  bg-[url('https://ik.imagekit.io/d3kzbpbila/Robot_Black_background_509385_xg9dLEZncY.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673449581991')] "
            />
            <motion.div 
            transition={spring}
            animate={{
            	rotate:40
            }}
            className="absolute top-[60%] right-0 z-0 h-40 md:h-[200px] w-40 md:w-[200px] opacity-10 bg-cover rounded-xl bg-center bg-no-repeat 
            bg-[url('https://cdn.openai.com/labs/images/A%20photo%20of%20a%20Samoyed%20dog%20with%20its%20tongue%20out%20hugging%20a%20white%20Siamese%20cat.webp?v=1')]"
            />
            <motion.div 
            transition={spring}
            animate={{
            	rotate:-40
            }}
            className="absolute top-[10%] left-0 z-0 h-40 md:h-[200px] w-40 md:w-[200px] -rotate-[40deg] opacity-10 rounded-xl bg-cover bg-center bg-no-repeat 
            bg-[url('https://ik.imagekit.io/d3kzbpbila/A_futuristic_cyborg_poster_hanging_in_a_neon_lit_subway_station.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673508153233')]"
            />
            <div 
            className="h-screen flex flex-col z-10 max-w-6xl mx-auto 
        	scrollbar-hidden scroll-smooth">
            	<div id="input_div" className="w-full md:px-2 px-4 mt-[66px] z-10 flex flex-col">
            			<div className={`${imageReady ? 'mt-[30px]' :'mt-[150px]'} flex gap-3 items-center`}>
	            			<h1 className="text-md text-gray-300/80 font-serif">{
	            				generatedImage ? 
	            				"Edit The Description of the Image and Generate again"
	            				:
	            				"Give an Detailed Description of the Image"
	            			}</h1>
	            			<AiOutlineQuestionCircle 
	            			onClick={()=>setInfoVisiblity(true)}
	            			className="h-5 w-5 cursor-pointer z-50 hover:text-gray-400 text-gray-500"/>
            			</div>
            			<div className="w-full flex mt-5 justify-between md:py-3 bg-gray-700/70 
            			shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(88,47,242,0.20)] rounded-xl">
          				<input 
            				value={prompt}
            				onChange={(e)=>setPrompt(e.target.value)}
            				placeholder="High Quality Photo of a Monkey Astronaut"
            				className="w-full text-center placeholder-gray-600 hidden md:block py-2 px-4 text-gray-300 outline-none bg-transparent"/>
          				<textarea
          				 	value={prompt}	
            				onChange={(e)=>setPrompt(e.target.value)}
            				placeholder="High Quality Photo of a Monkey Astronaut"
            				className="w-full placeholder-gray-600 h-[100px] md:hidden py-2 px-4 text-gray-300 outline-none bg-transparent"/>
          				<div 
          				onClick={createImage}
          				className="px-4 py-2 hidden md:block border-l-[0.3px] border-gray-500 text-xl text-gray-100/80 cursor-pointer font-mono">Generate</div>
            			</div>
            			<button 
            			onClick={createImage}
            			className="px-4 w-40 rounded-full mx-auto hover:bg-gray-400/90 transition-all duration-200 ease-out active:scale-90 py-2 md:hidden text-xl text-gray-100/90 cursor-pointer bg-gray-700/90 mt-10 font-mono ">Generate</button>
            			<hr className="h-2 md:w-[70%] w-[80%] mx-auto opacity-50 text-black mt-10"/>
            			<div className={`${imageReady? " hidden":""} flex mt-5 justify-center w-full gap-3 items-center`}>
            				
            				<h1 className="text-md text-gray-400 hidden">Or, <span 
            				onClick={selectFile}
            				className="text-sky-500 cursor-pointer hover:text-sky-200 ">Upload an Image</span> to Create Variation</h1>
            				<input type="file" id="input_file" accept="image/*"
            				onChange={(e)=>{setFile(e.target.value);url1Setter()}}
            				value={file}
            				hidden/>
            			</div>
            			<div className={`${imageReady ? "relative" : "hidden"} ${generatedImage ? "" :"animate-pulse"} overflow-hidden rounded-xl flex items-center justify-center bg-gray-700 md:w-[50%] w-[80%] mt-5 aspect-square mx-auto `}>
            				{
            					generatedImage ? 
            					<img src={generatedImage} 
            					alt="" className="h-full w-full"
            					/>
            					:
            					<div className="flex gap-5">
	            					<div className="h-5 w-5 rounded-full bg-sky-400 animate-ping m-auto opacity-75"/>
	            					<h1 className="text-md md:text-xl text-gray-200 font-mono uppercase">Loading...</h1>
            					</div>
            				}
            				<div onClick={download} className={`${generatedImage ? "":"hidden"} absolute top-2 cursor-pointer right-2 p-2 bg-gray-700/80 rounded-lg`}>
            					<BsDownload className="text-slate-300 h-4 md:h-5 w-4 md:w-5"/>
            				</div>
            				<div 
            				onClick={()=>setLiked(true)}
            				className={`${generatedImage ? "":"hidden"} absolute top-2 right-[47px] md:right-[54px] cursor-pointer p-2 bg-gray-700/80 rounded-lg`}>
            					{
            						liked?
            						<AiFillHeart className="text-red-500 h-4 md:h-5 w-4 md:w-5"/>
            						:
            						<AiOutlineHeart className="text-slate-300 h-4 md:h-5 w-4 md:w-5"/>
            					}
            					
            				</div>
            			</div>
            			<div className={`${imageReady ? "md:mt-[100px] mt-[70px]" : "md:mt-[200px] mt-[170px]"}  w-full`}>
            				<h2 className="text-xl font-semibold text-gray-300">
            					Sample Images
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
            									<div className="absolute p-1 text-white bg-black/30 font-semibold z-10
            									transition-all duration-200 ease-in
            									-bottom-40 group-hover:bottom-0 text-sm md:text-lg w-full">
            											{image.split('a/')[1].split('.')[0].replace(/_/g," ")}
            									</div>
            									<img key={image} src={image} className="group-hover:opacity-70 z-0 transition duration-200 ease-out" alt=""/>
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
									<h1 className="text-center text-md md:text-xl text-gray-200 mt-3 font-semibold">Add Your Image Here By Giving ❤️ To The Generated Image</h1>
								</motion.div>            					
            				</div>
            				<div className="h-10 w-full mb-20">

            				</div>
            			</div>
            	</div>
            	
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