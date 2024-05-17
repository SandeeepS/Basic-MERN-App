import { Container, Card } from "react-bootstrap";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";
import Customers from "./Customers";
import './Customers.css'

const AdminProfile = () => {

  const adminInfo = useSelector((state) => state.adminAuth);
  console.log("admin is ",adminInfo);
  return (
    <>   
     <AdminHeader/>
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Admin Profile</h1>
          <p className="text-center mb-4">Welcome {adminInfo.adminInfo.name} </p>
        </Card>
        
      </Container>
      <Customers/>
    </div>
    </>

  );
};

export default AdminProfile;
