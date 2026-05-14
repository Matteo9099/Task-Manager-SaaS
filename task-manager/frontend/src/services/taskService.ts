// UI -> Services -> API
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/tasks";

export const getTasks = async () => {

  const response = await axios.get(API_URL);

  return response.data;
};

export const createTask = async (
  title: string,
  description: string
) => {

  const response = await axios.post(API_URL, {
    title,
    description,
  });

  return response.data;
};

export const deleteTask = async (
  id: number
) => {

  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTask = async (
  id: number
) => {

  const response = await axios.patch(
    `${API_URL}/${id}/toggle`
  );

  return response.data;
};