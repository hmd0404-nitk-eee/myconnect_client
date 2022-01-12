import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import moment from "moment";

import { AuthContext } from "../context/auth";
import { CommentButton, LikeButton, DeleteButton } from "./PostCardButtons";

function PostCard(props) {
  const {
    post: { body, username, id, createdAt, commentsCount, likesCount, likes },
  } = props;

  const { user } = useContext(AuthContext);

  return (
    <Card border="primary" className="mt-3 mt-md-0 mb-1 mb-md-3">
      <Card.Body>
        <Card.Title>{username} posted</Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          as={Link}
          to={`/posts/${id}`}
          style={{ textDecoration: "none" }}
        >
          {moment(createdAt).fromNow()}
        </Card.Subtitle>
        <Card.Text className="mt-3">{body}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        <LikeButton id={id} likes={likes} likesCount={likesCount} user={user} />
        <CommentButton id={id} commentsCount={commentsCount} redirectToSinglePostPage={true} />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Footer>
    </Card>
  );
}

export default PostCard;
