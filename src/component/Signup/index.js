import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  signUp
} from '../../actions'
import './signup.scss'
import { withRouter, Redirect } from 'react-router'
import { Input, Button } from 'antd'
import Loader from '../Loader'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      number: '',
      username: ''
    };
  }

  handleSubmit = () => {
    if(this.state.email === '' || this.state.password === '' || this.state.number === '' || this.state.username === ''){
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
        password : this.state.password,
        number : this.state.number,
        username : this.state.username,
      };
      this.props.signUp(query);
    }
  }

  render() {

    if(this.props.user !== ''){
      return <Redirect to="/" />
    }
    return (
      <div>
        { this.props.loading ? <Loader /> : 
        <div className="windowContainer">
          <div className="main-container-2">
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
            <Input onChange={(event) => {
              this.setState({
                username: event.target.value
              })
            }}
              value={this.state.username} placeholder="Username" /><br /><br />
            <Input onChange={(event) => {
              this.setState({
                number: event.target.value
              })
            }}
              value={this.state.number} placeholder="Mobile Number" /><br /><br />
            <Button type="primary" className="signin-button" onClick={()=>{
              this.handleSubmit();
            }}>Sign Up</Button>
            <p className="signup-text">Already have an account ? <a href='/signin'>Sign In</a></p>
            {this.state.error !== '' ? <p className="error">{this.state.error}</p> : <p className="error">{this.props.error}</p>}
          </div>
        </div>
        }
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  user: user.user,
  error: user.error,
  loading : user.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp))
