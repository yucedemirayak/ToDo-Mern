import mongoose from "mongoose";

const todoScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdTime: {
        type: Date,
        default: new Date(),
    }
});

export const Todo = mongoose.model("Todo", todoScheme);