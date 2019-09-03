import React from 'react';
import { NOTES_URL } from 'views/constants'

class NoteForm extends React.Component {
  constructor () {
    super()
    this.state = {
     name: "",
     content: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState ({ name: event.target.value})
  }

  handleContentChange(event) {
     this.setState({ content: event.target.value})
  }

  handleSubmit(event) {
     this.sendNotes()
     event.preventDefault()
  }


  sendNotes () {
    let data = {
      name: this.state.name,
      content: this.state.content
    }
    let token = localStorage.getItem('token@pencatat') || null

    fetch(
      NOTES_URL,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {
        if(!response.ok) {
          throw Error (response.statusText)
        }
        return response
      })
      .then((response) => response.json ())
      .then((data) => {
        this.props.update()
        this.setState({ name: '', content: ''})
        this.name.focus()
      })
      .catch((err) => {
        throw Error(err)
      })
    }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
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
      
    )
  }
}

export default NoteForm;
