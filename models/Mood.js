import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export const Mood = mongoose.model("Mood", MoodSchema);