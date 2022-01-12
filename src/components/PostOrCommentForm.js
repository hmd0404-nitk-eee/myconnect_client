import React, { useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";

import { useMutation } from "@apollo/client";

import { CREATE_COMMENT_MUTATION, CREATE_POST_MUTATION, FETCH_ALL_POSTS_QUERY, FETCH_POST_QUERY } from "../util/graphql";
import { useFormHooks } from "../util/formHooks";
import ErrorsToast from "./ErrorsToast";

function PostOrCommentForm({ postId }) {
  const { onSubmit, onChange, values } = useFormHooks(createPostOrCommentCallback, {
    postId: postId ? postId : "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const requiredMutation = postId ? CREATE_COMMENT_MUTATION : CREATE_POST_MUTATION;

  const [createPostOrComment] = useMutation(requiredMutation, {
    variables: values,
    update(proxy, result) {
      if(!postId) {
        const data = proxy.readQuery({ query: FETCH_ALL_POSTS_QUERY });
        let newData = [...data.getPosts];
        newData = [result.data.createPost, ...newData];
        proxy.writeQuery({
          query: FETCH_ALL_POSTS_QUERY,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      } else {
        const data = proxy.readQuery({ query: FETCH_ALL_POSTS_QUERY });
      }
      values.body = "";
    },
    onError(err) {
      console.log(err);
      /*setErrors({ postBody: err.graphQLErrors[0].extensions.errors.postBody });*/
    },
  });

  function createPostOrCommentCallback() {
    createPostOrComment();
  }

  return (
    <>
      <Card border="dark">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <FormGroup className="mb-3">
              <h2>{postId ? "Comment" : "Post"} Something...</h2>
              <Form.Label>{postId ? "Comment" : "Post"}</Form.Label>
              <Form.Control
                type="text"
                name="body"
                onChange={onChange}
                value={values.body}
                isInvalid={errors.postBody ? true : false}
              />
              <Form.Text className="text-muted">Your. Amazing. {postId ? "Comment" : "Post"}.</Form.Text>
            </FormGroup>

            <Button type="submit" variant="primary w-100">
              {postId ? "Comment" : "Post"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {Object.keys(errors).length > 0 && <ErrorsToast errors={errors} />}
    </>
  );
}

export default PostOrCommentForm;
