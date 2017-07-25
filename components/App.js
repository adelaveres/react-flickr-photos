import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../redux/actions'
import Header from './Header'
import {InstantSearch, Hits, SearchBox, Highlight,
    Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import '../client/styles.css';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MainWindow from './MainWindow';



const PhotoWindow = ({match}) => {
    return (
        <div>
            <img className="clickedPhoto" src={this.props.photos.find( p => p.photo_id===match.params.photoId ).url}/>
            <Link to="/" >
                <FontAwesome className="backButton" name="backward" size="3x"/>
            </Link>
        </div>
    );
}


class App extends Component {
  constructor(props) {
      super(props);
      var client = algoliasearch("ZUDPYST9BD", "09959dfba3d75caf63d1c754ad00334a");
      client.initIndex('Photo');
  }
  render(){

    return(
        <Router>
          <div>
              <Header />
              <Route exact={true} path="/" component={MainWindow}/>
              <Route path="/:photoId" component={PhotoWindow} />
          </div>
        </Router>
    )
  }

}




function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
