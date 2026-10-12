import ThemeImage from './ThemeImage'
export default function ProvidedArtwork({data}) {
 return <div className="provided-artwork" aria-hidden="true"><div className="silk-texture"/>
  <img className="provided-hero-design" src={data.artwork.heroDesign} alt="" decoding="async" fetchPriority="high"/>
  <div className="provided-toran" style={{backgroundImage:`url("${data.artwork.toran}")`}}/>
  <div className="theme-hanging-lamp lamp-left"><ThemeImage asset={data.artwork.lamp} name="lamp"/><span className="lamp-glow lamp-flame"/></div>
  <div className="theme-hanging-lamp lamp-right"><ThemeImage asset={data.artwork.lamp} name="lamp"/><span className="lamp-glow lamp-flame"/></div>
  <ThemeImage asset={data.artwork.kolamBorder} name="kolam-border" className="theme-kolam-border kolam-border-left"/>
  <ThemeImage asset={data.artwork.kolamBorder} name="kolam-border" className="theme-kolam-border kolam-border-right"/>
 </div>
}
