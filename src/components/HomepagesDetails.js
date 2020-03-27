import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHomepage } from "../store/pagedetails/selectors";
//import { Container, Button } from "react-bootstrap";
import { Jumbotron } from "react-bootstrap";
import StoryCarousel from "./StoryCarousel";

export default function HomepagesDetails() {
  const homepage = useSelector(selectHomepage);

  return homepage ? (
    <div>
      <Jumbotron>
        <h1>{homepage.title}</h1>
        <p>{homepage.description}</p>
      </Jumbotron>
      <StoryCarousel homepage={homepage} />
    </div>
  ) : null;
}
