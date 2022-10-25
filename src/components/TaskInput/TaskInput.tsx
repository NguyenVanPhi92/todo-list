import React, { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@Types/todo.type'

interface TaskInputProps {
    addTodo: (name: string) => void
    editTodo: (name: string) => void
    currentTodo: Todo | null
}

export default function TaskInput(props: TaskInputProps) {
    const { addTodo, editTodo, currentTodo } = props
    const [name, setName] = useState<string>('')

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setName(value)
        currentTodo ? editTodo(value) : setName(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTodo(name)
        setName('')
    }

    return (
        <div className='mb-2'>
            <h1 className={styles.title}>TO DO LIST</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='caption goes here'
                    value={currentTodo ? currentTodo.name : name}
                    onChange={handleChangeInput}
                />
                <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
            </form>
        </div>
    )
}
