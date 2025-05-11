import request from "supertest";
import app from "../src/index";
// We can also import TaskService, but we’ll show mocking in example test below.
// import { TaskService } from "../src/services/TaskService";

describe("User & Task API", () => {
  /**
   * BUG FIX TEST:
   * We want to ensure GET /api/tasks?userId=1
   * returns only tasks with userId === 1.
   */
  it("GET /api/tasks?userId=1 => returns tasks that belong only to user 1", async () => {
    const res = await request(app).get("/api/tasks?userId=1");
    expect(res.status).toBe(200);
    // Check that all tasks belong to userId 1
    res.body.forEach((task: any) => {
      expect(task.userId).toBe(1);
    });
  });

  /**
   * FEATURE TEST:
   * DELETE /api/users/:id => removes a user (or returns a 404 if the user is not found)
   */
  it("DELETE /api/users/:id => should delete the user or return 404", async () => {
    // TODO: Implement this test
    expect("this test").toBe("implemented");
  });

  it("GET /api/users/:id => returns 404 if user is not found", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("GET /api/users/:id => returns user if found", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Alice");
  });

  it("POST /api/users => creates a new user", async () => {
    const newUser = { name: "Bob", permissions: ["USER"] };
    const res = await request(app)
      .post("/api/users")
      .send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Bob");
    expect(res.body.permissions).toEqual(["USER"]);
    expect(res.body.id).toBeDefined();
  });

  it("POST /api/tasks => creates a new task", async () => {
    const newTask = { userId: 1, title: "Test Task", status: "TODO" };
    const res = await request(app)
      .post("/api/tasks")
      .send(newTask);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.userId).toBe(1);
    expect(res.body.status).toBe("TODO");
    expect(res.body.id).toBeDefined();
  });
});
