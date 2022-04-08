import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import IBlog from "../../interfaces/Blog.interface";
import IUser from "../../interfaces/User.interface";
import {
  DeleteALLBlogs,
  DeleteUser,
  GetAllBlogs,
} from "../../services/userService";
import BlogCardProfile from "./CardProfile";
import "./Profile.css";

type Blog = {
  _id: String;
  authorId: String;
  title: string;
  article: string;
  datePublished: Date;
};

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
  });
  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
  });

  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [showAccountDelete, setShowAccountDelete] = useState(false);
  const [showAccountEdit, setShowAccountEdit] = useState(false);

  const newUser = useOutletContext<{ user: Partial<IUser> }>().user;
  useEffect(() => {
    if (newUser) {
      setUser(newUser);
      GetAllBlogs().then((e) => {
        setBlogList(e);
        console.log(user, blogList);
        setUpdatedUser(newUser);
      });
    }
  }, [newUser]);

  const handleCloseAccountDelete = () => setShowAccountDelete(false);
  const handleShowAccountDelete = () => setShowAccountDelete(true);

  const handleCloseAccountEdit = () => setShowAccountEdit(false);
  const handleShowAccountEdit = () => setShowAccountEdit(true);

  const handleAccountDelete = async () => {
    handleCloseAccountDelete();
    navigate("/");
    await DeleteALLBlogs(user);
    await DeleteUser(user);
  };
  return (
    <div>
      {/* PROFILE */}
      <div className="profile">
        <div className="user-name">{updatedUser.name}</div>
        <br />
        <div className="user-email">
          {updatedUser.email} <br />
          <LinkContainer className="goto-dashboard" to="/auth/dashboard">
            <a>Go to Dashboard</a>
          </LinkContainer>
        </div>
        <br />

        {/* EDIT ACCOUNT SECTION */}
        <Button
          variant="primary"
          className="edit-profile-button"
          onClick={handleShowAccountEdit}
        >
          Edit Profile
        </Button>
        {/* Modal to Edit Profile */}
        <Modal show={showAccountEdit} onHide={handleCloseAccountEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedUser.name}
                  onChange={(event) => {
                    const name = event.currentTarget.value;
                    setUpdatedUser({
                      ...updatedUser,
                      name: name,
                    });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseAccountEdit}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCloseAccountEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <br />
        {/* DELETE ACCOUNT SECTION */}
        <Button
          variant="danger"
          className="delete-profile-button"
          onClick={handleShowAccountDelete}
        >
          Delete Profile
        </Button>

        {/* Modal to confirm Deletion */}
        <Modal show={showAccountDelete} onHide={handleCloseAccountDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="danger">
              Are you sure you want to delete the profile?
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAccountDelete}>
              No
            </Button>
            <Button variant="danger" onClick={handleAccountDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="my-blogs">
        <div className="break-form">----- MY BLOGS ----</div>
        <div>
          {blogList.map((blog: IBlog, _id) => {
            if (blog.authorId === user._id) {
              return <BlogCardProfile blog={blog} key={_id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
