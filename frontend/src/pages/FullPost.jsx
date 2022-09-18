import React from "react";



import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
const [isLoading, setIsLoading] = React.useState(true)
const [data, setData] = React.useState()
const {id} = useParams()

React.useEffect(() => {
  axios.get(`/posts/${id}`).then(res => {
    setData(res.data)
    setIsLoading(false)
  }).catch(err => {
    console.log(err)
    alert('Something went wrong')
  })
}, [])

if(isLoading) {
  return <Post isLoading={isLoading} isFullPost />
}

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        createdAt={data.createdAt}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
       <ReactMarkdown children={data.text} /> 
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Vasya",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "this is anohter text comment",
          },
          {
            user: {
              fullName: "Vanya",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
