import React,{Component} from 'react';
import AppNavbar from'./components/AppNavbar';
import ShowProfile from './components/ShowProfile';
import Service from './components/Service';
import ServiceTypes from './components/serviceTypes';
import ItemModal from './components/ItemModal'
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import HomePage from  './components/HomePage'
import ServicesDisplay from './components/ServicesDisplay'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from './components/Home';

class App extends Component{

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return (
      <Provider store={store}>
          <Router>
        <div className="App">
          <AppNavbar/>
          <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/servicesdisplay' component={ServicesDisplay}/>
		    <Route exact path='/service/:name' component={Service}/>
        <Route exact path='/service/:name/services' component={ServiceTypes}/>
				<Route exact path='/profile' component={ShowProfile}/>
        <Route exact path='/chat' component={Dashboard}/>
          </Switch>
        </div>
            </Router>
      </Provider>
    )
}
}

export default App;
