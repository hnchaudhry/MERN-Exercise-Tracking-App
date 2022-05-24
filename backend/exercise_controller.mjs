import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());


// Create a new exercise with the name, reps, weight, unit, and date provided in the body
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            // console.error(error);
            // In case of an error, send back status code 500.
            res.status(500).json({ error: 'Creation of an exercise document failed due to invalid syntax.' });
        });
});

// Retrieve all exercises 
app.get('/exercises', (req, res) => {
    exercises.getExercises()
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            // console.error(error);
            res.status(500).json({ error: 'Request to retrieve the entire exercise log failed due to a syntax error.' });
        });
});

// Update exercise with matching ID
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date });
            } else {
                res.status(500).json({ error: 'Update of an exercise document failed due to invalid syntax or document does not exist.' });
            }
        })
        .catch(error => {
            // console.error(error);
            res.status(500).json({ error: 'Update of an exercise document failed due to invalid syntax or document does not exist.' });
        });
});

// Delete exercise with matching ID
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ error: 'Document does not exist.' });
            }
        })
        .catch(error => {
            // console.error(error);
            res.status(500).json({ error: 'Document does not exist.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});