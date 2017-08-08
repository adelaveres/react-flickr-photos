import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../redux/actions'
import Header from './Header'
import {InstantSearch, Hits, SearchBox, Highlight,
    Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import '../client/styles.css';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import FontAwesome from 'react-fontawesome';
import MainWindow from './MainWindow';
import FbLogin from "./FbLogin";


const PhotoWindow = ({ match, photos }) => {

    return (
        <div>
            <img className="clickedPhoto" src={photos.find( p => p.photo_id===match.params.photoId ).url}/>
            <Link to="/home/" >
                <FontAwesome className="backButton" name="backward" size="3x"/>
            </Link>
        </div>
    );
}


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const connectedPhotoWindow = connect(mapStateToProps, mapDispatchToProps)(PhotoWindow)


class App extends Component {
  constructor(props) {
      super(props);
      var client = algoliasearch("7ZLXFKJ9DV", "744d5ae9e6ec943e2667327f287dfe12");
      client.initIndex('Photo');
  }
  render(){

    return(
        <Router>
            <div>
                <Header/>

                <Route exact path="/" render={() => (
                    this.props.loggedIn ? (
                        <Redirect push to="/home/"/>
                        ) : (
                            <FbLogin actions={this.props.actions}/>
                        )
                    )}
                />
                <Route exact path="/home/" render={() => (
                    this.props.loggedIn ? (
                        <MainWindow/>
                        ) : (
                            <div>
                                <div className="login-message">Please login first.</div>
                                <FbLogin actions={this.props.actions}/>
                            </div>
                        )
                    )}
                />
                <Route exact path="/home/:photoId" component={connectedPhotoWindow}/>
            </div>
        </Router>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App)