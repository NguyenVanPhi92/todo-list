import React from 'react'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import TaskInput from '../TaskInput/TaskInput'

export default function TodoList() {
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput />
                <TaskList doneTaskList={false} />
                <TaskList doneTaskList />
            </div>
        </div>
    )
}
