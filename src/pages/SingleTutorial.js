import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTutorialById } from "../apis/tutorial";
import { createComment, getComment } from "../apis/comment";

function SingleTutorial(props) {
  const { id } = useParams();
  const [tutorial, settutorial] = useState();
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    callTutorialDetail();
  }, [id, commentText]);

  const callTutorialDetail = async () => {
    const result = await fetchTutorialById(id);

    if (result.data.success) {
      settutorial(result.data.data);
    } else {
      setError(result.data.message);
    }
  };

  const submitComment = async () => {
    setCommentText("");

    const dataToPass = {
      name: commentText,
      text: commentText,
      tutorialId: parseInt(id),
    };
    const result = await createComment(dataToPass);

    if (result.data?.success) {
      setCommentText("");
    }
  };

  return (
    <div>
      {error ? (
        error
      ) : tutorial ? (
        <div className="container mt-4 w-50">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{tutorial.title}</h5>
              <p className="card-text">{tutorial.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              {tutorial.comments.length
                ? tutorial.comments.map((item) => (
                    <li className="list-group-item">{item.text}</li>
                  ))
                : "No comments found"}
            </ul>
            <div className="card-body d-flex">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Enter comment"
                value={commentText}
              />
              <button
                type="button"
                className="btn btn-primary"
                disabled={commentText === ""}
                onClick={() => submitComment()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">No data found</h1>
      )}
    </div>
  );
}

export default SingleTutorial;
