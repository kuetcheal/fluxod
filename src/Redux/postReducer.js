import { ADD_COMMENT, DELETE_MOVIE, INCREMENT_LIKE, DECREMENT_LIKE } from './actions';

const initialState = {
  movies: JSON.parse(localStorage.getItem('movies')) || [
    {
      id: '1',
      title: 'Oceans 8',
      category: 'Comedy',
      likes: 4,
      dislikes: 1,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '2',
      title: 'Midnight Sun',
      category: 'Comedy',
      likes: 2,
      dislikes: 0,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '3',
      title: 'Les indestructibles 2',
      category: 'Animation',
      likes: 3,
      dislikes: 1,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '4',
      title: 'Sans un bruit',
      category: 'Thriller',
      likes: 6,
      dislikes: 6,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '5',
      title: 'Creed II',
      category: 'Drame',
      likes: 16,
      dislikes: 2,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '6',
      title: 'Pulp Fiction',
      category: 'Thriller',
      likes: 11,
      dislikes: 3,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '7',
      title: 'Pulp Fiction',
      category: 'Thriller',
      likes: 12333,
      dislikes: 32,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '8',
      title: 'Seven',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '9',
      title: 'Inception',
      category: 'Thriller',
      likes: 2,
      dislikes: 1,
      comments: []  // Ajout du tableau comments vide
    }, {
      id: '10',
      title: 'Gone Girl',
      category: 'Thriller',
      likes: 22,
      dislikes: 12,
      comments: []  // Ajout du tableau comments vide
    },
  ]
};

const postReducer = (state = initialState, action) => {
  let updatedMovies;

  switch (action.type) {
    case INCREMENT_LIKE:
      updatedMovies = state.movies.map(movie =>
        movie.id === action.payload ? { ...movie, likes: movie.likes + 1 } : movie
      );
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return { ...state, movies: updatedMovies };

    case DECREMENT_LIKE:
      updatedMovies = state.movies.map(movie =>
        movie.id === action.payload ? { ...movie, dislikes: movie.dislikes + 1 } : movie
      );
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return { ...state, movies: updatedMovies };

    case ADD_COMMENT:
      updatedMovies = state.movies.map(movie =>
        movie.id === action.payload.movieId
          ? { ...movie, comments: [...movie.comments, action.payload.comment] }
          : movie
      );
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return { ...state, movies: updatedMovies };

    case DELETE_MOVIE:
      updatedMovies = state.movies.filter(movie => movie.id !== action.payload);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return { ...state, movies: updatedMovies };

    default:
      return state;
  }
};

export default postReducer;
