import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useOutletContext } from "react-router-dom";
import IBlog from "../../interfaces/Blog.interface";
import IUser from "../../interfaces/User.interface";
import { GetAllBlogs } from "../../services/userService";
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
  return (
    <div>
      {/* PROFILE */}
      <div className="profile">
      <div className="user-name">{user.name}</div>
        <br />
        <div className="user-email">
          {user.email} <br /> 
          <LinkContainer className="goto-dashboard" to="/auth/dashboard">
            <a >Go to Dashboard</a>
          </LinkContainer>
        </div>
        <br />
        <div>Edit Profile</div>
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
