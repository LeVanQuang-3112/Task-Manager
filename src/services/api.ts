import axios from "axios";

const API_URL = "/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  if (!response) {
    throw new Error("Failed to fetch tasks");
  }
  return response;
};

export const createTask = async (title: string) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};
