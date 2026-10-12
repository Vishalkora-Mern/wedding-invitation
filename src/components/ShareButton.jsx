import {Share2} from 'lucide-react'
export default function ShareButton({data}){const text=`Join us to celebrate ${data.couple.groom.name} & ${data.couple.bride.name}! ${location.href}`;return <a className="button outline-button" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer"><Share2 size={16}/> Share on WhatsApp</a>}
