import { MdDelete } from "react-icons/md";
import { Comments } from "../types";

type Props ={
    data: Comments,
    del: (arg1:number)=>void
}

export default function UserPosts({data, del}:Props) {
  return (
    <div className=''>
        <div className='mb-5 text-white bg-[#49243E] shadow-md drop-shadow-md rounded-md p-10 m-5 relative '>
            <div onClick={()=>del(data.id)} className=" absolute right-1 top-2 cursor-pointer" ><MdDelete/></div>
            <h2 className='text-sm '><span className=' text-[1rem] font-bold pr-3'>Name- </span> {data.name}</h2>
            <h2 className='text-sm py-5'><span className=' text-[1rem] font-bold pr-3'>Email- </span> {data.email}</h2>
            <p className='text-sm py-5'><span className=' text-[1rem] font-bold pr-3'>Comments-</span> {data.body}</p>
        </div>
    </div>
  )
}
