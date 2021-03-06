import axios from 'axios'
import React, { Component } from 'react'
import './Style.css'

class PostAlbum extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         albums: []
      }
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response => {
            this.setState({albums: response.data})
        })
    }

    deleteHandler = (id, e) => {
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(response => {
            const albums = this.state.albums.filter(album => album.id !== id);
            this.setState({albums})
        })
    }

  render() {
    const{albums} = this.state
    return (
      <div>
        <h1>List of Albums</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Thumbnail</th>
                <th>Delete</th>
            </tr>
            {
            albums.map(album => 
            <tr>
                <td>{album.id}</td>
                <td>{album.title}</td>
                <td><img src={album.thumbnailUrl}></img></td>
                <td><button onClick={(e) => this.deleteHandler(album.id, e)}>Delete</button></td>
            </tr>)
            }
        </table>
      </div>
    )
  }
}

export default PostAlbum