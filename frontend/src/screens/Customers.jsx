import { Card, Button, Table, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../screens/Customers.css'

const Customers = () => {
  let [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [seletedDeletingUser,setSeletedDeletingUser] = useState('')
  const [seletedUserForListOrUnlist,setSeletedUserForListOrUnlist] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showListingModal,setShowListingModal] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch users from the API endpoint
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/details"); 
        console.log(response);
        console.log("all users is ",response.data.userDetails)
        setCustomers(response.data.userDetails);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const onListUnlist = (customerId) => {
    const targetUser = customers.find(
        (customer) => customer._id === customerId
    )
    console.log("target customer is ",targetUser)
    setSeletedUserForListOrUnlist(targetUser);
    setShowListingModal(true)

  };

  const onDeleteUser = (customerId) => {
    const userForDelete = customers.find(
        (customer) => customer._id == customerId
    )
    setSeletedDeletingUser(userForDelete); 
    setShowDeleteConfirmation(true); 
}

  const onAddUser = () => {
     navigate('/addUser')
  };

  {
    /*handling the modal */
  }
  const onEditUser = (customerId) => {
    const selectedUser = customers.find(
      (customer) => customer._id === customerId
    );
    setSelectedUser(selectedUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(seletedDeletingUser );
  };


  //handling the submition
  const handleSubmitModal = async () => {
    try {
      const userData = {
        id: selectedUser._id,
        name: selectedUser.name,
        email: selectedUser.email,
      };
      console.log("going to server");
      const response = await axios.post("/api/admin/editUser", userData);
      console.log("User updated successfully:", response.data);
   
   
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //handling the delte 
  const handleConfirmDelete = async () => {
    try {
        const userData2 = {
            id: seletedDeletingUser._id,
            name: seletedDeletingUser.name,
            email: seletedDeletingUser.email,
          };
        console.log("ented the delte function");
        console.log("seleted User name ",userData2.id)
        const response = await axios.post('/api/admin/deleteUser',userData2); 
        console.log('User deleted successfully:', response.data);
        // Remove the deleted user from the local state
        setCustomers(customers.filter(customer => customer._id!== selectedUser));
        setShowDeleteConfirmation(false); 
    } catch (error) {
        console.error('Error deleting user:', error);
    }
  };


  //handling the listing 
  const handleSubmitListingUpdate = async () => {
  try {
    console.log("entered in handling list")
    console.log("selected user for listing is ",seletedUserForListOrUnlist)
    const response = await axios.put(`/api/admin/updateListingStatus`,seletedUserForListOrUnlist);
    if (response.status === 200) {
      const updatedCustomers = customers.map(customer =>
        customer._id === seletedUserForListOrUnlist._id? {...customer, isListed: seletedUserForListOrUnlist.isListed} : customer
      );
      setCustomers(updatedCustomers);
      setShowListingModal(false); 
    } else {
      console.error("Failed to update listing status.");
    }
  } catch (error) {
    console.error("Error updating listing status:", error);
  }
};

  

  return (
    <Card className="p-4">
      <h3 className="mb-4">Customers</h3>

      <Button variant="primary" onClick={onAddUser}>
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className={customer.deleted === true ? 'disabled-row' : ''} >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => onListUnlist(customer._id)}
                  disabled={customer.delete === true} 
                
                >
                  {customer.isListed ? "Unlist" : "List"}
                  
                </Button>
                <Button
                  variant="outline-success"
                  className="mr-2"
                  onClick={() => onEditUser(customer._id)}
                  disabled={customer.delete === true} 


                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => onDeleteUser(customer._id)}
                  disabled={customer.delete === true} 

                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/*modall */}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser?.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal for deletion */}

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>


      {/* modal for listing */}
      <Modal show={showListingModal} onHide={() => setShowListingModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Update Listing Status</Modal.Title>
  </Modal.Header>
  <Modal.Body>
   <h3>Are you sure for updaiting the status</h3>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowListingModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmitListingUpdate}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>

    </Card>
  );
};

export default Customers;
