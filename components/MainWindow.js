import React, { Component } from 'react'
import {InstantSearch, RefinementList, Hits, SearchBox, Highlight,
    Pagination, CurrentRefinements, ClearAll } from 'react-instantsearch/dom';
import { connectRefinementList } from 'react-instantsearch/connectors';
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
            <li className="masonry-element">
                <Link to={this.props.hit.photo_id}>
                    <img className="photo-masonry" src={this.props.hit.url}/>
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

class CustomRefinementList extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Colors</h2>
                <ul className="refinementList">
                    {
                        this.props.items && this.props.items.map(item => {
                            var classNames=""
                            if(item.isRefined){
                                classNames="color_box checked"
                            }
                            else{
                                classNames="color_box"
                            }
                            return <li className={classNames}
                                    onClick={() => this.props.refine(item.value)}
                                    style={{backgroundColor: item.label}}
                                    checked={item.isRefined}
                                    />
                        })
                    };
                </ul>
            </div>
        );
    }
};

const NewRefinementList = connectRefinementList(CustomRefinementList);
class MainWindow extends Component {

    render() {
        return (

            <InstantSearch
                appId="ZUDPYST9BD"
                apiKey="01aabc2f70dc96cf941b8d55aaa5b7af"
                indexName="Photo">

                <div className="sidebar">
                    <NewRefinementList attributeName="colors" />
                </div>

                <div className="wrapper">
                    <SearchBox/>
                    <Search/>
                </div>

            </InstantSearch>
        );
    }
}

export default MainWindow


