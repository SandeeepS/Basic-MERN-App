import { Container } from "react-bootstrap"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <>
      <Header />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App
