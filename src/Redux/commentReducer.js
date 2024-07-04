const initialState = {
    comments: JSON.parse(localStorage.getItem('comments')) || {}
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_COMMENT':
        const { movieId, comment } = action.payload;
        const updatedComments = {
          ...state.comments,
          [movieId]: [...(state.comments[movieId] || []), comment]
        };
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        return {
          ...state,
          comments: updatedComments,
        };
      default:
        return state;
    }
  };
  
  export default commentReducer;
  
