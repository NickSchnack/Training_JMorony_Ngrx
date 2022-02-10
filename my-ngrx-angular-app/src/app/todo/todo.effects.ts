import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "../app.state";
import { TodoService } from "../services/todo.service";
import { catchError, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectAllTodos } from '../todo/todo.selectors'
import { addTodo,
    deleteTodo,
    loadTodos,
    loadTodosFailure,
    loadTodosSuccess } from "./todo.actions";

@Injectable()
export class TodoEffects {
    
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private todoService: TodoService
    ) {}

    // Run this code when loadTodos action is dispatched
    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            switchMap(() =>
                // Call the getTodos method, convert it to an observable
                from(this.todoService.getTodos()).pipe(
                    // Take the returned value and return a new success action containing the todos
                    map((todos) => loadTodosSuccess({ todos: todos })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => of(loadTodosFailure({ error })))
                )
            )
        )
    );
    
    // Run this code when the addTodo or deleteTodo action is dispatched
    saveTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTodo, deleteTodo),
            withLatestFrom(this.store.select(selectAllTodos)),
            switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
        ),
        // Most effects dispatch after another action, but this one is just a "fire and forget" effect
        { dispatch: false }
    );
}


