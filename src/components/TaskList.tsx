import React from "react";
import { List } from "antd";
import { TaskItem } from "./TaskItem";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <List
      style={{ marginTop: 20, height: 350, overflowY: "auto" }}
      dataSource={tasks}
      renderItem={(task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
      )}
    />
  );
};
