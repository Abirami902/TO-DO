import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/view/viewprojects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <style>
        {`
          .nou {
            text-decoration: none;
            color: blue;
          }
          .nou:hover {
            color: green;
          }
        `}
      </style>
      <div>
        <h1 className="skills text-center mb-5">PROJECTS</h1>
        <div className="container">
          <div className="row">
            {projects.map((project, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '22rem' }}>
                  <img 
                    src={project.img} 
                    className="card-img-top" 
                    alt={project.title} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />

                  <div className="card-body">
                    <p className="card-text">
                      <span className='fw-bold'>{project.title}</span> <br />
                      {project.description} <br />
                      {project.deadline}
                    </p>
                    <p className="card-text fs-3">
                      <Link to={`/project/${project._id}`} className="ms-1 nou">
                        <FaEye />
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects; 