import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { Posts, Comments } from "../types";

 
// Get Post
const fetchUsers = async(page:number)=>{
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    const res = await response.json();
    return res;
  }

 export function useGetPost(page:number){   
    return   useQuery<Posts[]>({
    queryKey:['posts', page],
    queryFn:()=>fetchUsers(page),
    
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false, 
    
  },
    )
}

 //Get post by id

 const fetchPost = async(id:string)=>{
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const res = await response.json();
    return res;
  }

export function useGetId(id:string){ 
    
    return useQuery<Posts>(
        {
            queryKey:['post',id],
            queryFn:()=>fetchPost(id),
            refetchOnWindowFocus: false,  
        },
    )

}

//Update Post

const putPost = async(post:Posts)=>{

   return await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PUT",
         body: JSON.stringify({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
   
}

export function useUpdatePost(post:Posts, id:string,  onSuccess:()=>void){
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ()=>putPost(post), 
    
      onMutate: (newPostInfo: Posts) => {
        queryClient.setQueryData(["post", id], () => newPostInfo  );    
      },
      onSuccess
     
    });
  
}



// Delete post

const deletePost = async(id:string)=>{
 await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
       method: "DELETE",
     });
   
}

export function useDeletePost(id:string, onSuccess:()=>void){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ()=>deletePost(id),
        onMutate: (id: string) => {
          queryClient.setQueryData(["post", id], () =>
             id    
          
          );  
        },
        onSuccess,
        
      });
    
}

// Fetch Comment

const fetchComment = async(id:string)=>{
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const res = await response.json();
    return res;
}

export function useFetchComment(id:string){

   return useQuery({
        queryKey:['post',id, 'comments'], 
        queryFn:()=>fetchComment(id),
      
        refetchOnWindowFocus: false, 
        
      },
    )
}

// Delete Comment

export function useDeleteComment(id:string){

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async(postId:number)=>{
          await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
            method:'DELETE'
          });
        },
        onMutate:(postId)=>{
            queryClient.setQueryData(['post',id, 'comments'], (prevPosts:Comments[])=>{
              return prevPosts?.filter((post:Comments)=> post.id !== postId)
            })
        },
      
    })
}