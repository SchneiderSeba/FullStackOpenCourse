export const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        console.log(action.payload)
        return action.payload
      default:
        return state
    }
  }
  
  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
