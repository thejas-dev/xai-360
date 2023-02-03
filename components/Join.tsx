import {motion} from 'framer-motion';
import {PhoneIcon,MapPinIcon,EnvelopeIcon} from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from "react-hook-form";
import {useState,useEffect} from 'react';


type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};


export default function Join() {
	// body...
	const { register, handleSubmit} = useForm<Inputs>();
	const [edit,setEdit] = useState(false);
  	const onSubmit: SubmitHandler<Inputs> = formData => {
  	window.location.href = `mailto:xai360queries@gmail.com?subject=${formData.subject}&body=Hi my name is ${formData.name}, ${formData.message} (${formData.email})`
  }




	return (
		<div className="mt-10 overflow-x-hidden space-y-10 min-h-screen relative flex flex-col text-center md:text-left max-w-xl 
		px-2 justify-evenly mx-auto items-center">
			<h3 className="uppercase font-varino text-gray-200 text-2xl" >
				Support
			</h3>
			<div className="px-2 py-3 grid grid-cols-2 gap-5 group container-2 ">
				<div className="flex flex-col gap-5 support-card-1">
					<a href={process.env.NEXT_PUBLIC_INSTA}>
					<motion.img 
					initial={{
						opacity:0,
						y:-70,
						x:-70
					}}
					whileInView={{
						opacity:0.9,
						y:0,
						x:0
					}}
					transition={{
						duration:1
					}}
					src="https://ik.imagekit.io/d3kzbpbila/Instagram_icon.png_Z4hrDZo4QZ.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673679526518" 
					className="h-14 w-14 rounded-xl group-hover:shadow-lg hover:shadow-lg shadow-orange-500 transition-all duration-100 ease-in-out cursor-pointer hover:opacity-1"/>
					</a>
					<a href={process.env.NEXT_PUBLIC_YOUTUBE}>
					<motion.img 
					initial={{
						opacity:0,
						y:-70,
						x:70
					}}
					whileInView={{
						opacity:0.9,
						y:0,
						x:0
					}}
					transition={{
						duration:1
					}}
					src="https://cdn-icons-png.flaticon.com/512/124/124015.png" 
					className="h-14 w-14 rounded-xl group-hover:shadow-lg hover:shadow-lg shadow-orange-500 transition-all duration-100 ease-in-out cursor-pointer hover:opacity-1"/>
					</a>
				</div>
				<div className="flex flex-col gap-5  support-card-2">
					<a href={process.env.NEXT_PUBLIC_GITHUB}>
					<motion.img 
					initial={{
						opacity:0,
						y:70,
						x:-70
					}}
					whileInView={{
						opacity:0.9,
						y:0,
						x:0
					}}
					transition={{
						duration:1
					}}
					src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png" 
					className="h-14 w-14 rounded-xl group-hover:shadow-lg hover:shadow-lg shadow-orange-500 transition-all duration-100 ease-in-out cursor-pointer hover:opacity-1"/>
					</a>
					<a href={process.env.NEXT_PUBLIC_TWITTER}>
					<motion.img 
					initial={{
						opacity:0,
						y:70,
						x:70
					}}
					whileInView={{
						opacity:0.9,
						y:0,
						x:0
					}}
					transition={{
						duration:1
					}}
					src="https://cdn-icons-png.flaticon.com/512/124/124021.png" 
					className="h-14 w-14 rounded-xl group-hover:shadow-lg hover:shadow-lg shadow-orange-500 transition-all duration-100 ease-in-out cursor-pointer hover:opacity-1"/>
					</a>
				</div>

			</div>

			<div className="flex flex-col">
				<h4 className="text-4xl font-semibold text-white/80 text-center" >
					Having Queries?
					<br/>
					<span className="decoration-[#F7AB0A]/50 underline">Mail us to get support</span>
				</h4>
			</div>	

			<div className="space-y-10">
				<div className="flex items-center space-x-5 justify-center" >
					<MapPinIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
					<p className="text-2xl text-gray-300/70" >Madurai</p>
				</div>
				<div className="flex items-center space-x-5 justify-center" >
					<EnvelopeIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
					<p className="text-2xl text-gray-300/70" >xai360queries@gmail.com</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-2 w-fit mx-auto">
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2" >
						<input {...register('name')} placeholder="Name" className="contactInput"  type="text" />
						<input {...register('email')} placeholder="Email" className="contactInput"  type="email" />
					</div>
					<input {...register('subject')} placeholder="Subject" className="contactInput"  type="text" />

					<textarea {...register('message')} placeholder="Message" className="contactInput" />
					<button className="bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg">
						Submit	
					</button>
				</form>
				
			</div>


<br/><br/><br/>
		</div>

	)
}