import React, { useState, useEffect } from "react";
import axios from "axios";
import './user.css';
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Pagination from '@material-ui/lab/Pagination';
import AppBar from '@mui/material/AppBar';
import  {Box, Divider, IconButton, Typography, Card, CardContent, CardMedia} from '@mui/material';
import MenuIcon  from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, CardActions } from '@mui/material';


const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


 
// AFFICHAGE DES POSTS
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


  //GESTION DES POPUPS
  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // GESTION DE LA PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  return (
 <>
    <div>
       <Box className="navbar" style={{ color: 'green' }}>
      <AppBar position="static" >
      
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
          >
            MUI
          </Typography>

          <div className="blog2">
        <div className="titlle2">
          <h1>Mes Events</h1>
        </div>
        <div
          className="second-nav"
          style={{ display: "flex", marginLeft: "100px" }}
        >
          <ul className="nouveaute" style={{ display: "flex" }}>
            <li>
              <a href="#">Politiques</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
            <li>
              <a href="#">economie</a>
            </li>
            <li>
              <a href="#">Les plus regardés </a>
            </li>
          </ul>
        </div>

        <div className="boxe">
          <div className="input-containers">
            <input
              className="edite-input4"
              placeholder="Rechercher..."
              type="text"
             
            />
          </div>
          <div className="icon-containers">
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "white",
                width: "1px",
                height: "58px",
                marginLeft: "40px",
              }}
            />
            <IconButton
              style={{
                color: "rgb(224, 12, 139)",
                fontSize: "16px",
                marginLeft: "20px",
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </div>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
     
      </AppBar>
    </Box>




      <div className="title">
      <h2>Journal des Publications</h2></div> <br/>
      <ul>
        {currentPosts.map((post) =>(
          <li key={post.id}>
            <strong>{post.title}</strong>
            <>
              <p>{post.body}</p>

              <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="public/FOOD.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
              <Button
                variant="outlined"
                onClick={() => handleClickOpen(post)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Show
              </Button> 
              <Button variant="contained" style={{ backgroundColor: "red", marginLeft: '30px' }}>
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
      <div className="pagination">
      <Pagination
          count={Math.ceil(posts.length / postsPerPage)} // Total number of pages
          page={currentPage} // Current active page
          color="primary"
          onChange={handlePageChange} // Function to handle page change
        />
      </div>
    </div>
   
</>
  );
};

export default PostsList;
