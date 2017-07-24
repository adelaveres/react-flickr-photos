import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import Header from './Header'
import {InstantSearch, Hits, SearchBox, Highlight,
    Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import '../client/styles.css';
//import ReactDOM from 'react-dom';
//import Modal from 'reacat-modal';


function Photo({hit}){
    return (
        <li>
            <img className="masonry-element" src={hit.url} />
            <div className="photo-title">
                <Highlight attributeName="title" hit={hit} />
            </div>
        </li>
    );
}

function Search() {
    return (
        <div>
            <ul className="masonry">
                <Hits hitComponent={Photo} />
            </ul>
            <Pagination/>
        </div>
    );
}

class App extends Component {

  constructor(props) {
      super(props);
      var client = algoliasearch("ZUDPYST9BD", "09959dfba3d75caf63d1c754ad00334a");
      client.initIndex('Photo');

      // this.state = {
      // modalIsOpen: false
      // };
      //
      // this.openModal = this.openModal.bind(this);
      // this.afterOpenModal = this.afterOpenModal.bind(this);
      // this.closeModal = this.closeModal.bind(this);
  }


  render(){

    return(
        <div>
        <Header />
            <div className="wrapper">
                <InstantSearch
                    appId="ZUDPYST9BD"
                    apiKey="01aabc2f70dc96cf941b8d55aaa5b7af"
                    indexName="Photo"
                >
                  <SearchBox/>
                  <Search/>
                </InstantSearch>
            </div>
         </div>
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
