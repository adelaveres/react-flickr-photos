import React, { Component } from 'react'

class PhotosList extends Component{
    componentWillMount() {
        this.props.getPhotos()
    }

    render(){
        if(Array.isArray(this.props.photos)) {
            return (
                <ul>
                    {
                        this.props.photos.map((photo) => {
                            return (
                                <li>
                                    <img  src={photo.url}/>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        else
            return <div>No photos yet</div>
    }
}

export default PhotosList