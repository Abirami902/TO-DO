import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

const Viewcourse = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/student/subjects");
        setCourses(response.data.courses); 
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <h2 className="mt-5">View Courses</h2>
      {error && <p className="text-danger">{error}</p>}
      {courses.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>sl.no</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Credit Hours</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.subjectname}</td>
                <td>{course.subjectcode}</td>
                <td>{course.credithours}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No courses found.</p>
      )}
    </Container>
  );
};

export default Viewcourse;
