import React from 'react';
import { Redirect } from 'react-router';
import { LOGIN_URL } from 'views/constants'

class Login extends React.Component {
  constructor() {
    super ()
    this.state={
      email: '',
      password: '',
      redirect: false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value})
  }

  handleSubmit(event) {
    this.doLogin()
    event.preventDefault()
  }

  doLogin() {
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    
    fetch(
       LOGIN_URL,
       {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
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
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        this.setState({
          email: '',
          password: ''
        })

        localStorage.setItem('login@pencatat', true)
        localStorage.setItem('token@pencatat', data.data.token)
        this.setState({redirect: true})
      } else {
        alert('Authentication error')
      }
    })
  }

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <div className="App">
        <h1 className="title">Login</h1>
        <div className="form">
        <form onSubmit={this.handleSubmit}>
        <label>
        Email:
        <input
        type="text"
        name="email"
        value={this.state.email}
        onChange={this.handleUsernameChange}
        ref={(input) => { this.email = input; }} />
        
        </label>
        <br />

        <label>
        Password:
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange} />
          </label>

          <br /><br />
          <button className="btn">Login</button>
        </form>
      </div>

    </div>
    )
  }
}

export default Login;
