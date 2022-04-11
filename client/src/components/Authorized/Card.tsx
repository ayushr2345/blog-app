import React, { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import IBlog from "../../interfaces/Blog.interface";
import IUser from "../../interfaces/User.interface";
import { GetUser } from "../../services/userService";
import "./Dashboard.css";

type Props = {
  blog: IBlog;
};

const BlogCard: FC<Props> = ({ blog }) => {
  const [user, setUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
  });
  GetUser(blog).then((res) => {
    setUser(res.user);
    // console.log(res.user.name);
  });

  return (
      <a href={"/auth/blog/" + blog._id} >
        <Card className="blog-card">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.name}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted card-date">
              {blog.datePublished.toString().slice(0, 10)}
            </Card.Subtitle>
            <div className="image-section">
              {user.profileImage && (
                <img
                  className="profile-image-dashboard"
                  src={`${user.profileImage}`}
                  alt="avatar"
                  width="128"
                  height="128"
                />
              )}
            </div>
            <Card.Text className="article-text">
              {blog.article.slice(0, 300) + "..."}
            </Card.Text>

          </Card.Body>
        </Card>
      </a>
  );
};

export default BlogCard;
