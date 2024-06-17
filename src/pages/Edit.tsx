import { useGetId, useUpdatePost } from "../queries/queryHook"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Posts } from "../types";

export default function Edit() {

  const [post, setPost] = useState<Posts | undefined>()

  type Params = {
    id: string;
}

  const {id} = useParams() as Params

  const{ data, isLoading, isFetching} = useGetId(id)

  const datasubmit = {
    id: post?.id,
    title:post?.title,
    body:post?.body,
    userId:post?.userId
   }

  const {mutate} = useUpdatePost(post, id)


  useEffect(()=>{

    setPost(data)
    
  },[data])
 


  const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    const update = {  ...post, [name]:value}
    setPost(update)
  }

  const handleSubmit =  ()=>{
     mutate(datasubmit)

  }


  const isDataChanged = () => {
    return (
    JSON.stringify(post) ===JSON.stringify(data)
    );
  };

  if(isLoading || isFetching){
    return <h2 className='text-3xl font-bold absolute top-[50%] left-[40%]'>Loading...</h2>
  }

 
  return (
    <div className="">

      <div className="m-5 ">
        <div className='flex  mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>UserId</h2>
            <h2 className='text-[0.9rem]'>{data?.id}</h2>
        </div>

        <div className='flex  mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>Post title</h2>
            <h2 className='text-[0.9rem]'>{data?.title}</h2>
        </div>

        <div className='flex  mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>Post</h2>
            <h2 className='text-[0.9rem]'>{data?.body}</h2>
        </div>
      </div>

      <div className="my-[2em] w-[70%] mx-auto text-white bg-[#49243E] shadow-md drop-shadow-md grid text-center p-3 rounded">
        <h2 className="text center my-10 text-xl font-bold border-b-2 border-white">Edit Post</h2>

        <div className="mb-[1em]">
         <label htmlFor="id" className="p-2 block font-bold">UserId</label> 
         <input className="w-[50%] p-2 text-black" value={post?.id ||''} name="id" id="id" onChange={handleChange}/>
        </div>

     
        <div className="mb-[1em]">
         <label className="p-2 block font-bold" htmlFor="title">Post Title</label> 
         <input className="w-[50%] p-2 text-black" value={post?.title ||''} name="title" id="title" onChange={handleChange}/>
        </div>

        <div className="mb-[1em]">
         <label className="p-2 block font-bold" htmlFor="post">Post</label> 
         <textarea  className="w-[50%] p-2 text-black" value={post?.body ||''} name="body" id="post" onChange={handleChange}/>
        </div>
        <button  onClick={handleSubmit} className='border-[#704264] w-[50%] mx-auto border-2 p-2 rounded disabled:cursor-not-allowed' disabled={isDataChanged() || isLoading }>Submit</button>
        </div>
    </div>
  )
}
