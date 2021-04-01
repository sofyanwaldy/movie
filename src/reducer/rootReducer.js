const initialState = {
  page: 1,
}

function rootReducer(state = initialState, action) {
  // console.log(action.payload)
  switch(action.type) {
    case 'INCREMENT':
      // console.log(state)
      return { page: state.page + 1}
    default: 
      return  state
      
  }
}

export default rootReducer