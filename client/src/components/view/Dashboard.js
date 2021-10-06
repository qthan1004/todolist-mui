import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PostContext } from "../contexts/PostContext";
import moment from "moment";

const Dashboard = () => {
  const {
    postState: { posts },
    getPost,
  } = useContext(PostContext);

  useEffect(() => getPost(), []);

  const rows = posts.map((post) => {
    return {
      id: post._id,
      col1: post.title,
      col2: moment(post.creatAt).format("DD-MM-YYYY"),
      col3: moment(post.dueDate).format("DD-MM-YYYY"),
      col4: post.status,
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
      field: "col4",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "col5",
      headerName: "Active",
      type: "boolean",
      width: 150,
      editable: true,
    },
  ];

  const [select, setSelection] = useState([]);

  return (
    <>
      <div style={{ height: "94vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelected={(newSelection) => {
            setSelection(...newSelection);
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
