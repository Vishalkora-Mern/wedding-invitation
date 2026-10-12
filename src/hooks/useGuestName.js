import {useSearchParams} from 'react-router-dom'
export default function useGuestName(){const [p]=useSearchParams();return (p.get('to')||'').trim().slice(0,40)}
