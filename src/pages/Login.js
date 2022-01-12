import React, { useState, useContext } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

import { useFormHooks } from "../util/formHooks";
import { LOGIN_USER } from '../util/graphql';
import { AuthContext } from "../context/auth";
import ErrorsToast from "../components/ErrorsToast";

function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { state } = useLocation();

  var username = "";
  var password = "";

  if(state) {
    ({ username, password } = state);
  }

  const { onChange, onSubmit, values } = useFormHooks(loginUserCallback, {
    username: username ? username: "",
    password: password ? password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors({
        username: err.graphQLErrors[0].message,
        password: err.graphQLErrors[0].message,
      });
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ position: "relative", top: "40vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    return (
      <>
        <Row className="mb-4 mt-4" style={{ textAlign: "center" }}>
          <h1>Login to MyConnect</h1>
        </Row>
        <Row md="2" lg="2" className="justify-content-center">
          <Col>
            <Form onSubmit={onSubmit}>
              <FormGroup className="mt-3 mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  id="usr"
                  type="text"
                  name="username"
                  placeholder="Enter your User Name here..."
                  isInvalid={errors.username ? true : false}
                  onChange={onChange}
                  value={values.username}
                  disabled={username ? true:false}
                />
                <Form.Text className="text-muted">
                  Your fancy recognizer.
                </Form.Text>
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="pass"
                  type="password"
                  name="password"
                  isInvalid={
                    errors.password || errors.confirmPassword ? true : false
                  }
                  onChange={onChange}
                  value={values.password}
                  disabled={password ? true:false}
                />
                <Form.Text className="text-muted">
                  Your. Strong. Unique.
                </Form.Text>
              </FormGroup>

              <Button type="submit" variant="primary w-100">
                Log In!
              </Button>
            </Form>
          </Col>
          {Object.keys(errors).length > 0 && (
            <ErrorsToast errors={errors} />
          )}
        </Row>
      </>
    );
  }
}

export default Login;
