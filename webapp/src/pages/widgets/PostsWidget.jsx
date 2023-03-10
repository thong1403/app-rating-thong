import { useEffect } from "react";
import { useState } from "react";
import { format, render, cancel, register } from 'timeago.js';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import { setNewpost ,setInteractive, setComments } from "../../state/index";

import { setTrueFalse } from "../../state/index";
import PostWidget from "./PostWidget";
import PostNew from "./PostNew";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const newpost = useSelector((state) => state.newpost);
  const { id } = useSelector((state) => state.iduser);
  const iduser = useSelector((state) => state.iduser);
  const isProfile = useSelector((state) => state.isProfile);
  const interactive = useSelector((state) => state.interactive);
  const comments = useSelector((state) => state.comments)
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const response = await fetch("http://127.0.0.1:5000/blog", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.data }));
  };

  const getUserpost = async () => {
    const response = await fetch(`http://127.0.0.1:5000/blog/${id}`, {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // console.log(data.data);
    dispatch(setPosts({ posts: data.data }));
  };

  const getInteractive = async () => {
    const response = await fetch("http://127.0.0.1:5000/interactive", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setInteractive({ interactive: data.data }));
  };

  const getComment = async() => {
    const response = await fetch("http://127.0.0.1:5000/comment", {
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch(setComments({ comments: data.data }));
  }

  useEffect(() => {
    if (isProfile) {
      // console.log("aa");
      getUserpost();
      getInteractive();
      getComment()
    } else {
      // console.log("bb");
      getPosts();
      getInteractive();

      getComment()
    };
    dispatch(setNewpost([]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // let result = posts.map((e) => {
  //   let arr = users.find((e1) => {
  //     return e1.id === e.userId;
  //   });
  //   let like = interactive.filter((e2) => e2.blogId == e.id )

  //   return like;
  // });
  // let like = posts.map((e) => {
  //   let post = interactive.find((e2) => {
  //     return e.blogId === e2.id;
  //   });
  //   return post;
  // })
  // console.log(result);
  // console.log(like);
  // console.log(posts);
  // console.log(users);
  // console.log(newpost);
  // console.log(isProfile);
  // console.log(interactive);
  // console.log(comments);
  return (
    <>
      {newpost != undefined ?
        newpost.map((e,i) => {
          let like = interactive.filter((e2) => e2.blogId == e.id && e2.usernameLikes != "" );
          let dislike = interactive.filter((e2) => e2.blogId == e.id && e2.usernameDislikes != "" );
          let command = comments.filter((e2)=> e2.blogId == e.id)
          let postviews = {blog:e, arrUsers:iduser, likes:like, dislikes:dislike, command:command};
          return <PostNew key={i} newpost={postviews} />
      })
      :
      ""}
      {isProfile ? 
        posts.map((e,i) => {
          let like = interactive.filter((e2) => e2.blogId == e.id && e2.usernameLikes != "" );
          let dislike = interactive.filter((e2) => e2.blogId == e.id && e2.usernameDislikes != "" );
          let command = comments.filter((e2)=> e2.blogId == e.id)
          let postviews = {blog:e, arrUsers:iduser, likes:like, dislikes:dislike, command:command};
          return <PostWidget key={i}
           postview={postviews}
            />;
        }) 
      :
        posts.map((e,i) => {
          let arrUser = users.find((e1) => {
            return e1.id === e.userId;
          });
          let like = interactive.filter((e2) => e2.blogId == e.id && e2.usernameLikes != "" );
          let dislike = interactive.filter((e2) => e2.blogId == e.id && e2.usernameDislikes != "" );
          let command = comments.filter((e2)=> e2.blogId == e.id)
          let postviews = {blog:e, arrUsers:arrUser, likes:like, dislikes:dislike, command:command};
          return <PostWidget key={i}
           i={i}
           postview={postviews}
           />;
        })
      }
      {/* <PostWidget /> */}
    </>
  );
};

export default PostsWidget;
