/**
 * Enums & Interfaces for Users & Tasks
 */

export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export type UserPermission = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    permissions: UserPermission[];
}

export interface Task {
    id: number;
    userId: number;
    title: string;
    status: TaskStatus;
}
