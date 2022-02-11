import { createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../models/todo.model';
import { addTodo,
    deleteTodo,
    completeTodo,
    uncompleteTodo,
    loadTodos,
    loadTodosSuccess,
    loadTodosFailure } from './todo.actions';

export interface TodoState {
    todos: Todo[],
    error: string,
    status: 'pending' | 'loading' | 'success' | 'error'
};

export const initialState: TodoState = {
    todos: [],
    error: '',
    status: 'pending'
};

export const todoReducer = createReducer (
    initialState,

    on(addTodo, (state, {content}) => ({
        ...state,
        todos: [...state.todos, { guid: uuidv4(), name: content, isComplete: false}]
    })),

    on(deleteTodo, (state, {guid}) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.guid !== guid)
    })),

    on(completeTodo, (state, {guid}) => {
        let todoIndex = state.todos.findIndex((t) => t.guid == guid);
        return {
            ...state,
            todos: [
                ...state.todos.slice(0,todoIndex),
                {
                    ...state.todos[todoIndex],
                    isComplete: true
                },
                ...state.todos.slice(todoIndex + 1)
            ]
        }
    }),
    
    on(uncompleteTodo, (state, {guid}) => {
        let todoIndex = state.todos.findIndex((t) => t.guid == guid);
        return {
            ...state,
            todos: [
                ...state.todos.slice(0,todoIndex),
                {
                    ...state.todos[todoIndex],
                    isComplete: false
                },
                ...state.todos.slice(todoIndex + 1)
            ]
        }
    }),

    on(loadTodos, (state) => ({ ...state, status: 'loading' })),

    on(loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos: todos,
        error: '',
        status: 'success'
    })),

    on(loadTodosFailure, (state, { error }) => ({
        ...state,
        error: error
    })),

);

