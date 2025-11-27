import axios from "axios";

const API_URL = "http://127.0.0.1:8000/diaries/";

// 일기 생성
export const createDiary = async (diary) => {
  const res = await axios.post(API_URL, diary);
  return res.data;
};

// 일기 목록 조회
export const getDiaries = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
