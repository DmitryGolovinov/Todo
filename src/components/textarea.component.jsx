import React from 'react'

export default class TextArea extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            tasks: [
                {
                    value: 'Make a new task',
                    completed: false,
                    id: 0,
                    deleted: false,
                    date: new Date()
                },
                {
                    value: 'Enter the website',
                    completed: true,
                    id: 1,
                    deleted: false,
                    date: new Date()
                }
            ],
            isValueExists: false,
            isValueEmpty: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.reverseArray = this.reverseArray.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidUpdate() {
    
    }

    handleOnClick(e) {
        e.preventDefault()
        // if value is empty or it already exists console.log it
        let isValueExists = false;
        let isValueEmpty = false;
        this.state.tasks.map(task => {
            if (task.value === this.state.value && task.completed === false) {
                // it already exists
                isValueExists = true
            }
            if (this.state.value === '') {
                isValueEmpty = true
            }
            return null
        })
        if (isValueExists || isValueEmpty) {
            if (isValueExists) {
                this.setState({isValueExists: true, isValueEmpty: false})
            } else if (isValueEmpty) {
                this.setState({isValueEmpty: true, isValueExists: false})
            }
        } else {
            const newTask = {
                value: this.state.value,
                completed: false,
                deleted: false,
                id: this.state.tasks.length,
                date: new Date()
            }
            let newTasks = this.state.tasks;
            newTasks.push(newTask)
             this.setState({
                tasks: newTasks,
                isValueEmpty: false,
                isValueExists: false
            });
            console.log(this.state);
        }
    }

    handleChange(e){
        this.setState({value: e.target.value})
    }

    reverseArray(array) {
        let reversedArray = array.reverse()
        return reversedArray
    }

    completeTask(id) {
        let newTasks = this.state.tasks;
        let iteration = true
        let i = 0
        while (iteration) {
            if (newTasks[i].id === id) {
                console.log(`task ${i} has been completed`);
                newTasks[i].completed = true;
                this.setState({
                    tasks: newTasks
                })
                iteration = false
            } else {
                i++
            }  
        this.setState({
            tasks: newTasks
        })
    }
}

    deleteTask(id) {
        let newTasks = this.state.tasks;
        let iteration = true
        let i = 0
        while (iteration) {
            if (newTasks[i].id === id) {
                console.log(`task ${i} has been deleted`);
                newTasks[i].deleted = true;
                this.setState({
                    tasks: newTasks
                })
                iteration = false
            } else {
                i++
            }  
        }
    }

    handleEnterPress(e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            this.handleOnClick(e);
        }
    }

    render() {
        return (
            <div>
                <div className="textArea ">
                    <form onSubmit={this.handleOnClick} className='general-form'>
                    <textarea onKeyDown={this.handleEnterPress} onChange={(e) => this.handleChange(e)} placeholder= 'Enter any activity' name="" id="" cols="30" rows="2"></textarea>
                    <button type='submit'>Submit</button>
                    </form>
                    </div>
                    <div className='errors'>
                    {this.state.isValueEmpty ? "You haven't entered the task" : null}
                    {this.state.isValueExists ? "The entered task already exists" : null}
                    </div>
                <div className="columns">
                    <div className='list'>
                        <p className='list-label'>Your tasks:</p>
                        <ul className='list'>
                            {(
                            this.reverseArray(this.state.tasks).map(task => {
                                if (!task.completed) {
                                    return <li key={task.id}>
                                    <div className='action'>
                                <p className='goal'>{task.value}</p>
                                        <button onClick={() => this.completeTask(task.id)}className='do-action-button'><i className="fas fa-check-square"></i></button>
                                    </div>
                                    </li>
                                } else {
                                    return null;
                                }
                            }))}
                        </ul>
                    </div>
                    <div className='list'>
                        <p className='list-label'>Completed tasks:</p>
                        <ul className='list'>
                            { (
                                this.state.tasks.map(task => {
                                    if (task.completed && task.deleted === false) {
                                        return <li key={task.id}>
                                        <div className='action'>
                                            <p className='goal'>{task.value}</p>
                                            <button onClick={() => this.deleteTask(task.id)} className='do-action-button'><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                        </li>
                                    } 
                                     else {
                                        return null;
                                    }
                                })
                            )}
                        </ul>
                    </div>
                </div>
                    
            </div>
        )
    }
}
