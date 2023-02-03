import {useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import Header2 from './Header2';
import {currentUserState} from '../atoms/userAtom'







export default function TextComponent() {
  // body...
  const[prompt,setPrompt] = useState('');
  const [volume,setVolume] = useState(80);
  const [voice,setVoice] = useState('');
  const [languages,setLanguages] = useState([]);
  const [rate,setRate] = useState(70);
  const [pitch,setPitch] = useState(70);

  useEffect(()=>{
    if(window.SpeechSynthesis){
        setLanguages(window.speechSynthesis.getVoices());
    }
  },[])

  const speak = () => {
    const Speech = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    Speech.volume = volume/100;
    Speech.rate = rate/100;
    Speech.pitch = pitch/100;
    Speech.text = prompt;
    for(let i=0;i<voices.length;i++){
        if(voices[i].name === voice){
            Speech.voice = voices[i];
        }
    }
    window.speechSynthesis.speak(Speech);

  }


  return (
    <div 
  id="main"
  className="relative min-h-screen hidden scroll-smooth z-0 w-full bg-[#0C0C0C] overflow-x-hidden overflow-y-scroll">
      <div id="upperDesign" className="fixed w-[150px] animate-pulse md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-400/40 -top-[5%] -right-14 blur-2xl md:-right-20"/>
      <div id="lowerDesign" className="fixed w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full bg-yellow-500/40 -bottom-[5%] blur-2xl -left-14 md:-left-20"/>   
      <Header2 hide="true" redirect="texttospeech"/>
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
          initial={{
            opacity:0,
          }}
          whileInView={{
            opacity:1,
          }}
          transition={{
            duration:1
          }}
          className="h-full flex px-4 flex-col z-10 max-w-6xl mx-auto mt-[100px]
        scroll-smooth"> 
        <h1 className="text-4xl mb-3 text-[#FFF] text-shadow-fire mx-auto">Text to <span className="text-sky-500">Speech</span></h1>  
        <div className="h-[2px] w-[60%] md:w-[20%] mx-auto bg-orange-500 "/>
        <div 
        id="features_container"
        className="px-3 py-4 md:items-center flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-orange-400 w-full mt-7">
            <h1 className="text-xl text-[#FFF] font-semibold ml-3 whitespace-nowrap">Enter Text Here<span className="text-red-500">*</span></h1>
            <div 
            id="features_box"
            className="w-full h-[200px] md:h-[160px] md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-orange-500 flex-col">
                <textarea 
                value={prompt}
                placeholder="your text goes here"
                onChange={(e)=>setPrompt(e.target.value)}
                id="countries" className="border h-full outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 
                border-orange-600 placeholder-gray-400 resize-none
                text-white focus:ring-sky-500 focus:border-sky-500"/>
            </div>
        </div>
        <div className="w-full z-10 mt-5 rounded-xl px-2 py-2 flex">
            <div 
            id="voice_container"
            className="md:w-[50%] px-3 py-4 mx-auto flex md:flex-row flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
                <h1 className="text-xl text-[#FFF] font-semibold ml-3">Select Voice</h1>
                <div 
                id="voice_box"
                className="w-full md:ml-8 md:mt-0 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
                    <select 
                    value={voice}
                    onChange={(e)=>setVoice(e.target.value)}
                    id="countries" className="border cursor-pointer text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500 outline-none">
                      {
                        languages?.map((lang)=>(
                            <option key={lang.name} value={lang.name}>{lang.name}</option>
                        ))
                      }
                    </select>
                    
                </div>
            </div>
        </div>
        <div className="w-full z-10 mt-5 rounded-xl px-2 py-2 flex">
            <div 
            id="range_container"
            className="md:w-[50%] px-3 py-4 mx-auto flex flex-col border-l-2 border-gray-400 focus-within:border-sky-400 w-full">
                <h1 className="text-xl text-[#FFF] font-semibold ml-3">Volume</h1>
                <div 
                id="volume_box"
                className="w-full md:ml-8 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
                    <input type="range" 
                    value={volume}
                    min={0} max={100}
                    onChange={(e)=>setVolume(e.target.value)}
                    className="border cursor-pointer outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>
                    
                </div>
                <h1 className="text-xl text-[#FFF] mt-4 font-semibold ml-3">Rate</h1>
                <div 
                id="rate_box"
                className="w-full md:ml-8 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
                    <input type="range" 
                    value={rate}
                    min={0} max={100}
                    onChange={(e)=>setRate(e.target.value)}
                    className="border cursor-pointer outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>
                </div>
                <h1 className="text-xl text-[#FFF] mt-4 font-semibold ml-3">Pitch</h1>
                <div 
                id="pitch_box"
                className="w-full md:ml-8 mt-3 items-center flex px-3 py-2 rounded-xl border-[1px] border-gray-400 focus-within:border-sky-400 flex-col">
                    <input type="range" 
                    value={pitch}
                    min={0} max={100}
                    onChange={(e)=>setPitch(e.target.value)}
                    className="border cursor-pointer outline-none text-md rounded-lg block w-full p-2.5 bg-gray-700/60 border-orange-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"/>
                    
                </div>
            </div>
        </div>
        <center>
            <button onClick={()=>{if(prompt)speak();}} className={`mt-7 ${prompt ? "bg-green-600" : "bg-green-700/60" }
            w-[140px] mx-auto md:text-xl text-lg text-gray-300 tracking-[3px] px-3 py-2 rounded-full hover:bg-green-500/90 
            transition-all active:scale-90 duration-200 uppercase flex items-center justify-center font-mono ease-in-out`}>
                Speak                
            </button>
        </center>
      </motion.div>
      <div className="h-[1px] w-[80%] md:w-[70%] bg-gray-100 mt-10 mb-10 mx-auto"/>
      </div>


  )
}