import React from 'react'
import { Link } from 'react-router-dom'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import { NOTES_URL } from 'views/constants'

class Notes extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      loggedin: false
    }

    this.updateList = this.updateList.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  doLogout() {
    localStorage.removeItem('login@pencatat')
    localStorage.removeItem('token@pencatat')
    this.setState({ loggedin: false })
  }

  componentDidMount() {
    this.updateList();
  }

  updateList() {
    fetch(
      NOTES_URL,
      { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ articles: data.data.notes })
      })
      //.catch((err) => {
      //  throw Error(err)
      //})
  }

  render() {
    return (
      <div className="Notes">
        <h1 className="title">Catatan</h1>

        {this.state.loggedin ?
          <div>
            <p>
              Anda Sudah login.
                 <button onClick={this.doLogout}>Logout</button>
            </p>
            <NoteForm update={this.updateList} />
          </div>
          :
          <p>
            Anda belum login.
              <Link to="/login">Login</Link>
            atau <Link to="/Register">Register</Link>
          </p>
        }
        <hr />
        < NoteList notes={this.state.articles} />
      </div>
    )
  }
}


export default Notes;