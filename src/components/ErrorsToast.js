import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function ErrorsToast({ errors }) {
  var errorToggles = new Array(Object.keys(errors).length).fill(true);
  const [showError, setShowError] = useState(errorToggles);

  function toggleErrorToast(e) {
    const id = e.target.parentNode.parentNode.id;
    var newErrorStates = [...showError];
    newErrorStates[id] = !newErrorStates[id];
    setShowError(newErrorStates);
  }

  return (
    Object.keys(errors).length > 0 && (
      <ToastContainer position="top-end" className="p-3">
        {Object.values(errors).map((value, id) => (
          <Toast show={showError[id]} onClose={toggleErrorToast} key={id} id={id}>
            <Toast.Header>
              <strong className="me-auto">Invalid Input Error!</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{value}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    )
  );
}

export default ErrorsToast;
