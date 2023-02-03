import {RxCross2} from 'react-icons/rx'



export default function ConfirmBox({Visible,category,prompt,promotingProducts,productName,setVisible,generateNow}) {
	// body...



	return (
		<div className={`h-screen fixed relative w-full backdrop-blur-lg ${Visible ? "left-0 z-50":"left-[110%] z-0"} 
		transition-all duration-300 ease-in-out flex flex-col items-center justify-center overflow-hidden px-3 py-5`}>
			<div className="absolute top-[10%] cursor-pointer md:top-[15%] right-4 rounded-full p-2 hover:bg-gray-300/70 transition-all duration-200 ease-in-out bg-gray-600/70">
				<RxCross2 
				onClick={()=>setVisible(false)}
				className="md:h-7 h-5 md:w-7 w-5 text-gray-200"/>
			</div>
			<div className="w-[90%] flex flex-col px-5 py-5 rounded-xl border-[3px] border-slate-300/80">
				<h1 className="md:text-xl mt-[10px] mx-auto text-[#FFF] tracking-[px] text-lg font-mono">Confirm The Video Details</h1>
				<h1 className="text-xl text-sky-500 tracking-[3px] mt-10 font-semibold">Video Category</h1>
				<p className="text-md text-[#FFF] md:text-lg font-medium mt-2">{category}</p>
				<h1 className="text-xl text-orange-500 tracking-[3px] mt-7 font-semibold">Video About</h1>
				<p className="text-md text-[#FFF] md:text-lg font-medium mt-2">{prompt}</p>
				<h1 className="text-xl text-gray-300 tracking-[3px] mt-7 font-mono">Product Promotion</h1>
				{
					productName ?
					<p className="text-md md:text-lg text-gray-300 font-serif mt-2">{productName}</p>
					:
					<p className="text-md md:text-lg font-serif text-gray-500 mt-2">null</p>
				}
			</div>
			<button 
			onClick={()=>{setVisible(false);generateNow();}}
			className="text-xl font-medium tracking-[7px] bg-green-600 hover:bg-green-500 border-[1.5px] border-gray-200 uppercase 
			transition-all duration-200 ease-in-out px-3 py-2 text-[#FFF] mt-10 rounded-full">Confirm</button>
		</div>
	)
} 