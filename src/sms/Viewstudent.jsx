import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Viewstudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/student/enrollments");
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
      {error && <p className="text-danger">{error}</p>}
      {students.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>sl.no</th>
              <th>Name</th>
              <th>Age</th>
              <th>Subject</th>
              <th>ASSIGN MARKS</th>

            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.subject}</td>

                <Link to={`/mark`}>
                  <button className="bg-success">ASSIGN</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No students found.</p>
      )}
    </Container>
  );
};

export default Viewstudent;
