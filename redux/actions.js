let actions = {

  createNewUserId: function(){
    return {
      type: 'CREATE_USER_ID',
      id: Math.round(Math.random()* 100)
    }
  },

  getPhotos: function() {

    const storePhotos = function(photos) {
      return {
      type: 'STORE_PHOTOS',
      photos: photos,
      }
    };
    const makeUrls = function(photos) {
      return photos.map((photo) => {
               return  'http://farm' + photo.farm
                    + ".staticflickr.com/" + photo.server
                    + "/" + photo.id + "_" + photo.secret + ".jpg"
             })
    };
    const storeUrls = function(urls){
      return {
          type: 'STORE_URLS',
          urls: urls
      }
    };

    return function(dispatch) {
        //'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a0752bd84a6df8ca859a803cea5edf63&user_id=36587311@N08&format=json&nojsoncallback=1';
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a0752bd84a6df8ca859a803cea5edf63&tags=mountains&format=json&nojsoncallback=1';
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var allPhotos = responseJson.photos.photo;
                dispatch(storePhotos(allPhotos));
                var urls = makeUrls(allPhotos);
                dispatch(storeUrls(urls));
                console.log(allPhotos);
            })
            .catch((error) => {
                console.error(error);
            })
    }
  },

  addPhoto: function(photo){
      return {
          type: 'ADD_PHOTO',
          photo: photo
      }
  }

}

export default actions
