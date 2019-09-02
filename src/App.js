import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Notes from 'views/Notes/Notes'
import NoteView from 'views/Notes/NoteView'
import NoteEdit from 'views/Notes/NoteEdit'
import Login from 'views/Auth/Login'
import Register from 'views/Auth/Register'

class App extends React.Component {
  render () {
    return(
      <div className="App">
          <Router>
            <Route path="/" exact component={Notes} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/view/:id" component={NoteView} />
            <Route path="/edit/:id" component={NoteEdit} />
          </Router>
             
      </div>
    )
  }
}

export default App;
