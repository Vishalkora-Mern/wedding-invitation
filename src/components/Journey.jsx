import {MapPin,ArrowUpRight} from 'lucide-react'
import CeremonyIllustration from './art/CeremonyIllustration'
import Reveal from './Reveal'
function Description({text}){return text.split(/([\u0C00-\u0C7F][\u0C00-\u0C7F\s]*)/).map((part,index)=>/[\u0C00-\u0C7F]/.test(part)?<span key={index} lang="te">{part}</span>:part)}
export default function Journey({data}){
 return <section className="section journey" id="celebrations"><Reveal className="section-heading"><p className="section-kicker" lang="te">వేడుకలు</p><h2>The Wedding Journey</h2><p className="section-intro">Every ritual, a memory. Every moment, with you.</p></Reveal>
  <div className="timeline">{data.events.map((event,i)=><Reveal key={event.id} className={`event-row ${event.featured?'featured-event':''}`}><span className="timeline-dot"/><article className="event-card">
   {event.highlightLabel&&<p className="ceremony-highlight-label">{event.highlightLabel}</p>}
   <div className="event-top"><CeremonyIllustration type={event.iconKey}/><span className="event-number">0{i+1}</span></div><p lang="te" className="telugu event-telugu">{event.teluguTitle}</p><h3>{event.englishTitle}</h3>
   <p className="event-date">{new Date(`${event.date}T12:00:00+05:30`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'})} <span>·</span> {event.time}</p>
   <p className="event-description"><Description text={event.description}/></p>
   {event.rituals&&<div className="ritual-chips">{event.rituals.map(ritual=><span key={ritual}>{ritual}</span>)}</div>}
   <p className="event-venue"><MapPin size={15}/>{event.venue}</p><a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">View Map <ArrowUpRight size={16}/></a>
  </article></Reveal>)}</div>
 </section>
}
