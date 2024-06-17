export type Posts = {
    id: string;
    userId: string;
    title: string;
    body: string;
  };

  export type Comments ={
    postId:number,
    id:number,
    name:string,
    email:string,
    body:string
  }