import {useEffect,useRef,useState} from 'react'
import {motion} from 'framer-motion'
import ProvidedArtwork from './art/ProvidedArtwork'
import {Ganesha,WeddingScene} from './art/TempleScene'
import useReducedMotion from '../hooks/useReducedMotion'
export default function Splash({data,guest,onOpen}){
 const button=useRef();const [musicEnabled,setMusicEnabled]=useState(true);const reduced=useReducedMotion();
 useEffect(()=>{const prev=document.body.style.overflow;document.body.style.overflow='hidden';button.current?.focus();return()=>{document.body.style.overflow=prev}},[]);
 return <motion.div className="splash" role="dialog" aria-modal="true" aria-label="Open wedding invitation" exit={{opacity:0}} transition={{duration:reduced?0:.85}}>
  <ProvidedArtwork data={data}/>
  <motion.div className="splash-content" initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:1.1}}>
   <Ganesha/><p lang="te">శ్రీ గణేశాయ నమః</p><p className="guest-greeting">{guest?`Dear ${guest},`:'You are warmly invited'}</p><p className="muted-gold entry-label">The Wedding Of</p>
   <div className="splash-names gold-text">{data.couple.groom.name}<em>&</em>{data.couple.bride.name}</div><div className="small-rule"/>
   <p className="entry-date">{new Date(data.weddingDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'})}</p><p className="entry-city">{data.city}</p>
   <button ref={button} className="button gold-button" onClick={()=>onOpen(musicEnabled)}>Open Invitation <span aria-hidden="true">↗</span></button>
   {data.musicUrl&&<label className="music-choice"><input type="checkbox" checked={musicEnabled} onChange={e=>setMusicEnabled(e.target.checked)}/> Background music</label>}
  </motion.div><WeddingScene/>
 </motion.div>
}
