import React, { Component } from 'react';
import './Tasks.css';

import TasksList from './TasksList';

class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }


    addTask = (event) => {
        event.preventDefault();

        let newTask = {
            id: Date.now(),
            name: this._inputName.value,
            checked: false,
        }

        this.setState((state) => {
            return ({
                tasks: state.tasks.concat(newTask)
            });
        })

        this._inputName.value = '';
    }


    removeTask = (taskID) => {
        this.setState(state => {
            return ({
                tasks: state.tasks.filter(task => task.id !== taskID)
            });
        });
    }


    updateTask = (taskID) => {
        this.setState(state => {
            const tasks = state.tasks.map(task => {
                if (task.id === taskID) {
                    const newTask = {
                        id: task.id,
                        name: task.name,
                        checked: !task.checked,
                    }
                    return newTask
                }
                return task
            })
            return ({
                tasks: tasks
            })
        });
    }

    render() {
        return (
            <div className="adding">
                <form onSubmit={this.addTask}>
                    <input ref={(element) => { this._inputName = element; }} type="text" placeholder="enter task" />
                    <button className='add' type="submit">add</button>
                </form>
                <TasksList tasksList={this.state.tasks} removeTaskMethod={this.removeTask} completeTaskMethod={this.completeTask} updateTaskMethod={this.updateTask} />
            </div>
        );
    }
}

export default Tasks;