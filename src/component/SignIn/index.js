import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  signIn
} from '../../actions'
import './signin.scss'
import { withRouter, Redirect } from 'react-router'
import { Input, Button } from 'antd'
import Loader from '../Loader'

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleSubmit = () => {
    if(this.state.email === '' || this.state.password === ''){
      this.setState({
        error : 'Fill all the details'
      });
    }
    else{
      this.setState({
        error : ''
      });
      let query = {
        email : this.state.email,
        password : this.state.password
      };
      this.props.signIn(query);
    }
  }

  render() {
    
    if(this.props.user !== ''){
      return <Redirect to="/" />
    }

    return (
      <div className="windowContainer">
      { this.props.loading ? <Loader /> : 
        <div className="main-container">
          <Input value={this.state.email} onChange={(event) => {
            this.setState({
              email: event.target.value
            })
          }} placeholder="Email"
          /><br /><br />
          <Input onChange={(event) => {
            this.setState({
              password: event.target.value
            })
          }}
            value={this.state.password} placeholder="Password" type="password" /><br /><br />
          <Button type="primary" className="signin-button"
          onClick = {()=>{
            this.handleSubmit()
          }}
          >Sign In</Button>
          <p className="signup-text">Don't have an account ? <a href='/signup'>Sign Up</a></p>
          {this.state.error !== '' ? <p className="error">{this.state.error}</p> : <p className="error">{this.props.error}</p>}
        </div>
      }
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  user: user.user,
  loading : user.loading,
  error : user.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn))
