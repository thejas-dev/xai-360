import {RxCross2} from 'react-icons/rx'



export default function InfoBox({Heading,Description,Visible,setVisible}) {
	// body...


	return (
		<div className={`h-screen fixed relative w-full backdrop-blur-lg ${Visible ? "left-0 z-50":"left-[110%] z-0"} 
		transition-all duration-300 ease-in-out flex items-center justify-center`}>
			<div className="absolute top-[10%] cursor-pointer md:top-[15%] right-4 rounded-full p-2 hover:bg-gray-300/70 transition-all duration-200 ease-in-out bg-gray-600/70">
				<RxCross2 
				onClick={()=>setVisible(false)}
				className="md:h-7 h-5 md:w-7 w-5 text-gray-200"/>
			</div>
			<div className="w-[90%] flex flex-col px-3 py-5 rounded-xl border-[3px] border-slate-500/80">
				<h1 className="text-xl text-gray-200 font-mono uppercase">{Heading}</h1>
				<p className="md:text-lg text-md text-gray-300 font-serif mt-5">{Description}</p>
			</div>
		</div>

	)
}