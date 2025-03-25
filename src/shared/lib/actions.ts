import { typeToFlattenedError } from 'zod';

export type Action<T, P> = (state: ActionState<T>, payload: P) => Promise<ActionState<T>>;

export const createAction = <T, P>(action: Action<T, P>) => {
    return (state: ActionState<T>, payload: P) => {
        return action(state, payload);
    };
};

export type ActionState<T> =
    | IdleActionState<T>
    | SuccessActionState<T>
    | ErrorActionState
    | ValidationErrorActionState<T>;
export interface SuccessActionState<T> {
    status: 'success';
    message: string;
    data: T;
}

export interface ErrorActionState {
    status: 'error';
    message: string;
    data: null;
    error: string;
}

export interface ValidationErrorActionState<T> {
    status: 'validationError';
    message: string;
    data: null;
    validationErrors: typeToFlattenedError<T>;
}

export interface IdleActionState<T> {
    status: 'idle';
    message: string;
    data: T | null;
    error?: string | undefined;
    validationErrors?: typeToFlattenedError<T> | undefined;
}
