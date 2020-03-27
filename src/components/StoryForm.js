import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postStory } from "../store/user/actions";

export default function StoryForm() {
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [form, setForm] = useState("");
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();
    dispatch(postStory(name, content, imageUrl));
    setForm("Success!");
  }

  return (
    <div className="mb-3">
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Something cool bro"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            value={content}
            onChange={event => setContent(event.target.value)}
            as="textarea"
            rows="3"
            placeholder="Share your cool story by typing here..."
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            type="url"
            placeholder="http://image.com"
          />
        </Form.Group>
        <Image src={imageUrl} thumbnail />
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form>
      {form}
    </div>
  );
}
