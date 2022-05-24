import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Exercise Tracking App</h1>
          <p><i>Use this simple app to track your exercise progress!</i></p>
        </header>
        <Navigation />
        <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </main>
        <footer>
          <p>&copy; 2022 Hassan Chaudhry</p>
        </footer>  
      </Router>
    </div>
  );
}

export default App;