import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments?.map((comment) => {
    let commentText;

    if (comment.status === "approved") commentText = comment.content;

    if (comment.status === "pending")
      commentText = "This comment is awaiting moderation";

    if (comment.status === "rejected")
      commentText = "This comment was rejected";

    return <li key={comment?.id}>{commentText}</li>;
  });

  return <ul>{renderedComments}</ul>;
  // return <div> okay </div>;
};

export default CommentList;
