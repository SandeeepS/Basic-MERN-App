import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../slices/usersApiSlice";
import { setAdminCredentials } from "../slices/adminAuthSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Header from "../components/Header";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/adminProfile");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("admin details ",res)
      dispatch(setAdminCredentials({ ...res }));
      navigate("/adminProfile");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <Header/>
    <FormContainer>
      <h1>Admin Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
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

        {isLoading && <Loader />}

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <p>Loading...</p>}
    </FormContainer>
    </>
  );
};

export default AdminLogin;
