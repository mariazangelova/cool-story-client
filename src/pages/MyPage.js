import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import { selectUserHomepage } from "../store/user/selectors";
import { Container, Button, Card } from "react-bootstrap";
import Loading from "../components/Loading";
import StoryForm from "../components/StoryForm";
//import Card from "react-bootstrap/Card";

export default function MyPage() {
  const [form, setForm] = useState(false);
  const homepage = useSelector(selectUserHomepage);
  if (!homepage) {
    return <Loading />;
  }

  return (
    <div>
      <Jumbotron>
        <h1>My Page</h1>
      </Jumbotron>
      <Button onClick={() => setForm(true)}>Post a cool story bro</Button>
      {form ? (
        <Card>
          <StoryForm />
        </Card>
      ) : null}
      <Container>
        <div
          key={homepage.id}
          style={{
            color: homepage.color,
            background: homepage.backgroundColor
          }}
        >
          <h2>{homepage.title}</h2>
          <p>{homepage.description}</p>
          {homepage.stories
            ? homepage.stories.map(story => (
                <div key={story.id}>
                  <h2>{story.name}</h2>
                  <p>{story.content}</p>
                </div>
              ))
            : null}
        </div>
      </Container>
    </div>
  );
}
