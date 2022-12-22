import axios from "axios";
import { CREATE_COMMENT, get_COMMENT_by_id } from "../lib/constant";

export const createComment = async (payload) => {
  console.log(`${process.env.REACT_APP_API_URL}/${CREATE_COMMENT}`);
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/${CREATE_COMMENT}`,
    payload
  );
};

export const getComment = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/${get_COMMENT_by_id}`
  );
};
