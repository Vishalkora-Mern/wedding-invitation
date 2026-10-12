import ProvidedArtwork from './art/ProvidedArtwork'
import {motion} from 'framer-motion'
import {Namam,KolamDivider} from './art/Artwork'
import ThemeImage from './art/ThemeImage'
import TempleEntrance from './art/TempleEntrance'
import useReducedMotion from '../hooks/useReducedMotion'
function AnimatedName({children,opened,reduced}){return <span className="english-name">{Array.from(children).map((letter,i)=><motion.span key={i} initial={reduced?false:{opacity:0,y:12}} animate={opened||reduced?{opacity:1,y:0}:{opacity:0,y:12}} transition={{duration:1.15,delay:reduced?0:.6+i*.09}}>{letter}</motion.span>)}</span>}
export default function Hero({data,opened}){
 const date=new Date(data.weddingDate),reduced=useReducedMotion();
 return <header className="hero" id="home"><ProvidedArtwork data={data}/>
  {data.heroVideo&&!navigator.connection?.saveData&&<video className="hero-video" src={data.heroVideo} poster={data.heroPoster||undefined} autoPlay loop muted playsInline/>}
  
  <motion.div className="arch-frame" initial={reduced?false:{opacity:0}} animate={{opacity:opened||reduced?1:0}} transition={{duration:.8,delay:reduced?0:.3}}>
   <ThemeImage asset={data.artwork.balaji} name="balaji" className="hero-balaji"/><div className="prayer"><Namam/><span lang="te">ఓం నమో వేంకటేశాయ</span><Namam/></div><p lang="te" className="telugu invitation-title">శుభ లగ్న పత్రిక</p>
   <p className="muted-gold small">With the blessings of our families</p>
   <h1><span lang="te" className="gold-text telugu">{data.couple.groom.teluguName}</span><AnimatedName opened={opened} reduced={reduced}>{data.couple.groom.name}</AnimatedName><span className="name-diamond" aria-hidden="true">&</span><span lang="te" className="gold-text telugu">{data.couple.bride.teluguName}</span><AnimatedName opened={opened} reduced={reduced}>{data.couple.bride.name}</AnimatedName></h1>
   <p className="hero-invite">{data.invitationLine}</p><div className="hero-date"><span>{date.toLocaleDateString('en-IN',{month:'long',timeZone:'Asia/Kolkata'})}</span><strong>{date.toLocaleDateString('en-IN',{day:'2-digit',timeZone:'Asia/Kolkata'})}</strong><span>{date.toLocaleDateString('en-IN',{year:'numeric',timeZone:'Asia/Kolkata'})}</span></div>
   <p className="muted-gold">{date.toLocaleDateString('en-IN',{weekday:'long',timeZone:'Asia/Kolkata'})} · {data.muhurtham}</p><p className="hero-venue">{data.venue.name}<br/><span className="small">{data.city}</span></p><a href="#guest-details" className="hero-guest-link">Venue & guest details <span aria-hidden="true">&#8599;</span></a><KolamDivider/>
  </motion.div><TempleEntrance data={data}/><a className="discover" href="#couple">Our celebration <span aria-hidden="true">↓</span></a>
 </header>
}
