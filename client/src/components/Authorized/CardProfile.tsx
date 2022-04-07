import React, { FC, useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import IBlog from "../../interfaces/Blog.interface";
import { DeleteABlog, GetUser, UpdateABlog } from "../../services/userService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Dashboard.css";

type Props = {
  blog: IBlog;
};

const BlogCardProfile: FC<Props> = ({ blog }) => {
  const date = new Date();
  const [updatedBlog, setUpdatedBlog] = useState<IBlog>({
    title: "",
    article: "",
    _id: "",
    authorId: "",
    datePublished: date,
  });
  useEffect(() => {
    setUpdatedBlog(blog);
  }, []);
  const [userName, setUserName] = useState<String>("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    setShow(true);
  };
  GetUser(blog).then((res) => {
    setUserName(res.user.name);
  });

  const handleEdit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    //console.log(updatedBlog);
    await UpdateABlog(updatedBlog).then((e) => {
      console.log(e);
      setUpdatedBlog(e.updatedBlog)
    });
  };

  const handleDelete = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    await DeleteABlog(blog._id).then((e) => {
      //console.log(blog._id);
      //console.log(e);
    });
  };

  return (
    <Card className="blog-card-profile">
      <Card.Body>
        <LinkContainer to={"/auth/blog/" + blog._id}>
          <a>
            <Card.Title>{blog.title}</Card.Title>
          </a>
        </LinkContainer>
        <Card.Subtitle className="mb-2 text-muted">{userName}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted card-date">
          {blog.datePublished.toString().slice(0, 10)}
        </Card.Subtitle>
        <Card.Text className="article-text">
          {blog.article.slice(0, 300) + "..."}
        </Card.Text>
        <a href="">
          <EditIcon className="edit-icon" onClick={handleShow}></EditIcon>
        </a>
        <a href="">
          <DeleteIcon className="delete-icon" onClick={handleDelete} />
        </a>

        {/* modal to edit the blog */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedBlog.title}
                  autoFocus
                  onChange={(event) => {
                    const title = event.currentTarget.value;
                    setUpdatedBlog({
                      ...updatedBlog,
                      title: title,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Blog</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  value={updatedBlog.article}
                  onChange={(event) => {
                    const article = event.currentTarget.value;
                    setUpdatedBlog({
                      ...updatedBlog,
                      article: article,
                    });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default BlogCardProfile;
