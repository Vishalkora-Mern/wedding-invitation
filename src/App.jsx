import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Invitation from './pages/Invitation'
import data from './data/invitation'
export default function App(){return <BrowserRouter><Routes><Route path="/" element={<Navigate replace to={`/invitation/${data.slug}${location.search}`}/>}/><Route path="/invitation/:slug" element={<Invitation/>}/><Route path="*" element={<Navigate replace to="/"/>}/></Routes></BrowserRouter>}
