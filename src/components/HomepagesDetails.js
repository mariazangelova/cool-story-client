import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomepageThunk } from "../store/pagedetails/actions";
import { useParams } from "react-router-dom";
import { selectHomepage } from "../store/pagedetails/selectors";
import { Container } from "react-bootstrap";

export default function HomepagesDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const homepage = useSelector(selectHomepage);

  console.log("details", homepage);
  useEffect(() => {
    dispatch(getHomepageThunk(id));
  }, [dispatch, id]);
  return homepage ? (
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
              <div>
                <h2>{story.name}</h2>
                <p>{story.content}</p>
              </div>
            ))
          : null}
      </div>
    </Container>
  ) : null;
}
