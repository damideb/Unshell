import { Link, useParams } from 'react-router-dom'
import UserPosts from '../components/userPosts';
import { toast } from "react-toastify";
import { useGetId, useDeletePost, useDeleteComment, useFetchComment } from '../queries/queryHook';
import { Comments } from '../types';

export default function Post() {

  type Params = {
    id: string;
}

  const {id}  = useParams() as Params

  const onSuccess =()=>{
    toast.success('Post Deleted Succesfully')
  }

  const handleDelete = (postId:number)=>{
      commentMutate(postId)
  }


  const {data:User, isLoading:isUserLoading}=  useGetId(id)

  const {data:Post, isLoading:isPostLoading}=  useFetchComment(id)

  const {mutate}= useDeletePost(id, onSuccess)

  const {mutate:commentMutate} = useDeleteComment(id)

  

  if(isPostLoading || isUserLoading){
  return <h2 className='text-3xl font-bold absolute top-[50%] left-[40%]'>Loading...</h2>
  }


  return (
   
  <div className=''>

      {
        User?.title &&

        <div className='bg-[#49243E] w-[90%] mx-auto my-5 rounded mb-5 p-10 text-white shadow-sm drop-shadow-sm'>

        <div className='flex gap-5 mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>UserId</h2>
            <h2 className='text-[0.9rem]'>{User?.id}</h2>
        </div>

        <div className='flex gap-5 mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>Post title</h2>
            <h2 className='text-[0.9rem]'>{User?.title}</h2>
        </div>

        <div className='flex gap-5 mb-2'>
            <h2 className='font-bold text-[1.1rem] basis-[10%]'>Post</h2>
            <h2 className='text-[0.9rem]'>{User?.body}</h2>
        </div>

        <div className=' flex justify-center gap-10 my-5'>
          <button 
            onClick={()=>mutate(id)}
            className='border-[#704264] border-2 p-2 rounded'
            >Delete Post</button>
            <Link to={`/${id}/edit`}>
              <button
                className='border-[#704264] border-2 p-2 rounded'
              > Edit Post</button>
            </Link>
        </div>
        
        </div>
      }
       

    <div className='my-10'> 
      <h1 className='text-2xl text-center my-3'>Post Comments</h1>
      <div className='grid md:grid-cols-2 w-full'>
       
        {
          Post?.map((item:Comments)=>{
            return <div key={item.id}>
               <UserPosts data={item} del={handleDelete}/>
             </div>
          })
      }
      
      </div>
      </div>
    </div>
  )
}
