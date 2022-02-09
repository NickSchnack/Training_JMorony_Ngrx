import { createAction, props } from '@ngrx/store';

export const addTodo = createAction(
    '[Todo Component] Add Todo',
    props<{content: string}>()
);

export const deleteTodo = createAction(
    '[Todo Component] Delete Todo',
    props<{guid: string}>()
);

