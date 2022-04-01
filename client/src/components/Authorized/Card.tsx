import React, { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import IBlog from "../../interfaces/Blog.interface";
import { GetUser } from "../../services/userService";
import "./Dashboard.css";

type Props = {
  blog: IBlog;
};

const BlogCard: FC<Props> = ({ blog }) => {
  const [userName, setUserName] = useState<String>("");
  GetUser(blog).then((res) => {
    setUserName(res.user.name);
    // console.log(res.user.name);
  });

  return (
    <Card className="blog-card">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userName}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted card-date">
          {blog.datePublished.toString().slice(0, 10)}
        </Card.Subtitle>
        <Card.Text className="article-text">
          {blog.article.slice(0, 300) + "..."}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
