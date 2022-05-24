import React from 'react';
import { MdOutlineEditNote, MdDeleteSweep } from 'react-icons/md';

function Row({ exercise, onDeleteExercise, onEditExercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdOutlineEditNote onClick={() => onEditExercise(exercise)} /></td>
            <td><MdDeleteSweep onClick={() => onDeleteExercise(exercise._id)} /></td>
        </tr>
    )
}

export default Row;