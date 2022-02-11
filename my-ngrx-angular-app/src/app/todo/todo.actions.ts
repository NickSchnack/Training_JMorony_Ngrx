import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const addTodo = createAction(
    '[Todo Component] Add Todo',
    props<{ content: string }>()
);

export const deleteTodo = createAction(
    '[Todo Component] Delete Todo',
    props<{ guid: string }>()
);

export const completeTodo = createAction(
    '[Todo Component] Complete Todo',
    props<{ guid: string }>()
);

export const uncompleteTodo = createAction(
    '[Todo Component] Uncomplete Todo',
    props<{ guid: string }>()
);

export const loadTodos = createAction('[Todo Component] Load Todos');

export const loadTodosSuccess = createAction(
    '[Todo API] Todo Load Success',
    props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
    '[Todo API] Todo Load Failure',
    props<{ error: string }>()
);
