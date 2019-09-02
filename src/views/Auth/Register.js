import React from 'react';
import { Redirect } from 'react-router';
import { REGISTER_URL} from 'views/constants'

class Register extends React.Component {
   constructor() {
     super()
     this.state = {
       name: '',
       email: '',
       password: '',
       redirect: false
     }

     this.handleNameChange = this.handleNameChange.bind(this);
     this.handleEmailChange  = this.handleEmailChange.bind(this);
     this.handlePasswordChange = this.handlePasswordChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event){
      this.setState({ name:event.target.value})
    }

    handleEmailChange(event){
      this.setState({ email: event.target.value})
    }

    handlePasswordChange(event){
       this.setState({ password: event.target.value})
    }

    handleSubmit(event){
      this.doRegister()
      event.preventDefault()
    }

    doRegister() {
      let data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }

    fetch(
      REGISTER_URL, 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (!response.ok) {
           throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
           this.setState({
            name : '',
            email: '',
            password: '',
           })

           this.setState({ redirect: true })
          } else {
            alert('Authentication error')
          }
          })
          .catch((err) => {
             throw Error(err)
          })

        }
      


  render() {
    if (this.state.redirect) return <Redirect to="/login" />;

    return (
      <div className="App">
        <h1 className="title">Register</h1>
        <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <label> 
            Name:
            <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange} />
          </label>
          <br />

          <label> 
            Email:
            <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange} />
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
          <br />

          <br /><br />
          <button className="btn">Register</button>
          </form>
        </div>

      </div>
    )
  }
}

export default Register;
