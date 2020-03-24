import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomepagesThunk } from "../store/home/actions";
import { selectHomepages } from "../store/home/selectors";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);
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
          <div>
            <Container>
              <div
                key={homepage.id}
                style={{
                  color: homepage.color,
                  background: homepage.backgroundColor
                }}
              >
                <h3>{homepage.title}</h3>
                <Link to={`/homepages/${homepage.id}`}>
                  <Button>Visit page</Button>
                </Link>
              </div>
            </Container>
          </div>
        );
      })}
    </div>
  );
}
