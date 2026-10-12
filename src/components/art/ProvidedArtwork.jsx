export default function ProvidedArtwork({data}) {
 return <div className="provided-artwork" aria-hidden="true">
  <img className="provided-hero-design" src={data.artwork.heroDesign} alt="" decoding="async" fetchPriority="high"/>
  {data.artwork.heroRightSide&&<img className="provided-hero-right" src={data.artwork.heroRightSide} alt="" decoding="async"/>}
  <div className="provided-toran" style={{backgroundImage:`url("${data.artwork.toran}")`}}/>
 </div>
}
