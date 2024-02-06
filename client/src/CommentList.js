import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments?.map((comment) => {
    return <li key={comment?.id}>{comment?.content}</li>;
  });

  let comment;

  if (comments.status === "approved") comment = comments.status;

  if (comment.status === "pending")
    comment = "This comment is awaiting moderation";

  if (comment.status === "rejected") comment = "This comment was rejected";

  return <ul>{renderedComments}</ul>;
  // return <div> okay </div>;
};

export default CommentList;
