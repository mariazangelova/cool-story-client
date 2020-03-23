import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomepagesThunk } from "../store/home/actions";
import { selectHomepages } from "../store/home/selectors";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Home() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);
  console.log("homepages", homepages);
  useEffect(() => {
    dispatch(getHomepagesThunk());
  }, [dispatch]);
  return (
    <div>
      <Jumbotron>
        <h1>Home</h1>
      </Jumbotron>
      {homepages.map(homepage => {
        return (
          <Container key={homepage.id}>
            <div
              style={{
                color: homepage.color,
                background: homepage.backgroundColor
              }}
            >
              <h3>{homepage.title}</h3>
              <Button>Visit page</Button>
            </div>
          </Container>
        );
      })}
    </div>
  );
}
