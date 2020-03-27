import React, { useEffect, useState } from "react";
//import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { likeStory, deleteStory } from "../store/user/actions";
import { getHomepageThunk } from "../store/pagedetails/actions";
import { useParams } from "react-router-dom";
import { selectToken } from "../store/user/selectors";

export default function StoryCarousel(props) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homepage } = props;
  const [message, setMessage] = useState("");

  const liked = storyId => {
    token
      ? dispatch(likeStory(storyId))
      : setMessage("Please log in or sing up to like this post.");
  };

  useEffect(() => {
    dispatch(getHomepageThunk(id));
  }, [dispatch, id]);
  let sortStories = [];
  if (homepage.stories) {
    sortStories = homepage.stories.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (!homepage.stories) {
    return <div>loading</div>;
  }

  return (
    // <Carousel className="mt-5">
    //   {homepage.stories.map(story => {
    //     return (
    //       <Carousel.Item key={story.id}>
    //         {story.imageUrl ? (
    //           <img
    //             className="d-block w-100"
    //             src={story.imageUrl}
    //             alt={story.name}
    //           />
    //         ) : null}
    //         <Carousel.Caption
    //           style={{
    //             backgroundColor: `${homepage.backgroundColor}99`,
    //             color: homepage.color
    //           }}
    //           className="p-5"
    //         >
    //           <h3>{story.name}</h3>
    //           <p>{story.content}</p>
    //         </Carousel.Caption>
    //         <Button onClick={() => liked(story.id)}>❤</Button>
    //       </Carousel.Item>
    //     );
    //   })}
    // </Carousel>
    <Container>
      <div
        key={homepage.id}
        style={{
          color: homepage.color,
          background: homepage.backgroundColor
        }}
      >
        {sortStories.map(story => {
          const number = story.users.length;
          return (
            <div key={story.id}>
              <h2>{story.name}</h2>
              <p>{story.content}</p>
              <img src={story.imageUrl} width="400px" />
              <div>
                This story was liked by{" "}
                {story.users.map(user => (
                  <p>{user.name}</p>
                ))}
              </div>
              <p>{message}</p>
              <Button variant="light" onClick={() => liked(story.id)}>
                ❤ Likes: {number}
              </Button>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
