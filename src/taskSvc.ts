import { Task } from "./types";

/**
 * A fake "database" class for tasks.
 * In real life, you'd query an actual DB here.
 * For testing, we can mock these methods.
 */
export class TaskService {
  private tasks: Task[];

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks;
  }

  public getAll(): Task[] {
    return this.tasks;
  }

  public forUser(userId: number): Task[] {
    // Return only tasks matching the given userId
    return this.tasks.filter((task) => task.userId === userId);
  }

  public create(newTask: Task): Task {
    this.tasks.push(newTask);
    return newTask;
  }
}
