import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterI = () => {
  const [intern, setIntern] = useState({ });
  const [photo, setphoto] = useState('');
  const [refresh, setRefresh] = useState(true);

  const handleChange = (event) => {
    setIntern({ ...intern, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
   
    const formData = new FormData();

    formData.append('photo', photo);
    formData.append('name', intern.name);
    formData.append('datejoined', intern.datejoined);
    formData.append('course',intern.course);
    formData.append('username', intern.username);
    formData.append('password', intern.password);
    formData.append('contact', intern.contact);
    formData.append('email', intern.email);

    try{
      await axios.post('http://localhost:4000/auth/register', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  setphoto(null);
  setIntern('');

  setRefresh(!refresh);
  toast.success('Intern registered successfully');
}
 catch (error) {
  toast.error(error || 'Error registering intern');
}
}


  return (
    <>
      <ToastContainer />
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: '' }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <Row className="w-100">
            <Col
              md={6}
              className="d-flex flex-column p-5 align-items-center text-center text-white"
              style={{ backgroundColor: '', height: '500px' }}
            >
              <Image src="Ellipse 4.png" className="rounded-circle h-10 w-10" alt="" />
              <div className="">
                <p className="mt-2 fw-bold text-black fs-3"> REGISTER</p>
                <Button
                  className="bg-light"
                  variant="secondary"
                  style={{ marginTop: '100px', width: '150px' }}
                  onClick={handleSubmit}
                >
                  <span className="text-dark fw-bold fs-6">LOG IN</span>
                </Button>
              </div>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
              style={{ backgroundColor: '' }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={intern.name} 
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDateJoined" className="mb-3">
                  <Form.Control
                    type="date"
                    name="datejoined"
                    placeholder="Date joined"
                    value={intern.datejoined} 
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPhoto" className="mb-3">
                  <Form.Control
                    type="file"
                    name="photo"
                    placeholder="Photo"
                    onChange={((e)=>{setphoto(e.target.files[0])})}
                  />
                </Form.Group>

                <Form.Group controlId="formCourse" className="mb-3">
                  <Form.Control
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={intern.course} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="User Name"
                    value={intern.username} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={intern.password} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formContact" className="mb-3">
                  <Form.Control
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={intern.contact} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={intern.email} 
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <button
                  type="submit"
                  style={{ backgroundColor: 'rgb(43, 43, 82)', color: 'white', width: '200px' }}
                  className="btn mt-5 ms-5"
                >
                  REGISTER
                </button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RegisterI;