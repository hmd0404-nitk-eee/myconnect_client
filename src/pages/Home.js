import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Container, Col, Row  } from "react-bootstrap";

import PostsView from "../components/PostsView";
import InfoCard from "../components/InfoCard";
import DevInfoCard from "../components/DevInfoCard";
import { AuthContext } from "../context/auth";
import PostOrCommentsForm from "../components/PostOrCommentForm";

import { FETCH_ALL_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_ALL_POSTS_QUERY);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLoginButtonClick() {
    navigate("/login");
  }

  function handleRegisterButtonClick() {
    navigate("/register");
  }

  function handleTestLoginButtonClick() {
    navigate("/login", {
      state: {
        username: "Test Account",
        password: "1234567",
      },
    });
  }

  const homePage = context.user ? (
    <Container fluid>
      <Row className="mb-4 mt-4" style={{ textAlign: "center" }}>
        <h1>Your Recent Feed</h1>
      </Row>
      <Row lg="1" md="1" sm="1">
        <Col lg="4" md="6" sm="12">
          <PostOrCommentsForm /><br/>
          <DevInfoCard />
        </Col>
        <hr className="mt-3 d-block d-md-none" />
        <h1 className="d-block d-md-none">Recent Posts</h1>
        <Col lg="8" md="6" sm="12">
          <PostsView loading={loading} postsData={data} />
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row className="mb-3 mt-3" style={{ textAlign: "center" }}>
        <h1>Welcome to MyConnect</h1>
      </Row>
      <Row lg="1" md="1" sm="1">
        <Col lg="4" md="6" sm="12">
          <Row>
            <InfoCard
              title="Login to MyConnect"
              body="Login to YOUR amazing social connect, MyConnect"
              btnTitle="Login"
              callback={handleLoginButtonClick}
              btnType="primary"
            />
            <InfoCard
              title="Register for MyConnect"
              body="Register to access the amazing social connect, MyConnect"
              btnTitle="Register"
              callback={handleRegisterButtonClick}
              btnType="success"
            />
            <InfoCard
              title="Test Login"
              body="Click the button below to login via a Test Account to see the neat features of MyConnect."
              btnTitle="Test Login"
              callback={handleTestLoginButtonClick}
              btnType="warning"
            />
            <DevInfoCard/>
          </Row>
        </Col>
        <hr className="mt-3 d-block d-md-none" />
        <h1 className="d-block d-md-none">Recent Posts</h1>
        <Col lg="8" md="6" sm="12">
          <PostsView loading={loading} postsData={data} />
        </Col>
      </Row>
    </Container>
  );

  return homePage;
}

export default Home;
