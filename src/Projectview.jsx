import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const ProjectPage = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Todo/viewtasks'); 
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleShowModal = () => {
        setEditingTask(null);
        setShowModal(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setNewTaskName(task.name);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewTaskName("");
    };

    const handleSaveTask = async () => {
        if (newTaskName.trim()) {
            if (editingTask) {
                try {
                    const response = await axios.put(`http://localhost:4000/Todo/updatetasks/${editingTask._id}`, {
                        name: newTaskName,
                    });
                    setTasks(tasks.map(task => 
                        task._id === editingTask._id ? response.data : task
                    ));
                } catch (error) {
                    console.error('Error updating task:', error);
                }
            } else {
                try {
                    const response = await axios.post('http://localhost:4000/Todo/addtasks', {
                        name: newTaskName,
                    });
                    setTasks([...tasks, response.data]);
                } catch (error) {
                    console.error('Error adding task:', error);
                }
            }
            handleCloseModal();
        }
    };

    const handleMarkComplete = async () => {
        try {
            const pendingTasks = tasks.filter(task => !task.completed);
            if (pendingTasks.length > 0) {
                await Promise.all(pendingTasks.map(task => 
                    axios.put(`http://localhost:4000/Todo/updatetasks/${task._id}`, {
                        completed: true,
                    })
                ));
                setTasks(tasks.map(task => ({ ...task, completed: true }))); 
            }
        } catch (error) {
            console.error('Error marking tasks as complete:', error);
        }
    };

    const handleRemoveCompleted = async (taskId) => {
        try {
            await axios.delete(`http://localhost:4000/Todo/deletetasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error removing completed task:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Project 1</h1>
            <p className="mt-2">
                Summary: {tasks.filter(task => task.completed).length}/{tasks.length} todos completed
            </p>

            <h3>Pending</h3>
            <div className="mb-3">
                {tasks.filter(task => !task.completed).map(task => (
                    <div key={task._id} className="d-flex align-items-center mb-2">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id={`task${task._id}`}
                            onChange={async () => {
                                try {
                                    const response = await axios.put(`http://localhost:4000/Todo/updatetasks/${task._id}`, {
                                        completed: !task.completed,
                                    });
                                    setTasks(tasks.map(t => 
                                        t._id === task._id ? response.data : t
                                    ));
                                } catch (error) {
                                    console.error('Error updating task:', error);
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`task${task._id}`}>{task.name}</label>
                        <button className="btn btn-link ms-2" onClick={() => handleEditTask(task)}>Edit</button>
                    </div>
                ))}
            </div>

            <h3>Completed</h3>
            <div className="mb-3">
                {tasks.filter(task => task.completed).map(task => (
                    <div key={task._id} className="form-check">
                        <input className="form-check-input" type="checkbox" id={`task${task._id}`} checked readOnly />
                        <label className="form-check-label" htmlFor={`task${task._id}`}>{task.name}</label>
                        <button className="btn btn-danger ms-2" onClick={() => handleRemoveCompleted(task._id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="d-flex flex-column mt-4 w-25 mx-auto">
                <button type="button" className="btn btn-primary mb-2" onClick={handleShowModal}>Add</button>
                <button type="button" className="btn btn-success" onClick={handleMarkComplete}>Mark as Complete</button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTask ? "Edit Task" : "Add New Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveTask}>
                        {editingTask ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProjectPage;  