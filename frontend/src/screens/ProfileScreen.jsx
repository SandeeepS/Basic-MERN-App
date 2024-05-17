import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import Card from "react-bootstrap/Card";
import mastang from "../assets/mastang-2.webp";
import "../screens/profileScreen.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userAuth);

  const [, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/updateProfile");
  };

  return (
    <>
    <Header/>
    <FormContainer>
      <h1>My Profile</h1>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={mastang} />
        <Card.Body>{/* <Card.Title>Card Title</Card.Title> */}</Card.Body>
      </Card>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            readOnly
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Edit Profile
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
    </>
  );
};

export default ProfileScreen;
