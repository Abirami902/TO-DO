import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    datejoined: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Register = mongoose.model('Register', userschema);
export default Register;