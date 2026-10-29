import Reveal from './Reveal'
import ThemeImage from './art/ThemeImage'
import {KolamDivider} from './art/Artwork'

export default function WeddingStories({data}){
 return <>
  <section className="section traditions-section" id="traditions" aria-labelledby="traditions-heading">
   <Reveal><p className="section-kicker">Rooted in love and tradition</p><h2 id="traditions-heading">Sacred Wedding Traditions</h2><p className="section-intro">Meaningful rituals. A beautiful beginning.</p></Reveal>
   <div className="tradition-grid">{data.traditions.map((ritual,i)=><Reveal className="tradition-card" key={ritual.title}><div className="tradition-photo"><img src={ritual.image} alt={ritual.alt} style={{objectPosition:ritual.position}} loading="lazy" decoding="async"/><span aria-hidden="true">0{i+1}</span></div><div className="tradition-copy"><p className="story-eyebrow">{ritual.subtitle}</p><h3>{ritual.title}</h3><p>{ritual.description}</p></div></Reveal>)}</div>
   <KolamDivider/>
  </section>
  <section className="section family-section" id="family-blessings" aria-labelledby="family-heading">
   <Reveal className="family-panel"><div className="family-photo"><img src={data.familyBlessings.image} alt={data.familyBlessings.alt} loading="lazy" decoding="async"/><span>With our families’ love</span></div><div className="family-copy"><ThemeImage asset={data.artwork.lotus} name="family-lotus" className="family-lotus"/><p className="story-eyebrow">Two families, one celebration</p><h2 id="family-heading">With Our Families’ Blessings</h2><p className="family-message">{data.familyBlessings.message}</p><div className="family-names">{['groom','bride'].map((key,i)=><div key={key}><span>{i?'Family of the bride':'Family of the groom'}</span><p>{data.couple[key].parents}</p></div>)}</div><p className="family-closing">{data.familyBlessings.closing}</p></div></Reveal>
  </section>
  <section className="section our-story-section" id="our-story" aria-labelledby="story-heading">
   <Reveal><p className="section-kicker">Little moments, lasting memories</p><h2 id="story-heading">Our Story</h2><p className="section-intro">Every forever has a first chapter.</p></Reveal>
   <div className="story-chapters">{data.story.map(chapter=><Reveal className="story-chapter" key={chapter.chapter}><div className="story-photo"><img src={chapter.image} alt={chapter.alt} style={{objectPosition:chapter.position}} loading="lazy" decoding="async"/></div><div className="story-copy"><span className="story-number">{chapter.chapter}</span><p className="story-eyebrow">{chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.description}</p></div></Reveal>)}</div><KolamDivider/>
  </section>
 </>
}
