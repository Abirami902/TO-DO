import express from "express";
import addProject, { Viewproject ,addTask ,viewTasks ,updateTask , deleteTask} from "../CONTROLLERS/Project.js";






const router=express.Router();


router.post('/project1',addProject)

router.get('/viewprojects', Viewproject);

router.post('/addtasks', addTask);

router.get('/viewtasks', viewTasks);

router.put('/updatetasks/:id', updateTask);

router.delete('/deletetasks/:id', deleteTask);




export default router;