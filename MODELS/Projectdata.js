import mongoose from 'mongoose';

const projectschema = new mongoose.Schema({
    title: { type: String },
    deadline: { type: Date },
    description: { type: String},
});

const project = mongoose.model('projects', projectschema);
export default project;