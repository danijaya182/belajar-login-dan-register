import React from 'react';
import { Link } from 'react-router-dom'
import { NOTES_URL } from 'views/constants'

class NoteView extends React.Component {
  constructor() {
    super()
    this.state = {
      id: "",
      name: "",
      content: "",
      last: ""
    }
  }

  componentDidMount() {
    fetch(
      NOTES_URL + "/" + this.props.match.params.id,
      { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({
          id: data.data.note._id,
          name: data.data.note.name,
          content: data.data.note.content,
        })
      })
      .catch((err) => {
        throw Error(err)
      })
  }


  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr><td>ID</td><td>{this.state.id}</td></tr>
            <tr><td>Name</td><td>{this.state.name}</td></tr>
            <tr><td>Content</td><td>{this.state.content}</td></tr>
          </tbody>
        </table>
        <br />
        <Link to="/">Kembali</Link>
      </div>
    )
  }
}

export default NoteView;
