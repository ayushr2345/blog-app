import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import IBlog from "../../interfaces/Blog.interface";
import IUser from "../../interfaces/User.interface";
import {
  DeleteALLBlogs,
  DeleteUser,
  GetAllBlogs,
  logOutUser,
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
  const [showAccountDelete, setShowAccountDelete] = useState(false);

  const [user, setUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
  });
  const [blogList, setBlogList] = useState<Blog[]>([]);

  const newUser = useOutletContext<{ user: Partial<IUser> }>().user;
  useEffect(() => {
    if (newUser) {
      setUser(newUser);
      GetAllBlogs().then((e) => {
        setBlogList(e);
        // console.log(user, blogList)
      });
    }
  }, [newUser]);

  const handleCloseAccountDelete = () => setShowAccountDelete(false);
  const handleShowAccountDelete = () => setShowAccountDelete(true);

  const handleAccountDelete = async () => {
    handleCloseAccountDelete();
    navigate("/")
    await DeleteALLBlogs(user).then((e) => {
      console.log(e);
    });
    await DeleteUser(user).then((e) => {
      console.log(e);
    });
    window.location.reload();
    logOutUser().then((e) => {
      console.log(e)
    });

  };
  return (
    <div>
      {/* PROFILE */}
      <div className="profile">
        <div className="user-name">{user.name}</div>
        <br />
        <div className="user-email">
          {user.email} <br />
          <LinkContainer className="goto-dashboard" to="/auth/dashboard">
            <a>Go to Dashboard</a>
          </LinkContainer>
        </div>
        <br />
        <div>Edit Profile</div>
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
