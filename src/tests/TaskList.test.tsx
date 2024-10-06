import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskList } from "../components/TaskList";
import { Task } from "../types/task";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

describe("TaskList", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  const mockOnToggleTask = jest.fn();

  it("renders a list of tasks", () => {
    render(<TaskList tasks={mockTasks} onToggleTask={mockOnToggleTask} />);

    // Kiểm tra xem cả hai task có được render hay không
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("calls onToggleTask with correct task id when a task is clicked", () => {
    render(<TaskList tasks={mockTasks} onToggleTask={mockOnToggleTask} />);

    // Giả lập hành động click vào checkbox của task 1
    const task1Checkbox = screen.getByLabelText("Task 1");
    fireEvent.click(task1Checkbox);

    // Kiểm tra xem onToggleTask có được gọi với id của task 1 hay không
    expect(mockOnToggleTask).toHaveBeenCalledWith("1");
  });

  it("renders with a scrollable list when there are many tasks", () => {
    const manyTasks: Task[] = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Task ${i + 1}`,
      completed: false,
    }));

    const { container } = render(
      <TaskList tasks={manyTasks} onToggleTask={jest.fn()} />
    );

    // Tìm phần tử cụ thể có overflow-y: auto
    // eslint-disable-next-line testing-library/no-container
    const scrollableElement = container.querySelector(".ant-list"); // Điều chỉnh nếu class chính xác là khác

    expect(scrollableElement).toHaveStyle("overflow-y: auto");
  });
});
