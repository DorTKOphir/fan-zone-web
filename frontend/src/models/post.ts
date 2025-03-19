import User from "./user";

interface Post {
    _id: string;
    content: string;
    author: User;
    dateCreated: string;
    likes: string[];
    comments: Comment[];
  }

export default Post;
