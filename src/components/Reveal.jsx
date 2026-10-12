import {motion} from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'
export default function Reveal({children,className=''}){const r=useReducedMotion();return <motion.div className={className} initial={r?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:r?0:.55}}>{children}</motion.div>}
