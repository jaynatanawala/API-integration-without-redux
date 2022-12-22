import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { createTutorial, fetchTutorial } from "../apis/tutorial";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Link, Outlet } from "react-router-dom";

function Tutorial() {
  const [showModal, setShowModal] = useState(false);
  const [tutorialList, setTutorialList] = useState([]);

  useEffect(() => {
    callListTutorial();
  }, []);

  const callListTutorial = async () => {
    const result = await fetchTutorial();

    if (result.data?.success) {
      setTutorialList(result.data?.data);
    }
  };

  const submit = async (body) => {
    try {
      const result = await createTutorial(body);

      console.log("result ", result);
      if (result?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          confirmButtonColor: "#267FEA",
          text: "Tutorial created successfully!",
        });
      }
      setShowModal(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-2">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create Tutorial
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Tutorial</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          onSubmit={submit}
        >
          <Modal.Body>
            <Form>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  className="form-control"
                />
              </div>

              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Formik>
      </Modal>

      {/* tutorial listing */}
      <div className="row">
        <h5 className="mb-0 mt-4">List of Tutorials</h5>
        {tutorialList.length &&
          tutorialList.map((item) => (
            <div className="col-4" key={item.id}>
              <Link to={`/${item.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="card mt-4"
                  style={{ width: "18rem", cursor: "pointer" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      {/* <Outlet /> */}
    </div>
  );
}

export default Tutorial;
