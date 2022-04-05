import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import IBlog from "../../interfaces/Blog.interface";
import { GetABlog, GetUser } from "../../services/userService";

type Blog = {
  _id: String;
  authorId: String;
  title: string;
  article: string;
  datePublished: Date;
};

function Blog() {
  let { id } = useParams();
  const date = new Date();
  const [blog, setBlog] = useState<Blog>({
    title: "",
    article: "",
    _id: "",
    authorId: "",
    datePublished: date,
  });
  const [userName, setUserName] = useState<String>("");
  useEffect(() => {
    if (id) {
      GetABlog(id).then((res) => {
        //   console.log(res);
        setBlog(res[0]);
        GetUser(blog).then((res) => {
          setUserName(res.user.name);
          // console.log(res.user.name);
        });
      });
    }
  }, []);
  return (
    <div>
      <Card className="blog-card">
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{userName}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted card-date">
            {blog.datePublished.toString().slice(0, 10)}
          </Card.Subtitle>
          <Card.Text className="article-text">{blog.article}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Blog;
