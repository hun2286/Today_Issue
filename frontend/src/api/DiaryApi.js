// src/api/DiaryApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8000/diaries";

export const getDiaries = async () => {
  const res = await axios.get(BASE_URL + "/");
  return res.data;
};

export const createDiary = async (data) => {
  const res = await axios.post(BASE_URL + "/", data);
  return res.data;
};

export const deleteDiary = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
