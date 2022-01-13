import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";

import { DeleteButton } from "./PostCardButtons";

function CommentCard({
  postId,
  comment,
  isUserComment = false,
  isUserLoggedIn = false,
}) {
  let commentCard;

  commentCard = isUserComment ? (
    <div className="d-flex flex-row-reverse mt-3">
      <Card variant="dark" className="w-75">
        <Card.Body>
          <Card.Title className="mb-3" style={{ textDecoration: "none" }}>
            {comment.username} replied {moment(comment.createdAt).fromNow()}
          </Card.Title>
          <div className="d-flex">
            <Card.Text>{comment.body}</Card.Text>
            {isUserLoggedIn && (
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                <DeleteButton postId={postId} commentId={comment.id} />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div className="d-flex mt-3">
      <Card variant="light" className="w-75">
        <Card.Body>
          <Card.Title className="mb-3" style={{ textDecoration: "none" }}>
            {comment.username} commented {moment(comment.createdAt).fromNow()}
          </Card.Title>
          <div className="d-flex">
            <Card.Text>{comment.body}</Card.Text>
            {isUserLoggedIn && (
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                <DeleteButton postId={postId} commentId={comment.id} />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  return commentCard;
}

function CommentsView({ postId, comments, username, user }) {
  let commentsView;
  const rightSidedComment = (comment, id) => (
    <CommentCard comment={comment} isUserComment={true} key={id} />
  );
  const leftSidedComment = (comment, id) => (
    <CommentCard comment={comment} key={id} />
  );
  const rightSidedCommentLoggedIn = (comment, id) => (
    <CommentCard
      comment={comment}
      isUserComment={true}
      isUserLoggedIn={true}
      postId={postId}
      key={id}
    />
  );
  const leftSidedCommentLoggedIn = (comment, id) => (
    <CommentCard
      comment={comment}
      isUserLoggedIn={true}
      postId={postId}
      key={id}
    />
  );
  
  if (Object.keys(comments).length > 0) {
    if (user) {
      commentsView = comments.map((comment, id) =>
        comment.username === username
          ? comment.username === user.username
            ? rightSidedCommentLoggedIn(comment, id)
            : rightSidedComment(comment, id)
          : comment.username === user.username
          ? leftSidedCommentLoggedIn(comment, id)
          : leftSidedComment(comment, id)
      );
    } else {
      commentsView = comments.map((comment, id) =>
        comment.username === username
          ? rightSidedComment(comment, id)
          : leftSidedComment(comment, id)
      );
    }
  } else {
    commentsView = (
      <Card className="mt-3">
        <Card.Body>
          <Card.Text>No Comments Yet!</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  commentsView = (<div style={{marginBottom: "3em"}}>{commentsView}</div>)

  return commentsView;
}

export default CommentsView;
