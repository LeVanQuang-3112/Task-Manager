import { http, HttpResponse } from "msw";
import { Task } from "../types/task";

interface CreateTaskRequest {
  title: string;
}

let tasks: Task[] = [
  { id: "1", title: "Test English", completed: false },
  { id: "2", title: "Build a todo app", completed: true },
  { id: "3", title: "Build a landing page", completed: true },
];

export const handlers = [
  http.get("/tasks", async () => {
    return HttpResponse.json({
      items: tasks,
      totalItems: tasks.length,
    });
  }),

  http.post<never, CreateTaskRequest>("/tasks", async ({ request }) => {
    const data = (await request.json()) as CreateTaskRequest;

    if (typeof data.title !== "string") {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request: Title must be a string",
      });
    }

    const newTask: Task = {
      id: String(tasks.length + 1),
      title: data.title,
      completed: false,
    };
    tasks.push(newTask);

    return HttpResponse.json(newTask, { status: 201 });
  }),
];
