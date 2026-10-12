import {useEffect,useState} from 'react'
export default function useCountdown(date){const [now,setNow]=useState(Date.now());useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[]);const s=Math.max(0,Math.floor((new Date(date).getTime()-now)/1000));return {done:s===0,values:[Math.floor(s/86400),Math.floor(s/3600)%24,Math.floor(s/60)%60,s%60]}}
