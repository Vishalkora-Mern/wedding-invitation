import ThemeImage from './art/ThemeImage'
import {KolamDivider} from './art/Artwork'
import Reveal from './Reveal'
export default function Couple({data}){return <section className="section couple-section" id="couple">
 <ThemeImage asset={data.artwork.kolamCorner} name="couple-kolam" className="couple-kolam couple-kolam-left"/>
 <ThemeImage asset={data.artwork.kolamCorner} name="couple-kolam" className="couple-kolam couple-kolam-right"/>
 <Reveal><h2>The Couple</h2><p className="telugu section-kicker" lang="te">వధూవరులు</p><p className="section-intro">Two hearts. One beautiful beginning.</p>
 <figure className="shared-couple-portrait"><div className="shared-portrait-frame"><img src={data.couplePortrait} alt="The couple holding hands in traditional ivory and green attire beneath a flower-lined stone arch" loading="lazy" decoding="async" width="1024" height="1536"/></div><figcaption><span>{data.couple.groom.name}</span><em>&</em><span>{data.couple.bride.name}</span></figcaption><p className="shared-portrait-caption">Together with our families, we invite you to celebrate our beginning.</p></figure>
 <div className="couple-grid">{['groom','bride'].map((key,i)=>{const person=data.couple[key];return <article className={`couple-card couple-${key}`} key={key}>
  <div className="couple-card-copy"><p className="couple-role">{i?'The Bride':'The Groom'}</p><h3>{person.name}</h3><p lang="te" className="telugu couple-telugu-name">{person.teluguName}</p><div className="couple-family"><span>{i?'Daughter of':'Son of'}</span><p>{person.parents}</p></div></div>
 </article>})}<div className="couple-union" aria-hidden="true"><ThemeImage asset={data.artwork.lotus} name="couple-lotus"/><span>&</span></div></div><KolamDivider/>
 </Reveal></section>}
