import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addmark = () => {
  const [formData, setFormData] = useState({
    name: "",
    mark: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/student/marks", formData);
      toast.success(response.data.message); 
      setFormData({
        name: "",
        mark: "",
        subject: "",
      });
    } catch (error) {
      console.error("Error adding mark:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); 
      } else {
        toast.error("Failed to add mark. Please try again."); 
      }
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Add Mark</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            min="1"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Mark</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter mark"
            name="mark"
            value={formData.mark}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="secondary" type="submit">
        send
        </Button>
      </Form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Addmark;
