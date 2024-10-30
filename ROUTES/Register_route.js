import express from "express";
import { LoginUser, upload, User_Register } from "../CONTROLLERS/Auth.js";


const router=express.Router();

router.post('/register',upload.single('photo'), User_Register)

router.post('/login',LoginUser)

export default router;