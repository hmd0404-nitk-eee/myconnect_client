import React from "react";
import { Accordion, Card, Col, ListGroup } from "react-bootstrap";

function DevInfoCard() {
  return (
    <Col sm="12">
      <Card border="dark" className="mb-5">
        <Card.Body>
          <Card.Title>Developer's Info</Card.Title>
          <Card.Text> My Name is Harshal Dhake, </Card.Text>
          <Card.Subtitle className="mt-3 mb-3 text-primary">
            Contact Info
          </Card.Subtitle>
          <ListGroup>
            <ListGroup.Item as="a" href="https://drive.google.com/file/d/1yOb0q5QQHGq-WbscOUN4I3mlSNmk3pjN/view?usp=sharing">
              <i className="fa fa-file-text"></i>&nbsp;&nbsp;Get my Résumé
            </ListGroup.Item>
            <ListGroup.Item as="a" href="mailto:hmd0404@gmail.com">
              <i className="fa fa-envelope-o"></i>&nbsp;&nbsp;Mail Me
            </ListGroup.Item>
            <ListGroup.Item
              as="a"
              href="https://www.linkedin.com/in/harshal-dhake-552380196/"
            >
              <i className="fa fa-linkedin-square"></i>&nbsp;&nbsp;Connect with
              Me on LinkedIn
            </ListGroup.Item>
            <ListGroup.Item as="a" href="https://github.com/hmd0404-nitk-eee">
              <i className="fa fa-github"></i>&nbsp;&nbsp;Visit my GitHub Page
              for more such projects.
            </ListGroup.Item>
          </ListGroup>

          <Card.Subtitle className="mt-3 text-primary">
            College Life
          </Card.Subtitle>
          <Card.Text className="mt-3">
            A student at National Institue of Technology Karnataka, Surathkal.
            <br />
            <br />
            My interests are in the field of <b>Computer Science</b>, like
            Development (Web and App), Cloud and still exploring xD. Actually I
            love exploring new domains.
            <br />
            <br />
            My dream companies are{" "}
            <b>
              <i className="fa fa-google"></i> Google,{" "}
              <i className="fa fa-apple"></i> Apple
            </b>{" "}
            and <b>Netflix</b> (ofcourse xD).
          </Card.Text>
          <Card.Subtitle className="mt-3 text-primary mb-3">
            Professional Life
          </Card.Subtitle>
          <Card.Text>My past professional experiences are,</Card.Text>
          <Accordion defaultActiveKey={0} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Web Development Intern,&nbsp;
                <a
                  href="https://twizzr.com"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Twizzr
                </a>
              </Accordion.Header>
              <Accordion.Body>
                At Twizzr, I mainly started my development journey and learnt
                <b> ReactJS</b> and <b>Bootstrap</b>. I understood the
                fundamentals of Web Development and all the Single Page
                Application Development hype. ReactJS along with Bootstrap is
                one of my strong points. <br />
                At Twizzr, I built modules for the website and improved the
                Mobile responsiveness of some modules.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Incoming Intern at&nbsp;&nbsp;
                <a
                  href="https://www.visa.co.in/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <i className="fa fa-cc-visa"></i> Visa Inc.
                </a>
              </Accordion.Header>
              <Accordion.Body>Still loads to learn!</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DevInfoCard;
