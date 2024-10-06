import React from "react";
import { Checkbox, List } from "antd";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <List.Item>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)}>
        {task.title}
      </Checkbox>
    </List.Item>
  );
};
