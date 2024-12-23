import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addcourse = () => {
  const [formData, setFormData] = useState({
    subjectname: "",
    subjectcode: "",
    credithours: "",
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
      const response = await axios.post("http://localhost:4000/student/addcourse", formData);
      toast.success(response.data.message); 
      setFormData({
        subjectname: "",
        subjectcode: "",
        credithours: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error.response?.data?.message || "Failed to add course. Please try again."); // Show error toast
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Add Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="subjectName">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject name"
            name="subjectname"
            value={formData.subjectname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subjectCode">
          <Form.Label>Subject Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject code"
            name="subjectcode"
            value={formData.subjectcode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="creditHours">
          <Form.Label>Credit Hours</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter credit hours"
            name="credithours"
            value={formData.credithours}
            onChange={handleChange}
            required
            min="1"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Course
        </Button>
      </Form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default Addcourse;

