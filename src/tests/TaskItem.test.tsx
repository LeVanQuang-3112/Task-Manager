import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskItem } from "../components/TaskItem";
import { Task } from "../types/task";

describe("TaskItem", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    completed: false,
  };

  const mockOnToggle = jest.fn();

  it("renders task item with checkbox and title", () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    // Kiểm tra tiêu đề của task có hiển thị hay không
    expect(screen.getByText("Test Task")).toBeInTheDocument();

    // Kiểm tra checkbox có hiển thị hay không
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  it("calls onToggle with task id when checkbox is clicked", () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Giả lập hành động click vào checkbox
    fireEvent.click(checkbox);

    // Kiểm tra xem onToggle có được gọi với id của task không
    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("marks checkbox as checked when task is completed", () => {
    // Tạo task hoàn thành
    const completedTask: Task = { ...mockTask, completed: true };

    render(<TaskItem task={completedTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Kiểm tra checkbox có được đánh dấu là hoàn thành hay không
    expect(checkbox.checked).toBe(true);
  });
});
