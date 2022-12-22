import axios from "axios";
import { GET_TUTORIAL_BY_ID, TUTORIAL } from "../lib/constant";

export const createTutorial = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/${TUTORIAL}`,
    payload
  );
};

export const fetchTutorial = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/${TUTORIAL}`);
};

export const fetchTutorialById = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/${GET_TUTORIAL_BY_ID}/${id}`
  );
};
