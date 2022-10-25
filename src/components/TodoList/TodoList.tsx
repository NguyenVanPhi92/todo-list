import React, { useState } from 'react'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import TaskInput from '../TaskInput/TaskInput'
import { Todo } from '../../@Types/todo.type'

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
    const doneTodos = todos.filter((todo) => todo.done)
    const notDoneTodos = todos.filter((todo) => !todo.done)

    //handle
    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }

        setTodos((prev) => [...prev, todo])

        const todoStrings = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todoStrings || '[]')
        const newTodosObj = [todos, todo]
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }

                return todo
            })
        })
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id)
        if (findedTodo) setCurrentTodo(findedTodo)
    }

    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) setCurrentTodo(null)

        setTodos((prev) => {
            const finedIndexTodo = prev.findIndex((todo) => todo.id === id)
            if (finedIndexTodo > -1) {
                const result = [...prev]
                result.splice(finedIndexTodo, 1)
                return result
            }

            return prev
        })
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} />
                <TaskList
                    doneTaskList={false}
                    todos={notDoneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    doneTaskList
                    todos={doneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    )
}
