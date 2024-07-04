import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementLike, decrementLike, addComment, deleteMovie } from '../Redux/actions';
import {Card, CardContent, CardMedia, Typography, IconButton, Button, TextField, List, ListItem, ListItemText,} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentReducer.comments[movie.id] || []);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    dispatch(incrementLike(movie.id));
  };

  const handleDislike = () => {
    dispatch(decrementLike(movie.id));
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addComment(movie.id, comment));
      setComment('');
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movie.id));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/150?text=${movie.title}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.category}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton onClick={handleLike} sx={{ cursor: 'pointer' }}>
            <ThumbUpIcon />
          </IconButton>
          <span>{movie.likes}</span>
          <IconButton onClick={handleDislike} sx={{ cursor: 'pointer', ml: 2 }}>
            <ThumbDownIcon />
          </IconButton>
          <span>{movie.dislikes}</span>
          <IconButton onClick={toggleComments} sx={{ cursor: 'pointer', ml: 2 }}>
            <CommentIcon />
          </IconButton>
          <span>{comments.length}</span>
        </Typography>
        <Button variant="outlined" style={{ backgroundColor: 'green', color: 'white' }}>
          Show
        </Button>
        <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: 'red', marginLeft: '30px' }}>
          Delete
        </Button>
        {showComments && (
          <div>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              margin="normal"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleAddComment} variant="contained" color="primary">
              Add Comment
            </Button>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
