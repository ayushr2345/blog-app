import React from "react";
import BlogCard from "./Card";
import IBlog from "../../interfaces/Blog.interface";
import DUMMY_BLOGS from "../DUMMY_BLOGS";

function Dashboard() {
  return (
    <div>
      {DUMMY_BLOGS.map((blog: IBlog, index) => {
        return <BlogCard blog={blog} key={index} />;
      })}
      <div className="break">That's it for now</div>
    </div>
  );
}

export default Dashboard;
