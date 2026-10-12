import {Diya,KolamDivider} from './art/Artwork'
import ShareButton from './ShareButton'
export default function Footer({data}){return <footer className="footer"><div className="footer-diyas"><Diya/><Diya/><Diya/></div><p className="telugu" lang="te">మీ రాకకై ఎదురుచూస్తూ</p><h2 className="gold-text" lang="te">శుభమస్తు</h2><p>{data.blessings}</p><KolamDivider/><ShareButton data={data}/><p className="small muted-gold">{data.couple.groom.name} & {data.couple.bride.name} · {new Date(data.weddingDate).getFullYear()}</p></footer>}
