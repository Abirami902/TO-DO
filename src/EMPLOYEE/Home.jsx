import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
  Modal,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { FaAngleRight, FaSearch, FaPlus, FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState(() => {
    // Load initial data from localStorage
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    salary: '',
    image: null,
  });

  useEffect(() => {
    // Save data to localStorage whenever employees state changes
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    setEmployees([...employees, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      designation: '',
      dateOfJoining: '',
      salary: '',
      image: null,
    });
    setShowModal(false);
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="secondary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">EMPLOYEE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Centered Search Bar with Icon */}
            <Form className="d-flex mx-auto w-35">
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                />
                <InputGroup.Text className="bg-white text-secondary">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Form>

            {/* Navigation Links */}
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="/">Dashboard</Nav.Link>
              <FaAngleRight className="text-white mx-2" />
              <Nav.Link href="/about">Staff</Nav.Link>
              <FaAngleRight className="text-white mx-2" />
              <Nav.Link href="/services">Employee</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button
          variant="success"
          className="rounded-circle p-4"
          style={{ backgroundColor: '#000080', border: 'none' }}
          onClick={() => setShowModal(true)}
        >
          <FaPlus size={20} />
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display Employee Cards */}
      <Container className="mt-5">
        <Row>
          {employees.map((employee, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  {employee.image && (
                    <img
                      src={URL.createObjectURL(employee.image)}
                      alt="Employee"
                      className="rounded-circle mb-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Title>{`${employee.firstName} ${employee.lastName}`}</Card.Title>
                  <Card.Text>{employee.email}</Card.Text>
                  <div className="d-flex justify-content-center mb-3">
                    <FaEdit className="mx-2 text-primary" />
                    <FaEye className="mx-2 text-success" />
                    <FaTrash
                      className="mx-2 text-danger"
                      onClick={() => deleteEmployee(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <Row>
                    <Col><strong>Department</strong> <br></br>{employee.department}</Col>
                    <Col><strong>Designation</strong> <br></br>{employee.designation}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col><strong>Date of Joining</strong><br></br> {employee.dateOfJoining}</Col>
                    <Col><strong>Salary</strong><br></br> ${employee.salary}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
