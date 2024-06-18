import Postcard from '../components/Postcard';
import {useState } from "react";
import { useGetPost } from '../queries/queryHook';


export default function Home() {

  const [pageNumber, setPageNumber] = useState(1)

   const handlePrevPage =()=>{
    window.scrollTo({top:0, behavior:"smooth"})

    if (pageNumber >1){
      setPageNumber(prev=>prev-1)
    }
    
  }

  const handleNextPage =()=>{
      setPageNumber(prev=>prev+1)
      window.scrollTo({top:0, behavior:"smooth"})  
  }

  const {data, isLoading}=  useGetPost(pageNumber)
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.scrollTo({top:0, behavior:"smooth"})  
    setPageNumber(Number(e.target.value));
  };

    
    if(isLoading){
      return  <h2 className='text-3xl font-bold absolute top-[50%] left-[40%]'>Loading...</h2>
    }

  return (
    <div className=" h-[100%] m-0">
      <h1 className="text-center text-2xl p-5 ">Post Application</h1>
      <div className=' bg-[#49243E] w-[70%]  shadow-lg mx-auto drop-shadow-md p-3 rounded text-white'>
        <div className="flex items-center gap-[8em] sm:gap-[10em] mt-5 border-b-2">
          <h2>UserId</h2>
          <h2>Post Title</h2>
        </div>
        {
          data?.map((item)=>{
           return <div key={item.id}>
              <Postcard result={item}/>
            </div>
          })
        }
      </div>

      <div className='flex items-center w-[100%] justify-center  sm:justify-evenly' >
        <div>
          <select onChange={handleSelectChange} className='border-2 border-[#49243E] outline-none w-2em rounded p-2'>
            {new Array(10).fill('-').map((_, index)=>{
              return <option value={index+1} key={index}>{index+1 }</option>
            })}
          </select>
          
        </div>
        <div className="flex gap-[2em] items-center justify-center m-5">
          <button onClick={handlePrevPage} disabled={pageNumber===1}  className='border-[#49243E] border-2 p-2 rounded'>Prev</button>
          <button onClick={handleNextPage} disabled={pageNumber===10}  className='border-[#49243E] border-2 p-2 rounded'>Next</button>
        </div>
      </div>
    </div>
  )
}
