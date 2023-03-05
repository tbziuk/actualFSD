import React, { useState } from 'react';
import './Tasks.css';

import TasksList from './TasksList';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (event) => {
        event.preventDefault();
      
        const newTask = {
          id: Date.now(),
          name: inputName,
          checked: false,
        };
      
        const newTasks = [];
      
        for (let i = 0; i < tasks.length; i++) {
          newTasks.push(tasks[i]);
        }
      
        newTasks.push(newTask);
      
        setTasks(newTasks);
        setInputName('');
      }

    const removeTask = (taskID) => {
        setTasks(tasks.filter(task => task.id !== taskID));
    }

    const updateTask = (taskID) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskID) {
                return {
                    ...task,
                    checked: !task.checked,
                };
            } else {
                return task;
            }
        });
        setTasks(updatedTasks);
    }

    const [inputName, setInputName] = useState('');

    return (
        <div className="adding">
            <form onSubmit={addTask}>
                <input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" placeholder="enter task" />
                <button className='add' type="submit">add</button>
            </form>
            <TasksList tasksList={tasks} removeTaskMethod={removeTask} updateTaskMethod={updateTask} />
        </div>
    );
}

export default Tasks;