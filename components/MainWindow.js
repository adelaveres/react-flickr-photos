import React, { Component } from 'react'
import {InstantSearch, Hits, SearchBox, Highlight,
    Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import '../client/styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { bindActionCreators } from 'redux';


class Photo extends Component {

    componentDidMount() {
        this.props.actions.addPhoto(this.props.hit)
    }

    render() {
       return (
            <li>
                <Link to={this.props.hit.photo_id}>
                    <img className="masonry-element" src={this.props.hit.url}/>
                </Link>
                <div className="photo-title">
                    <Highlight attributeName="title" hit={this.props.hit}/>
                </div>
            </li>
        );
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

const connectedPhoto =  connect(mapStateToProps, mapDispatchToProps)(Photo)

const Search = () => {
    return (
        <div>
            <ul className="masonry">
                <Hits hitComponent={connectedPhoto} />
            </ul>
            <Pagination/>
        </div>
    );
}

class MainWindow extends Component {


    render() {
        return (
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
        );
    }
}

export default MainWindow


