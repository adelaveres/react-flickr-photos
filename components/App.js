import React, { Component } from 'react'
import SearchInput from './SearchInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import PhotosList from './PhotosList'
import {InstantSearch, Hits, SearchBox} from 'react-instantsearch/dom';
import ReactDOM from 'react-dom';

class App extends Component {

  render() {
    return (
      <div class="app">
        <h1>Photos List</h1>
        <SearchInput addTodo={this.props.actions.addTodo}/>
        <PhotosList photos={this.props.photos} getPhotos={this.props.actions.getPhotos}/>
      </div>
    )
    /*return(
    <div>
        <h1>Photos List</h1>
        <InstantSearch
            appId="latency"
            apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
            indexName="bestbuy"
        >
           <SearchBox/>
            <div>
              <Hits />
           </div>
        </InstantSearch>
    </div>
    )*/
  }

}

//ALGOLIA IMPORT DATA
var client = algoliasearch("ZUDPYST9BD", "09959dfba3d75caf63d1c754ad00334a");
var index = client.initIndex('flickrPhotos');
index.addObjects(this.props.photos, function(err, content){
    console.log(content);
});


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
