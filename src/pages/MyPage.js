import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import { selectUserHomepage } from "../store/user/selectors";
import { Container, Button, Card } from "react-bootstrap";
import Loading from "../components/Loading";
import StoryForm from "../components/StoryForm";
import EditPage from "../components/EditPage";
import { useHistory } from "react-router-dom";
import { selectToken } from "../store/user/selectors";
import { deleteStory } from "../store/user/actions";

export default function MyPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [page, setPage] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const token = useSelector(selectToken);
  const homepage = useSelector(selectUserHomepage);
  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);
  if (!homepage) {
    return <Loading />;
  }
  const deleted = storyId => {
    token
      ? dispatch(deleteStory(storyId))
      : setMessage("Please log in to delete this post.");
  };

  return (
    <div>
      <Jumbotron>
        <h1>{homepage.title}</h1>
        <p>{homepage.description}</p>
      </Jumbotron>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Button onClick={() => setForm(!form)}>Post a cool story bro</Button>
          <Button onClick={() => setPage(!page)}>Edit my page</Button>

          {page ? (
            <Card style={{ width: "22rem" }}>
              <h3>Edit the page</h3>
              <EditPage />
            </Card>
          ) : null}
          {form ? (
            <Card style={{ width: "22rem" }}>
              <h3>Post a story</h3>
              <StoryForm />
            </Card>
          ) : null}
        </div>
      </div>
      <Container>
        <div
          key={homepage.id}
          style={{
            color: homepage.color,
            background: homepage.backgroundColor
          }}
        >
          {homepage.stories
            ? homepage.stories.map(story => (
                <div key={story.id}>
                  <h2>{story.name}</h2>
                  <p>{story.content}</p>
                  <img src={story.imageUrl} width="400px" />
                  <Button variant="danger" onClick={() => deleted(story.id)}>
                    DELETE
                  </Button>
                </div>
              ))
            : null}
        </div>
      </Container>
    </div>
  );
}
