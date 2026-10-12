// Frame the visible artwork without changing the supplied PNG file.
export default function ThemeImage({asset,className='',name=''}){
 if(!asset?.src)return null
 const [width,height]=asset.size
 const [x,y,cropWidth,cropHeight]=asset.crop||[0,0,width,height]
 return <svg className={`theme-image ${className}`} data-artwork={name} aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox={`${x} ${y} ${cropWidth} ${cropHeight}`}><image href={asset.src} width={width} height={height}/></svg>
}
