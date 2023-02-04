import {motion} from 'framer-motion'
import Header2 from './Header2';	
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom'
import axios from 'axios';
import {setProfileAndNameRoutes} from '../utils/ApiRoutes';
import {useState,useEffect} from 'react';
import {AiOutlineEdit} from 'react-icons/ai'
import ImageKit from "imagekit"


export default function ProfileComponent(argument) {
	// body...
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [name,setName] = useState('');
	const [edit,setEdit] = useState(false);
	const [profile,setProfile] = useState('');
	const [url2,setUrl2] = useState('')
	const [path2,setPath2] = useState('')
	const imagekit = new ImageKit({
	    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_ID,
	    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
	    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT
	});
	useEffect(()=>{
		if(currentUser){
			setName(currentUser.username);
			setProfile(currentUser.profile);
		}
	},[currentUser])

	const pathCheck = (path) =>{
		if(path){
			if(path.split('/').includes('data:image')){
				return true;				
			}
		}
	}

	const url1Setter = () =>{
		
			const image_input = document.querySelector('#file1');
			const reader = new FileReader();

			reader.addEventListener('load',()=>{
				let uploaded_image = reader.result;
				setUrl2(uploaded_image)
			});
			if(image_input){
				reader.readAsDataURL(image_input.files[0]);
			}	
	}

	useEffect(()=>{
	if(url2){
		const uploadImage = (url2) =>{
			if(pathCheck(url2)){
				setProfile('https://ik.imagekit.io/d3kzbpbila/pic_loading_z9c5BSkmy.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1674904202083')
				imagekit.upload({
			    file : url2, //required
			    fileName : "thejashari",   //required
			    extensions: [
			        {
			            name: "google-auto-tagging",
			            maxTags: 5,
			            minConfidence: 95
			        }
			    ]
				}).then(response => {
				    setUrl2('');
				    setProfile(response.url);
				}).catch(error => {
				    console.log(error);
				    setProfile(currentUser.profile);
				});
			}
		}
		uploadImage(url2);
		}
	},[url2])

	useEffect(()=>{
		if(edit){
			const container = document.querySelector('.container');
			const card = document.querySelector('.card');
			const title=  document.querySelector('.title');
			const description = document.querySelector('.description');
			const sizes = document.querySelector('.email');
			const purchase = document.querySelector('.purchase button');
			const sneaker = document.querySelector('.sneaker img');
			const input = document.querySelector('.disabled');
			card.style.transition = 'all 0.5s ease';
			card.style.transform = `rotateY(0deg) rotateY(0deg)`;
			sneaker.style.transform = 'translateZ(0px)';
			title.style.transform = 'translateZ(0px)';
			description.style.transform = 'translateZ(0px)'
			sizes.style.transform = 'translateZ(0px)'
			purchase.style.transform = 'translateZ(0px)';
			input.readOnly = false
		}else{
			const input = document.querySelector('.disabled');
			input.readOnly  = true;
		}
	},[edit])

	const setNameAndProfile = async() => {
		const username = name;
		const userId = currentUser._id
		const {data} = await axios.post(setProfileAndNameRoutes,{
			username,profile,userId
		})
		setCurrentUser(data.obj)
	}

	useEffect(()=>{
		const container = document.querySelector('.container');
		const card = document.querySelector('.card');
		const title=  document.querySelector('.title');
		const description = document.querySelector('.description');
		const sizes = document.querySelector('.email');
		const purchase = document.querySelector('.purchase button');
		const sneaker = document.querySelector('.sneaker img');


		container.addEventListener('mousemove',e=>{
			if(!edit){
				let xAxis = (window.innerWidth / 2 - e.pageX) /17
				let yAxis = (window.innerWidth / 2 - e.pageY) /17
				card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
			}		
		})

		container.addEventListener('mouseenter',e=>{
			if(!edit){
				card.style.transition = 'none';
				//popout
				sneaker.style.transform = 'translateZ(130px)'
				title.style.transform = 'translateZ(120px)'
				description.style.transform = 'translateZ(100px)'
				sizes.style.transform = 'translateZ(70px)'
				purchase.style.transform = 'translateZ(100px)'
			}			
		})

		

		container.addEventListener('mouseleave',(e)=>{
			card.style.transition = 'all 0.5s ease';
			card.style.transform = `rotateY(0deg) rotateY(0deg)`;
			sneaker.style.transform = 'translateZ(0px)';
			title.style.transform = 'translateZ(0px)';
			description.style.transform = 'translateZ(0px)'
			sizes.style.transform = 'translateZ(0px)'
			purchase.style.transform = 'translateZ(0px)'
		})

	},[])
	
	const editName= () => {
		const element = document.querySelector('.disabled')
		element.focus();
	}

	const openInput = () => {
		document.querySelector('#file1').click()
	}


	return (
	
		<div 
	id="main"
	className="relative min-h-screen scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
		<div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-100/30 -top-[5%] -right-14 blur-3xl md:-right-20"/>
		<div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-100/30 -bottom-[5%] blur-3xl -left-14 md:-left-20"/>
				

		<Header2 hide="true" redirect="profile"/>
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
        className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px] mb-[100px]
    	scroll-smooth">	    		
    		<div className="w-full wrapper gap-7 flex text-[#FFF]">
    			<div className="container">
    				<div className="card bg-purple-200/10 border-[2px] border-gray-700">
    					<div className="sneaker relative">
    						<input type="file" id="file1" hidden accept="image/*" value={path2} onChange={(e)=>{
								setPath2(e.target.value);url1Setter();
							}} />
    						<div className="circle"/>
    						{
    							edit &&
    							<div className="rounded-full bg-gray-500/20 p-1 absolute bottom-2 right-0 hover:bg-gray-500/40 transition-all duration-200 ease-out">
									<AiOutlineEdit 
									onClick={openInput}
									className="h-7 w-7 cursor-pointer text-purple-500"/>
								</div>
							}
							<img src={profile} alt="" className={`image rounded-full`}/> 						
    					</div>
    					<div className="info">
    						<h1 className="title text-3xl mt-3 transition-all duration-[0.75s] ease-out text-center font-anurati">
    							Personal Information
    						</h1>
    						<h3 className="description transition-all duration-[0.75s] ease-out mt-7 text-xl font-cormorant text-center 
    						text-[#FFF] flex justify-center items-center">
    							<input type="text" readOnly className="disabled outline-none text-center bg-transparent" 
    							onChange={(e)=>setName(e.target.value)}
    							value={name}/>
    							{edit &&
    								<div 
    								onClick={editName}
    								className="rounded-full bg-gray-500/20 p-1 hover:bg-gray-500/40 transition-all duration-200 ease-out">
    									<AiOutlineEdit className="h-6 w-6 text-purple-500 cursor-pointer"/>
    								</div>
    							}    							
    						</h3>
    						<h4 className="email text-center mt-2 transition-all duration-[0.75s] ease-out text-lg text-gray-400">
    							{currentUser.email}
    						</h4>
    						<div className="purchase mt-7">
    							<button onClick={()=>{
    								if(edit){
    									setNameAndProfile();
    								}
    								setEdit(!edit)
    							}} className="transition-all duration-[0.75s] ease-out">
    							{
    								edit ? 
    								'Save'
    								:
    								'Edit'
    							}
    							</button>
    						</div>
    					</div>
    				</div>
    			</div>


    		</div>

    	</motion.div>
    </div>
 
	)
}