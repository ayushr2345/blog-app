import React, { FC } from "react";
import { Card } from "react-bootstrap";
import IBlog from "../../interfaces/Blog.interface";
import "./Dashboard.css";

type Props = {
  blog: IBlog;
};

const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <Card className="blog-card">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
        <Card.Text>{blog.article.slice(0, 300) + "..."}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
