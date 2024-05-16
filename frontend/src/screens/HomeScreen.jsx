import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeScreen = () => {
  console.log("entered home screnn");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      console.log("entered in useeffect");
      navigate("/home");
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomeScreen;
