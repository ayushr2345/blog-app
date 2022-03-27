import React, { FC, useEffect, useState } from "react";
import BlogCard from "./Card";
import IBlog from "../../interfaces/Blog.interface";
import DUMMY_BLOGS from "../DUMMY_BLOGS";
import { Button, Form } from "react-bootstrap";
import { logOutUser } from "../../services/userService";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import IUser from "../../interfaces/User.interface";

type Blog = {
  title: string;
  article: string;
};

//const Dashboard: FC<Partial<IUser>> = (user: Partial<IUser>) => {
function Dashboard() {
  const [user, setUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
  });
  const newUser = useOutletContext<{ user: Partial<IUser> }>().user;

  useEffect(() => {
    if (newUser) {
      setUser(newUser);
    }
  }, [user]);
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({
    title: "",
    article: "",
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(blog);
  };
  return (
    <div className="blogs">
      {/* BLOGS */}
      <div>
        {DUMMY_BLOGS.map((blog: IBlog, index) => {
          return <BlogCard blog={blog} key={index} />;
        })}
        <div className="break">That's it for now</div>
      </div>

      {/* PROFILE */}
      <div className="user">
        <div className="user-name">{user.name}</div>
        <br />
        <div className="user-email">{user.email}</div>
        <br />

        {/* Create a Blog */}

        <Form className="form">
          <Form.Label className="heading">Post a new Article</Form.Label>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              required
              name="title"
              type="text"
              placeholder="Title"
              onChange={(event) => {
                const title = event.currentTarget.value;
                setBlog({
                  ...blog,
                  title: title,
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="article">
            <Form.Control
              required
              name="article"
              as="textarea"
              rows={5}
              placeholder="Sart typing"
              onChange={(event) => {
                const article = event.currentTarget.value;
                setBlog({
                  ...blog,
                  article: article,
                });
              }}
            />
          </Form.Group>

          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            className="button-form"
          >
            Post
          </Button>
        </Form>

        <Button
          className="logout-button button-form"
          variant="outline-danger"
          size="sm"
          onClick={async () => {
            await logOutUser();
            navigate("/");
          }}
        >
          Log Out
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
