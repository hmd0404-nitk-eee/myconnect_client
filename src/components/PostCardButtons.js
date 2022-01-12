import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
  FETCH_ALL_POSTS_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../util/graphql";

function LikeButton({ id, likes, likesCount, user, noMargin = false }) {
  const [likedPost, setLikedPost] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLikedPost(true);
    } else setLikedPost(false);
  }, [likes, user]);

  const [likePostFunc] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeBtn = user ? (
    likedPost ? (
      <Button name="likebtn" variant="danger">
        <i className="fa fa-heart"></i>&nbsp;&nbsp;
        <span>Like</span>
      </Button>
    ) : (
      <Button name="likebtn" variant="outline-danger">
        <i className="fa fa-heart"></i>&nbsp;&nbsp;
        <span>Like</span>
      </Button>
    )
  ) : (
    <Button name="likebtn" variant="outline-danger" as={Link} to="/login">
      <i className="fa fa-heart"></i>&nbsp;&nbsp;
      <span>Like</span>
    </Button>
  );

  const btnStyle = noMargin ? {} : { marginRight: "0.7em" };

  return (
    <ButtonGroup
      style={btnStyle}
      onClick={() => {
        likePostFunc();
        var btns = document.getElementsByName("likebtn");
        btns.forEach((btn) => btn.blur());
      }}
    >
      {likeBtn}
      <Button variant="outline-danger" disabled>
        {likesCount}
      </Button>
    </ButtonGroup>
  );
}

function CommentButton({ id, commentsCount, redirectToSinglePostPage = false }) {
  let commentButton;
  
  if(redirectToSinglePostPage) {
    commentButton = (
      <ButtonGroup>
        <Button variant="outline-secondary" as={Link} to={`/posts/${id}`}>
          <i className="fa fa-comments-o"></i>&nbsp;&nbsp;
          <span>Comment</span>
        </Button>
        <Button variant="outline-secondary" disabled>
          {commentsCount}
        </Button>
      </ButtonGroup>
    );
  } else {
    commentButton = (
      <ButtonGroup>
        <Button variant="outline-secondary" as={Link} to={'/login'}>
          <i className="fa fa-comments-o"></i>&nbsp;&nbsp;
          <span>Login to Start Commenting!</span>
        </Button>
        <Button variant="outline-secondary" disabled>
          {commentsCount}
        </Button>
      </ButtonGroup>
    );
  }

  return commentButton;
}

function DeleteButton({ postId, commentId, showTxt = false, redirectHome = false, }) {
  const requiredMutation = commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const vars = commentId ? { postId: postId, commentId: commentId } : { postId: postId }

  const [deletePostOrComment] = useMutation(requiredMutation, {
    variables: vars,
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_ALL_POSTS_QUERY,
        });
        let newData = [...data.getPosts];
        newData = newData.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_ALL_POSTS_QUERY,
          data: { ...data, getPosts: { newData } },
        });
      }
    },
    onError(err) {
      console.log(err.graphQLErrors);
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleShowDeleteModal}
        style={{ marginLeft: "auto" }}
      >
        <i className="fa fa-trash-o"></i>
        {showTxt && <span style={{ marginLeft: "0.7em" }}>Delete Post</span>}
      </Button>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action cannot be reversed. Are you sure you want to delete the
          Post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseDeleteModal}>
            Go Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              deletePostOrComment();
              if (redirectHome) navigate("/");
              else handleCloseDeleteModal();
            }}
          >
            <i className="fa fa-times-circle"></i>&nbsp;&nbsp;
            <span>Delete</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { LikeButton, CommentButton, DeleteButton };
