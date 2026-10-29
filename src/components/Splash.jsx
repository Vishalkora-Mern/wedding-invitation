import {useEffect,useRef,useState} from 'react'
import {motion} from 'framer-motion'
import ProvidedArtwork from './art/ProvidedArtwork'
import ThemeImage from './art/ThemeImage'
import TempleEntrance from './art/TempleEntrance'
import useReducedMotion from '../hooks/useReducedMotion'
export default function Splash({data,guest,onOpen}){
 const button=useRef();const [musicEnabled,setMusicEnabled]=useState(true);const reduced=useReducedMotion();
 useEffect(()=>{const prev=document.body.style.overflow;document.body.style.overflow='hidden';button.current?.focus();return()=>{document.body.style.overflow=prev}},[]);
 return <motion.div className="splash" role="dialog" aria-modal="true" aria-label="Open wedding invitation" exit={{opacity:0}} transition={{duration:reduced?0:.85}}>
  <div className="splash-scene">
  <ProvidedArtwork data={data}/>
  <motion.div className="splash-content" initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:1.1}}>
   <ThemeImage asset={data.artwork.ganesha} name="ganesha" className="entry-ganesha"/><p lang="hi" className="ganpati-prayer">॥ श्री गणेशाय नमः ॥</p><p className="guest-greeting">{guest?`Dear ${guest},`:'You are warmly invited'}</p><p className="muted-gold entry-label">The Wedding Of</p>
   <h1 className="splash-names gold-text"><span>{data.couple.groom.name}</span><em>&</em><span>{data.couple.bride.name}</span></h1><div className="small-rule"/>
   <p className="entry-date">{new Date(data.weddingDate).toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'})}</p><p className="entry-city">{data.city}</p>
   <button ref={button} className="button gold-button" onClick={()=>onOpen(musicEnabled)}>Open Invitation <span aria-hidden="true">↗</span></button>
   {data.musicUrl&&<label className="music-choice"><input type="checkbox" checked={musicEnabled} onChange={e=>setMusicEnabled(e.target.checked)}/> Background music</label>}
  </motion.div><TempleEntrance data={data}/>
  </div>
 </motion.div>
}
