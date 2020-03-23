import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getHomepagesThunk } from "../store/home/actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomepagesThunk());
  }, [dispatch]);
  return (
    <Jumbotron>
      <h1>Home</h1>
    </Jumbotron>
  );
}
