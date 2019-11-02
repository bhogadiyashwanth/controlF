import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class ChatPage extends Component{
  componentDidMount(){
    // console.log('mounted');
     this.props.loadUser()
  }


render(){
if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
return(
  <div>

  </div>
)
}
}

ChatPage.propTypes={
  user:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  token:PropTypes.string
}

const mapStateToProps=state=>({
user:state.auth.user,
token:state.auth.token
})
export default connect(mapStateToProps,{loadUser})(ChatPage)
