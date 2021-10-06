import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { PostContext } from "../contexts/PostContext";
import { TextField } from "@material-ui/core";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddPostModal = () => {
  const { showAddPost, setShowAddPost, addPost } = useContext(PostContext);
  const [newPost, setNewPost] = useState({
    title: "",
    dueDate: "",
  });

  const { title, dueDate } = newPost;

  const handleChangeNewPost = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitNewPost = async (e) => {
    e.preventDefault();
    addPost(newPost);
    setShowAddPost(false);
    setNewPost({
      title: "",
      dueDate: "",
    });
  };
  return (
    <div>
      <Modal
        open={showAddPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="div">
            ADD TASK
          </Typography>
          <Typography id="modal-modal-body" sx={{ mt: 2 }}>
            <Box component="form" onSubmit={onSubmitNewPost} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                name="title"
                label="Title"
                type="text"
                id="title"
                placeholder="title"
                value={title}
                onChange={handleChangeNewPost}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="dueDate"
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={handleChangeNewPost}
              />

              <Button type="submit" variant="contained" color="success">
                Add task
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={setShowAddPost.bind(this, false)}
              >
                Cancel
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default AddPostModal;
