import React from "react";

const CommentList = ({ comments }) => {
  console.log(comments);

  const renderedComments = comments?.map((comment) => {
    return <li key={comment?.id}>{comment?.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
  // return <div> okay </div>;
};

export default CommentList;
