import React from 'react';
import './TasksList.css';

const TasksList = (props) => {

    const tasksLiElements = props.tasksList.map(task =>
        <li key={task.id} className={task.checked ? "checked" : " "}>
            {task.name}
            <input className='checkbox' type='checkbox' checked={task.checked} onChange={() => { props.updateTaskMethod(task.id) }} />
            <span onClick={() => props.removeTaskMethod(task.id)}>X</span>
        </li>);

    return (
        <div className='list'>
            <ul className="tasks">
                {tasksLiElements}
            </ul>
        </div>
    );
}

export default TasksList;