import GuestDetails from '../components/GuestDetails'
import {useRef,useState,lazy,Suspense} from 'react'
import {AnimatePresence} from 'framer-motion'
import {useParams,useSearchParams,Navigate} from 'react-router-dom'
import data from '../data/invitation'
import useGuestName from '../hooks/useGuestName'
import Splash from '../components/Splash'
import Hero from '../components/Hero'
import Couple from '../components/Couple'
import Countdown from '../components/Countdown'
import Journey from '../components/Journey'
const Gallery=lazy(()=>import('../components/Gallery'))
const Rsvp=lazy(()=>import('../components/Rsvp'))
const VideoSection=lazy(()=>import('../components/VideoSection'))
import Footer from '../components/Footer'
import MusicToggle from '../components/MusicToggle'
import Reveal from '../components/Reveal'
import {BananaLeaf} from '../components/art/Artwork'
export default function Invitation(){const {slug}=useParams();const guest=useGuestName();const [params]=useSearchParams();const [open,setOpen]=useState(false);const [demo,setDemo]=useState(params.get('demo')==='true');const content=useRef();const music=useRef();if(slug!==data.slug)return <Navigate replace to={`/invitation/${data.slug}${location.search}`}/>;return <><AnimatePresence onExitComplete={()=>content.current?.focus()}>{!open&&<Splash data={data} guest={guest} onOpen={enabled=>{if(enabled)music.current?.start();setOpen(true)}}/>}</AnimatePresence><div inert={!open?'':undefined} aria-hidden={!open||undefined} ref={content} tabIndex="-1">{demo&&<div className="preview-ribbon">Preview · Sample wedding details<button onClick={()=>setDemo(false)} aria-label="Dismiss preview">×</button></div>}<nav className="site-nav" aria-label="Invitation navigation"><a href="#home" className="monogram">{data.couple.groom.initial}<span>&</span>{data.couple.bride.initial}</a><div><a href="#celebrations">Celebrations</a><a href="#memories">Memories</a><a href="#rsvp">RSVP <span aria-hidden="true">↗</span></a></div></nav><Hero data={data} opened={open}/><main><Couple data={data}/><Countdown data={data}/><Journey data={data}/><GuestDetails data={data}/><section className="section feast"><Reveal><p className="section-kicker" lang="te">విందు భోజనం</p><h2>A Feast of Tradition</h2><p className="section-intro">Served with love, on a banana leaf.</p><BananaLeaf><div>{data.feast.map(dish=><span lang="te" key={dish}>{dish}</span>)}</div></BananaLeaf></Reveal></section><Suspense fallback={<div className="section">Loading memories?</div>}><Gallery data={data}/></Suspense><Suspense fallback={<div className="section">Loading RSVP?</div>}><Rsvp key={guest} data={data} guest={guest}/></Suspense><Suspense fallback={null}><VideoSection data={data}/></Suspense></main><Footer data={data}/><MusicToggle ref={music} data={data}/></div></>}
