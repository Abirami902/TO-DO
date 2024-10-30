import project from "../MODELS/Projectdata.js";
import Task from '../models/Task.js';  


export const addProject = async (req, res) => {
    try {
        const { title, deadline, description } = req.body;

        const newProject = new project({ title, deadline, description });
        const savedProject = await newProject.save();

        res.status(201).json({ message: 'Project added successfully', project: savedProject });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Error in adding project', error });
    }
};


export const Viewproject = async (req, res) => {
    try {
        const projects = await project.find(); 
        res.json(projects); 
      } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: 'Server error' });
      }
  };
  

export const addTask = async (req, res) => {
    const { name } = req.body;
    try {
        const newTask = new Task({ name, completed: false });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Failed to add task' });
    }
};


export const viewTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { name, completed },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};


export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};




export default addProject