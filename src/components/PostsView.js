import React, { useState } from "react";
import { Row, Col, Spinner, Fade } from "react-bootstrap";

import PostCard from "../components/PostCard";

function PostsView({ loading, postsData }) {
  const [showCard, setShowCard] = useState(false);

  setTimeout(() => setShowCard(true),500);
  return (
    <Row lg="2" md="1" sm="1">
      {loading ? (
        <div
          className="d-flex justify-content-center w-100 align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner variant="primary" animation="border" />
        </div>
      ) : (
        postsData.getPosts && 
        postsData.getPosts.map((post, id) => (
          <Fade in={showCard} key={id}>
            <Col key={post.id}>
              <PostCard post={post} />
            </Col>
          </Fade>
        ))
      )}
    </Row>
  );
}

export default PostsView;
