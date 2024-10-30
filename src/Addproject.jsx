import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const AddProject = () => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const projectData = { title, deadline, description };

        try {
            const response = await axios.post('http://localhost:4000/project/project1', projectData);
            console.log('Project Submitted:', response.data);
            
            setTitle('');
            setDeadline('');
            setDescription('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="projectTitle" className="form-label">Project Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="projectTitle" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectDeadline" className="form-label">Deadline</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="projectDeadline" 
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectDescription" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="projectDescription" 
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;
