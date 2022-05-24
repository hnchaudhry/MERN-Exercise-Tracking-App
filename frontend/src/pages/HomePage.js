import React from 'react';
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEditExercise = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <p>Click the "Create" button above to add a new exercise or use the edit/delete buttons below to make changes.</p>
            <Table exercises={exercises} onDeleteExercise={onDeleteExercise} onEditExercise={onEditExercise}></Table>
        </>
    );
}

export default HomePage;