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
import { Navigate, useNavigate } from "react-router-dom";

import { useFormHooks } from "../util/formHooks";
import { REGISTER_USER } from "../util/graphql";
import { AuthContext } from '../context/auth';
import ErrorsToast from "../components/ErrorsToast";

function Register() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useFormHooks(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [addNewUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);  
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    addNewUser();
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
    if (localStorage.getItem("JSON_WEB_TOKEN")) {
        return <Navigate to='/' />
    } else {
      return (
        <>
          <Row className="mb-4 mt-4" style={{ textAlign: "center" }}>
            <h1>Register for MyConnect</h1>
          </Row>
          <Row md="2" lg="2" className="justify-content-center">
            <Col>
              <Form onSubmit={onSubmit}>
                <FormGroup className="mt-3 mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter your User Name here..."
                    isInvalid={errors.username ? true : false}
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    Something fancy to recognize you.
                  </Form.Text>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address here..."
                    isInvalid={errors.email ? true : false}
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email address with anyone.
                  </Form.Text>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    isInvalid={
                      errors.password || errors.confirmPassword ? true : false
                    }
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    Strong. Unique. You.
                  </Form.Text>
                </FormGroup>
                <FormGroup className="mb-5">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    isInvalid={
                      errors.password || errors.confirmPassword ? true : false
                    }
                    onChange={onChange}
                  />
                </FormGroup>

                <Button type="submit" variant="primary w-100">
                  Register!
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
}

export default Register;
