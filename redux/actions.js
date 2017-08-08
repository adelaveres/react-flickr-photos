
let actions = {

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
      },

    exchangeToken: function(token) {

        const storeExchangedToken = function(newToken){
            return {
                type: 'STORE_EXCHANGED_TOKEN',
                token: newToken,
            }
        };

        return function(dispatch) {

            var params = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'access_token': token
                }),
                mode: 'cors',
            };
            var url = "http://127.0.0.1:8000/social/facebook/"; // social/facebook/"

            return new Promise(((resolve, reject) =>
                fetch(url, params)
                    .then((response =>
                        response.text().then((text) => {
                            if (response.status !== 200 && response.status !== 404) {
                                return reject(text);
                            }
                            const data = text.length > 0 ? JSON.parse(text) : text;
                            console.log('Inside fetch; exchanged token: '+data);
                            dispatch(storeExchangedToken(data));

                            return resolve({ data, status: response.status });
                        })
                    ))
                    .catch((error) => {
                        const message = error.toString();
                        console.log('Inside fetch: '+message);
                        reject(message);
                    })
                ));
        }
    },

    login: function() {
        return {
            type: 'LOGIN'
        }
    }
}

export default actions
