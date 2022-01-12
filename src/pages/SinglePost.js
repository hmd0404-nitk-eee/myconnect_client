import React, { useContext } from "react";
import {
  Card,
  Container,
  Col,
  Row,
  Spinner
} from "react-bootstrap";
import moment from "moment";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";

import { FETCH_POST_QUERY } from "../util/graphql";
import {
  LikeButton,
  CommentButton,
  DeleteButton,
} from "../components/PostCardButtons";
import { useQuery } from "@apollo/client";
import CommentsView from "../components/CommentsView";
import PostOrCommentForm from "../components/PostOrCommentForm";

function SinglePost() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams(); 
  
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: postId,
    },
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center w-100 align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner variant="primary" animation="border" />
      </div>
    );
  } else {
    const { getSinglePost: { body, username, id, createdAt, comments, commentsCount, likesCount, likes }} = data;

    return (
      <Container>
        <Row className="mb-4 mt-4" style={{ textAlign: "center" }}>
          <h1>{username}'s Post</h1>
        </Row>
        <Row>
          <Col lg={ user ? '8': '12'} md={ user ? '6': '12'} sm='12'>
            <Card border="dark">
              <Card.Body>
                <Card.Subtitle style={{ textDecoration: "none", marginBottom: "1em" }}>
                  {username} posted {moment(createdAt).fromNow()}
                </Card.Subtitle>
                <Card.Text>{body}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex">
                <LikeButton id={id} likes={likes} likesCount={likesCount} user={user} />
                {!user && <CommentButton id={id} commentsCount={commentsCount} />}
                {user && user.username === username && <DeleteButton postId={id} showTxt="true" redirectHome="true" />}
              </Card.Footer>
            </Card>
            <CommentsView postId={id} comments={comments} username={username} user={user} />
          </Col>
          <Col lg='4' md='6' sm='12'>
            { user && <PostOrCommentForm postId={id} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SinglePost;
