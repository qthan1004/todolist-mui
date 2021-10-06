import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PostContext } from "../contexts/PostContext";
import moment from "moment";
import { Button } from "@material-ui/core";
import addIcon from "../../assets/plus-circle-fill.svg";
import AddPostModal from "../posts/AddPostModal";

const Dashboard = () => {
  const {
    postState: { posts },
    getPost,
    setShowAddPost,
  } = useContext(PostContext);

  useEffect(() => getPost(), []);

  const rows = posts.map((post, index) => {
    return {
      id: index,
      col1: post.title,
      col2: moment(post.creatAt).format("DD-MM-YYYY"),
      col3: moment(post.dueDate).format("DD-MM-YYYY"),
      col5: post.enable,
    };
  });

  const columns = [
    { field: "col1", headerName: "Title", width: 700 },
    { field: "col2", headerName: "Create Date", width: 300 },
    {
      field: "col3",
      headerName: "Due Date",
      type: "date",
      width: 150,
      editable: true,
    },

    {
      field: "col5",
      headerName: "Is Complete",
      type: "boolean",
      width: 200,
      editable: true,
    },
  ];

  return (
    <>
      <AddPostModal />
      <div style={{ height: "94vh", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />;
      </div>
      <Button
        className="btn-floating"
        onClick={setShowAddPost.bind(this, true)}
      >
        <img src={addIcon} alt="addIcon" width="60" height="60" />
      </Button>
    </>
  );
};

export default Dashboard;
