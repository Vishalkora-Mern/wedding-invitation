import HangingLamp from './HangingLamp'
export default function ProvidedArtwork({data}) {
 return <div className="provided-artwork" aria-hidden="true"><div className="silk-texture"/>
  <img className="provided-hero-design" src={data.artwork.heroDesign} alt="" decoding="async" fetchPriority="high"/>
  <div className="provided-toran" style={{backgroundImage:`url("${data.artwork.toran}")`}}/>
  <HangingLamp className="lamp-left"/><HangingLamp className="lamp-right"/>
 </div>
}
