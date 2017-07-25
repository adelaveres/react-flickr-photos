function getId(state) {
  return state.todos.reduce((maxId, todo) => {
    return Math.max(todo.id, maxId)
  }, -1) + 1
}


let reducer = function(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [{
          text: action.text,
          completed: false,
          id: getId(state)
        }, ...state.todos]
      })

    case 'COMPLETE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map( (todo)=> {
          return todo.id === action.id ?
              Object.assign({}, todo, {completed: !todo.completed}) : todo
        })
      })


    case 'DELETE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter( (todo)=> {
          return todo.id !== action.id ? true : false
        })
      })

    case 'CREATE_USER_ID':
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          id: action.id
        }
      })

    case 'GET_PHOTOS':
      return Object.assign({}, state, {
        photos: fetchPhotos()
      })
      case 'STORE_PHOTOS':
        return Object.assign({}, state, {
          photos: action.photos
        })
      case 'STORE_URLS':
        return Object.assign({}, state, {
          photos: state.photos.map ( (photo, i) => {
              return Object.assign({}, photo, {url: action.urls[i]})
          })
        })

      case 'ADD_PHOTO':
        return Object.assign({}, state, {
          photos: [action.photo, ...state.photos]
        })

    default: 
      return state;
  }
}

export default reducer
