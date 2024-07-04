export const INCREMENT_LIKE = 'INCREMENT_LIKE';
export const DECREMENT_LIKE = 'DECREMENT_LIKE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export const incrementLike = (movieId) => ({
  type: INCREMENT_LIKE,
  payload: movieId,
});

export const decrementLike = (movieId) => ({
  type: DECREMENT_LIKE,
  payload: movieId,
});

export const addComment = (movieId, comment) => ({
  type: ADD_COMMENT,
  payload: { movieId, comment },
});

export const deleteMovie = (movieId) => ({
  type: 'DELETE_MOVIE',
  payload: movieId,
});
