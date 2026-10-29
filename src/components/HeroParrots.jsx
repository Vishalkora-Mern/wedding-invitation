import {useEffect,useState} from 'react'
import ThemeImage from './art/ThemeImage'
import useReducedMotion from '../hooks/useReducedMotion'

export default function HeroParrots({data,opened}){
 const reduced=useReducedMotion()
 const [landed,setLanded]=useState(false)
 const [assetsReady,setAssetsReady]=useState(false)
 const parrots=data.artwork.parrots
 const duration=Math.max(.8,Math.min(6,parrots?.flightSeconds||3.6))
 useEffect(()=>{
  if(!parrots?.enabled)return
  let cancelled=false
  const sources=[parrots.perched?.src,...(reduced?[]:[parrots.flying?.src])].filter(Boolean)
  Promise.all(sources.map(src=>{
   const image=new Image();image.src=src
   return image.decode().catch(()=>{})
  })).then(()=>{if(!cancelled)setAssetsReady(true)})
  return()=>{cancelled=true}
 },[parrots,reduced])
 useEffect(()=>{
  if(!opened||landed||!assetsReady)return
  if(reduced){setLanded(true);return}
  const timer=setTimeout(()=>setLanded(true),(duration+1.8)*1000)
  return()=>clearTimeout(timer)
 },[opened,reduced,landed,duration,assetsReady])
 if(!parrots?.enabled||!parrots.flying||!parrots.perched)return null
 const stage=!opened?'waiting':landed||reduced?'settled':'arriving'
 return <div className={`hero-parrots is-${stage}${!assetsReady&&!reduced?' is-loading':''}`} data-stage={stage} aria-hidden="true" style={{'--parrot-flight-duration':`${duration}s`}}>
  {['left','right'].map(side=><div key={side} className={`parrot-spot parrot-spot-${side}`}>
   {!landed&&!reduced&&<div className="parrot-flight"><div className="parrot-flight-art"><ThemeImage asset={parrots.flying} name="parrot-flying"/></div></div>}
   <div className="parrot-rest"><div className="parrot-idle"><div className="parrot-perch-art"><ThemeImage asset={parrots.perched} name="parrot-perched"/></div></div></div>
  </div>)}
 </div>
}
