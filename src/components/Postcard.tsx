import { Link } from 'react-router-dom'
import { Posts } from '../types'

export default function Postcard({result}: {result:Posts}) {

  return (
    <div >
        <Link to={`/${result.id}`}>
            <div className=' border-b-[1px]  flex items-center gap-[4em] sm:gap-[10em] cursor-pointer py-[1.5em] p-1  px-[2em] hover:bg-[#704264] transition-all hover:text-black'>
            <h3> {result.id}</h3>
            <h3> {result.title}</h3>
            
        </div>
        </Link>
        
    </div>
  )
}
