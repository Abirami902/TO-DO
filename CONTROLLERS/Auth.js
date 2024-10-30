import Register from '../MODELS/Register.js';
import bcrypt from 'bcrypt';
import multer from 'multer'



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

export const upload = multer({ storage: storage });


const SALT_ROUNDS = 10;

export const User_Register = async (req, res) => {
    try {
        let file=req.file.filename
        req.body={...req.body,photo:file}
        let newdata = new Register(req.body);
        let response = await newdata.save();
        let user = new Login({ ...req.body, password: await bcrypt.hash(req.body.password, SALT_ROUNDS), userType: 'intern', userId: response._id });
        let response1 = await user.save();
        console.log(response1);
        res.json(response1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering intern' });
    }
};
export const LoginUser = async (req, res) => {
    try {
      let user = await Register.findOne({ username: req.body.username, password: req.body.password });
      console.log(user);
      if (!user) {
        return res.status(401).json('Invalid username or password');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };