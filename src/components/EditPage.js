import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUserHomepage } from "../store/user/selectors";
import { editPage } from "../store/user/actions";

export default function EditPage() {
  const homepage = useSelector(selectUserHomepage);
  const [form, setForm] = useState("");
  const [title, setTitle] = useState(homepage.title);
  const [description, setDescription] = useState(homepage.description);
  const [color, setColor] = useState(homepage.color);
  const [backgroundColor, setBackgroundColor] = useState(
    homepage.backgroundColor
  );

  //console.log("homepage", homepage);
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();
    dispatch(editPage(title, description, color, backgroundColor));
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={event => setDescription(event.target.value)}
            as="textarea"
            rows="3"
            placeholder=""
          />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Background Color</Form.Label>
          <Form.Control
            value={backgroundColor}
            onChange={event => setBackgroundColor(event.target.value)}
            type="color"
          />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Text Color</Form.Label>
          <Form.Control
            value={color}
            onChange={event => setColor(event.target.value)}
            type="color"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form>
      {form}
    </div>
  );
}
