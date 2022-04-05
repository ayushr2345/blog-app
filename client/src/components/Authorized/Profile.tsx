import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import IUser from "../../interfaces/User.interface";
import { GetAllBlogs } from "../../services/userService";

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
        {user.name}
        <br />
        {user.email}
    </div>);
}

export default Profile;
