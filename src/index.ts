import express, { Request, Response } from "express";
import  { type User, type Task, TaskStatus } from "./types";
import { TaskService } from "./taskSvc";

const app = express();
app.use(express.json());

let users: User[] = [
    { id: 1, name: "Alice", permissions: ["USER"] },
    { id: 2, name: "Raj", permissions: ["USER"] }
];

const taskService = new TaskService([
    { id: 101, userId: 1, title: "Buy groceries", status: TaskStatus.TODO },
    { id: 102, userId: 2, title: "Walk the dog", status: TaskStatus.IN_PROGRESS },
]);

/**
 * GET /api/users/:id
 * Returns the user with the given ID, or 404 if not found.
 */
app.get("/api/users/:id", (req: Request, res: Response) => {
    
    if (!req.params.id){
        return res.status(400).json({ error: "User ID is required" });
    }
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
});

/**
 * BUG: GET /api/tasks
 * This route should filter by `userId` if provided as a query param,
 * but currently it does NOT filter at all; it just returns all tasks.
 */
app.get("/api/tasks", (req: Request, res: Response) => {
    const userIdParam  = req.query.userId as string
    const userId = parseInt(userIdParam, 10)
    const allTask = taskService.getAll();
    if(userId) {
        let filteredTask : Task[] = [];
        for(const task of allTask){
            if(task.userId === userId){
                filteredTask.push(task);
            }
    }

        return res.json(filteredTask)
    }else{
        return res.json(allTask)
    }
});

/**
 * POST /api/users
 * Creates a new user.
 */
app.post("/api/users", (req: Request, res: Response) => {
    const { name, permissions } = req.body;

    // Basic validation
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    // We'll assume permissions is optional; default to ["USER"]
    const newUser: User = {
        id: users.length + 1,
        name,
        permissions: permissions || ["USER"],
    };

    users.push(newUser);
    return res.status(201).json(newUser);
});

/**
 * POST /api/tasks
 * Creates a new task for a given user.
 */
app.post("/api/tasks", (req: Request, res: Response) => {
    const { userId, title, status } = req.body;

    if (!userId || !title) {
        return res
            .status(400)
            .json({ error: "userId and title are required fields" });
    }

    // Validate user exists
    const userExists = users.some(u => u.id === userId);
    if (!userExists) {
        return res.status(400).json({ error: "Invalid userId" });
    }

    // Validate status is one of our enum values, default to TODO
    const validStatus = Object.values(TaskStatus).includes(status);
    const newTask: Task = {
        id: Date.now(),
        userId,
        title,
        status: validStatus ? status : TaskStatus.TODO,
    };

    taskService.create(newTask);
    return res.status(201).json(newTask);
});

/**
 * TODO: Implement DELETE /api/users/:id
 */

app.delete("/api/user/:idParam", (req: Request, res: Response) => {
    const { idParam } = req.params;
    if(idParam){
        const id = parseInt(idParam, 10);
        users = users.filter(user => user.id !== id)
        return res.json(users)
    }
})


// Listen (for local dev)
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}

export default app;

