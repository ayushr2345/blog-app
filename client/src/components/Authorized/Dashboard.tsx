import React, { FC, useEffect, useState } from "react";
import BlogCard from "./Card";
import IBlog from "../../interfaces/Blog.interface";
import { Button, Form } from "react-bootstrap";
import { AddBlog, GetAllBlogs, logOutUser } from "../../services/userService";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import IUser from "../../interfaces/User.interface";

type Blog = {
  _id: Number;
  authorId: Number;
  title: string;
  article: string;
  datePublished: Date;
};

//const Dashboard: FC<Partial<IUser>> = (user: Partial<IUser>) => {
function Dashboard() {
  const date = new Date();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({
    title: "",
    article: "",
    _id: 0,
    authorId: 0,
    datePublished: date,
  });
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
      });
    }
  }, [user]);

  // console.log(blogList);
  // console.log(user);
  //console.log(blogList);

  const validateForm = () => {
    if (blog.article.length > 0 && blog.title.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validateForm()) {
      await AddBlog(blog);
      GetAllBlogs().then((e) => {
        setBlogList(e);
      });
      setBlog({
        title: "",
        article: "",
        _id: 0,
        authorId: 0,
        datePublished: date,
      });
    } else {
      navigate("/");
    }
  };
  return (
    <div className="blogs">
      {/* Create a Blog */}
      <Form className="form">
        <Form.Label className="heading">Post a new Article</Form.Label>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            required
            name="title"
            value={blog.title}
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
            value={blog.article}
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
          variant="outline-dark"
          type="submit"
          className="button-form-submit"
        >
          <div className="add-button">+</div>
        </Button>
      </Form>
      <div className="break-form">----- BLOGS ----</div>

      {/* ALL BLOGS */}
      <div>
        {blogList.map((blog: IBlog, _id) => {
          return <BlogCard blog={blog} key={_id} />;
        })}
        <div className="break">That's it for now</div>
      </div>

      {/* PROFILE */}
      <div className="user">
        <div className="user-name">{user.name}</div>
        <br />
        <div className="user-email">{user.email}</div>
        <br />

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
