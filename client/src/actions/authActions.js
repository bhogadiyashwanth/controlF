import axios from 'axios'
import {returnErrors}from './errorActions'
import {
USER_LOADING,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL,
CLEAR_PROFESSIONAL
} from './types'

export const loadUser = () => (dispatch,getState) => {
  // User Loading
  console.log('running')
  dispatch({type:USER_LOADING})
  axios.get('/api/users/loggedin',tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload:res.data
    }))
    .catch(err=>{
      // dispatch(returnErrors(err.response.data,err.response.status))
      dispatch({
        type:AUTH_ERROR
      })
    })
}

export const register=({name,email,password,profilepic,profilepicparse})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }
  let body = new FormData();
  body.append("profilepicparse",profilepicparse);
  body.set("name",name);
  body.set("email",email);
  body.set("password",password);
  body.set("profilepic",profilepic);
//const body=JSON.stringify({name,email,password})
  axios.post('/api/users',body,config)
  .then(res=>dispatch({
    type:REGISTER_SUCCESS,
    payload:res.data
  }))
  .catch(err=>{
    dispatch({
    type:REGISTER_FAIL
  })
})

}


export const login=({email,password})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({email,password})
  axios.post('/api/auth',body,config)
  .then(res=>dispatch({
    type:LOGIN_SUCCESS,
    payload:res.data
  }))
  .catch(err=>{
    dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
    dispatch({
    type:LOGIN_FAIL
  })
})

}

export const logout =()=>dispatch=> {
  dispatch({
    type:CLEAR_PROFESSIONAL
  })
  dispatch({
    type:LOGOUT_SUCCESS
  })
}


export const tokenConfig = getState => {
  const token =getState().auth.token

  const config={
    headers:{
      "Content-type":"application/json"
    }
  }

if(token){
  config.headers['x-auth-token']=token
}
return config
}
