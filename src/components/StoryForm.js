import React from "react";
import { Form, Button } from "react-bootstrap";

export default function StoryForm() {
  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Something cool bro" />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="Share your cool story by typing here..."
        />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>ImageUrl</Form.Label>
        <Form.Control type="url" placeholder="http://image.com" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
