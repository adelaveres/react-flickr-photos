let reducer = function(state, action) {
  switch (action.type) {

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

      case 'STORE_EXCHANGED_TOKEN':
        return Object.assign({}, state, {
          token: action.token
        })

      case 'LOGIN':
        return Object.assign({}, state, {
          loggedIn : true
        })

    default: 
      return state;
  }
}

export default reducer
