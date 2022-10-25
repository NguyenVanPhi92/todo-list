import React, { useEffect, useState } from 'react'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import TaskInput from '../TaskInput/TaskInput'
import { Todo } from '../../@Types/todo.type'

interface HandlerNewTodos {
    (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: HandlerNewTodos) => {
    const todoString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todoString || '[]')
    const newTodosObj = handleNewTodos(todosObj)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
    const doneTodos = todos.filter((todo) => todo.done)
    const notDoneTodos = todos.filter((todo) => !todo.done)

    useEffect(() => {
        const todoString = localStorage.getItem('todos')
        const todosObj: Todo[] = JSON.parse(todoString || '[]')
        setTodos(todosObj)
    }, [])

    //handle
    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }

        setTodos((prev) => [...prev, todo])
        syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
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

    const finishEditTodo = () => {
        const handler = (todoObj: Todo[]) => {
            return todoObj.map((todo) => {
                // as => ép kiểu sang kiểu Todo và không bao giờ null
                if (todo.id === (currentTodo as Todo).id) return currentTodo as Todo
                return todo
            })
        }
        setTodos(handler)
        setCurrentTodo(null)
        syncReactToLocal(handler)
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) setCurrentTodo(null)

        const handler = (todosObj: Todo[]) => {
            const finedIndexTodo = todosObj.findIndex((todo) => todo.id === id)
            if (finedIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(finedIndexTodo, 1)
                return result
            }

            return todosObj
        }
        setTodos(handler)
        syncReactToLocal(handler)
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput
                    addTodo={addTodo}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                    finishEditTodo={finishEditTodo}
                />
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
