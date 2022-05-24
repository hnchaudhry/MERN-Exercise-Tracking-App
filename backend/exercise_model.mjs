// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true, default: 'lbs' },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

// Create an exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

// Retreive exercises log
const getExercises = async() => {
    const exercise = Exercise.find()
    return exercise;
}

// Update ID specified exercise
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    if (name.length === 0 || reps.length === 0 || weight.length === 0 || unit.length === 0 || date.length === 0) {
        return 0;
    } else {
        const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
        return result.modifiedCount;
    }
}

// Delete ID specified exercise
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id})
    return result.deletedCount;
}

export { createExercise, getExercises, updateExercise, deleteById };