import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { NOTES_URL } from 'views/constants'


class NoteEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      id: "",
      name: "",
      content: "",
      redirect: false,
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value })
  }

  handleSubmit(event) {
    this.updateNote()
    event.preventDefault()
  }

  updateNote() {
    let data = {
      name: this.state.name,
      content: this.state.content
    }
    let token = localStorage.getItem('token@pencatat') || null

    fetch(
      NOTES_URL + "/" + this.state.id,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ redirect: true })
      })
      .catch((err) => {
        throw Error(err)
      })
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
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <div className="App">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name :
              <input
                required
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleNameChange}
                ref={(input) => { this.name = input; }} />
            </label>
            <br /><br />

            <textarea
              required
              cols={70}
              rows={5}
              name="content"
              value={this.state.content}
              onChange={this.handleContentChange} />
            <br /><br />
            <button className="btn">Kirim</button>
          </form>
          <br />
        </div>
        <Link to="/">Kembali</Link>
      </div>
    )
  }
}

export default NoteEdit;
