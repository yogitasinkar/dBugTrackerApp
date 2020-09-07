import React, { useState, useEffect } from "react";
import _default from "react-bootstrap/esm/CarouselCaption";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MyVerticallyCenteredModal(props) {

  let history = useHistory();
  console.log("project Key: " , props.project_key)
  const [pk, setPk] = useState("");
  const [isValid, setIsValid] = useState(true);
  
  

  const handleChange = (e) => {
    setPk(e.target.value);
  };

  const verifyProjectKey = () => {
    if(props.project_key.trim() === pk){
        history.push(`/${props.p_id}/tasks`);   
    } else{
        setIsValid(false);
    }
    setPk("");
  } 

  const onClose = () => {
      setIsValid(true);
      setPk("");
      props.onHide()

  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>Enter Project Key</p>
        <input type="text" value={pk} name="pk" onChange={handleChange}></input>
        {isValid == false && <p>Please enter valid project key</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" size="sm" onClick={verifyProjectKey}>
          Submit
        </Button>
        <Button variant="outline-primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
