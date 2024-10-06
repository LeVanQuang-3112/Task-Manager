import { useState, useEffect, useCallback } from "react";
import { Task } from "../types/task";
import { fetchTasks, createTask } from "../services/api";
import { EStatus } from "../utils/constant";

type FilterType = EStatus.ALL | EStatus.COMPLETED | EStatus.IN_COMPLETE;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>(EStatus.ALL);

  const loadTasks = useCallback(async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks.data.items);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(async (title: string) => {
    try {
      const newTask = await createTask(title);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === EStatus.COMPLETED) return task.completed;
    if (filter === EStatus.IN_COMPLETE) return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    filter,
    setFilter,
  };
};
