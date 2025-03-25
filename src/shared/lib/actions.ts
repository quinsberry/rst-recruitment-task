import { typeToFlattenedError } from 'zod';

export const createAction = <T, P>(action: (state: ActionState<T>, payload: P) => Promise<ActionState<T>>) => {
    return (state: ActionState<T>, payload: P) => {
        return action(state, payload);
    };
};
export type ActionState<T> = IdleActionState<T> | SuccessActionState<T> | ErrorActionState<T> | ValidationErrorActionState<T>;
export interface SuccessActionState<T> {
    status: 'success';
    message: string;
    data: T;
}

export interface ErrorActionState<T> {
    status: 'error';
    message: string;
    error: string;
}

export interface ValidationErrorActionState<T> {
    status: 'validationError';
    message: string;
    validationErrors: typeToFlattenedError<T>;
}

export interface IdleActionState<T> {
    status: 'idle';
    message: string;
    data?: T;
    error?: string | undefined;
    validationErrors?: typeToFlattenedError<T> | undefined;
}