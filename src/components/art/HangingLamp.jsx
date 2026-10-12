import {useId} from 'react'
export default function HangingLamp({className=''}){
 const id=useId().replace(/:/g,'');
 return <svg className={`hanging-lamp ${className}`} aria-hidden="true" viewBox="0 0 120 300"><defs><linearGradient id={id}><stop stopColor="#735019"/><stop offset=".24" stopColor="#e8bc5c"/><stop offset=".43" stopColor="#fff2b2"/><stop offset=".57" stopColor="#c69738"/><stop offset=".8" stopColor="#f2d688"/><stop offset="1" stopColor="#8d611e"/></linearGradient><radialGradient id={`${id}-halo`}><stop stopColor="#ffd77a" stopOpacity=".22"/><stop offset="1" stopColor="#ffd77a" stopOpacity="0"/></radialGradient></defs>
  <ellipse cx="60" cy="202" rx="55" ry="65" fill={`url(#${id}-halo)`}/>
  <g fill="none" stroke={`url(#${id})`} strokeWidth="2.2">{Array.from({length:16},(_,i)=><ellipse key={i} cx="60" cy={i*9+4} rx="3" ry="6"/>)}<path d="M60 142Q54 151 60 159M60 157L34 195M60 157l26 38"/></g>
  <g fill={`url(#${id})`} stroke="#c7983d" strokeWidth=".8"><path d="M48 163q12-8 24 0l6 10H42Z"/><ellipse cx="60" cy="175" rx="21" ry="4"/><path d="M48 177h24l-5 30H53Z"/><path d="M20 209q40 14 80 0q-4 26-40 27q-35-1-40-27Z"/><ellipse cx="60" cy="209" rx="42" ry="7"/><path d="M53 235h14l4 14H49Z"/><ellipse cx="60" cy="251" rx="20" ry="5"/><path d="M56 253h8l-1 12h-6Z"/><path d="M60 265q-10 15 0 22q10-7 0-22"/></g>
  <path d="M30 215q30 9 60 0M38 222q22 7 44 0M52 182h16M53 190h14" fill="none" stroke="#fff0a3" strokeWidth="1.2"/>
  {[29,60,91].map((x,i)=><g key={x}><path className="lamp-flame" style={{transformOrigin:`${x}px 207px`,animationDelay:`-${i*.8}s`}} d={`M${x} 179q-12 16 0 28q12-12 0-28`} fill="#ffe8a3"/><path d={`M${x} 194q-5 7 0 12q5-5 0-12`} fill="#ffaf28"/><path d={`M${x} 207v4`} stroke="#542314" strokeWidth="2"/></g>)}
 </svg>
}
