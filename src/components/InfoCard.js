import React from "react";
import { Button, Card, Col } from "react-bootstrap";

function InfoCard({ title, body, btnTitle, callback, btnType}) {
  return (
    <Col sm='12'>
      <Card border='dark' className="mb-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="mt-3">{body}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Button variant={btnType} onClick={callback}>{btnTitle}</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default InfoCard;