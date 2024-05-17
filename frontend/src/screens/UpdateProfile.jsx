import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/userAuthSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import Card from "react-bootstrap/Card";
import mastang from "../assets/mastang-2.webp";
import "../screens/profileScreen.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userAuth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const emailRegex = /^[\w-.]+@gmail\.com$/;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "" || name === null) {
      toast.error("please enter your name");
      return;
    }
    if (email === "" || email === null) {
      toast.error("please enter your email address");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("please enter valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password Strength must be more than 6");
      return;
    }
    if (password.trim().length < 6 || password.trim === "") {
      toast.error("Enter a valid password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      navigate('/profile');

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // //handle profile image delete
  // const handleProfileImageDelete = () => {
  //   setProfileImage(null);
  //   fileInputRef.current.value = ""; // Reset the file input
  // };

  // //to handle profile image uploading
  // const handleProfileImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setProfileImage(file);
  // };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Optionally, show a preview of the selected image
    // This requires setting up a URL.createObjectURL() call and displaying it in an img element
  };

  return (
    <>
    <Header />
    <FormContainer>
      <h1>Update Profile 2</h1>

      <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={selectedFile? URL.createObjectURL(selectedFile) : mastang} />
          <Card.Body>
            <Button variant="danger">Delete</Button>
            <Button variant="primary">Edit</Button>
          </Card.Body>
      </Card>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="profileImage">
            <Form.Label>Profile Picture</Form.Label>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="profileImageInput" />
            <label htmlFor="profileImageInput">Select Image</label>
        </Form.Group>


        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
    </>
  );
};

export default ProfileScreen;
