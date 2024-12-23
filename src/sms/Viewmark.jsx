import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";

const Viewmark = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/student/viewmarks");
        setStudents(response.data.students); 
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <h2 className="mt-5">ENROLLMENTS</h2>
     
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>sl.no</th>
              <th>Name</th>
              <th>Subject</th>
              <th>MARKS</th>
              <th><Button>UPDATE</Button></th>
              <th><Button>DELETE</Button></th>



            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td>{student.mark}</td>

               
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
};

export default Viewmark;
