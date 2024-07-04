import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Grid,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieCard from "./MovieCard";

const PostsList = () => {
  const movies = useSelector((state) => state.postReducer.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredMovies = selectedCategories.length
    ? movies.filter((movie) => selectedCategories.includes(movie.category))
    : movies;
  
  const currentMovies = filteredMovies.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const getCategoryOptions = () => {
    const categories = new Set(movies.map((movie) => movie.category));
    return Array.from(categories);
  };

  const categoryOptions = getCategoryOptions();

  return (
    <div>
      <div className="title">
        <h2>Journal des Publications</h2>
      </div>

      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="category-select-label">Catégories</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Catégories" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {categoryOptions.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2} justifyContent="center">
        {currentMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={5} lg={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Box className="pagination" sx={{ display: 'flex', justifyContent: 'center', padding: '15px', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredMovies.length / postsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
          sx={{ '& .MuiPagination-ul': { fontSize: '1.2rem' } }}
        />
      </Box>
    </div>
  );
};

export default PostsList;

