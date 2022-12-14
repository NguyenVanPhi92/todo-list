import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Todo } from '../../@Types/todo.type'
import styles from './taskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

interface TaskInputProps {
    addTodo: (name: string) => void
    editTodo: (name: string) => void
    currentTodo: Todo | null
    finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
    const { addTodo, editTodo, currentTodo, finishEditTodo } = props
    const [name, setName] = useState<string>('')

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setName(value)
        currentTodo ? editTodo(value) : setName(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentTodo) {
            finishEditTodo()

            if (name) setName('')
        } else {
            addTodo(name)
            setName('')
        }
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

TaskInput.propType = {
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
    finishEditTodo: PropTypes.func.isRequired
}
