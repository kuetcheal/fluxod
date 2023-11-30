import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const users = usersResponse.data;
      const postsResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const postsData = postsResponse.data;
      const postsWithUser = postsData.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return { ...post, user };
      });

      setPosts(postsWithUser);
    };

    fetchData();
  }, []);

  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <h2 style={{ padding: "15px" }}>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <>
              <p>{post.body}</p>
              <Button
                variant="outlined"
                onClick={() => handleClickOpen(post)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Show
              </Button>
              <Button variant="contained" style={{ backgroundColor: "red" }}>
                Delete
              </Button>
            </>
            <p>Utilisateur: {post.user.name}</p>
            <hr />
          </li>
        ))}
      </ul>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{selectedPost && selectedPost.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedPost && selectedPost.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CloseIcon
            onClick={handleClose}
            style={{ position: "fixed", top: "230px", cursor: "pointer" }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostsList;
