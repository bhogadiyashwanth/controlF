import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {Card, CardTitle, CardText} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {get_services, store_order} from '../actions/serviceTypeactions'
import {FaRupeeSign} from 'react-icons/fa'
import '../index.css'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class serviceTypes extends Component{
  state = {
    data_ser: null,
    count:0,
    flag:null
  }
  componentDidMount(){
    this.props.loadUser();
    const {name} = this.props.match.params;
    this.props.get_services(name);
  }

  changeQuantityplus = (data_services, temp) => {
    for (var i = data_services.length - 1; i >= 0; i--) {
      if (data_services[i].service_type===temp) {
        data_services[i].quantity = data_services[i].quantity + 1;
      }
    }
    this.setState({ data_ser: data_services });
    this.setState({count: this.state.count+1})
  }

    changeQuantityminus = (data_services, temp) => {
    for (var i = data_services.length - 1; i >= 0; i--) {
      if (data_services[i].service_type===temp) {
        if(data_services[i].quantity>0){
        data_services[i].quantity = data_services[i].quantity - 1;
        }
      }
    }
    this.setState({ data_ser: data_services });
    this.setState({count: this.state.count+1})
  }

  calculateTotal = (data_services) =>{
    var temp_total = 0
    for (var i = data_services.length - 1; i >= 0; i--) {
      temp_total = temp_total + (data_services[i].cost * data_services[i].quantity)
    }
    return temp_total
  }

  storeOrder = async(to_store_order) =>{
     const flagger = await this.props.store_order(to_store_order);

     this.setState({flag:1})
    
  }

render(){
  const {name} = this.props.match.params;
  const user_id1=this.props.user?this.props.user._id:null;
  var total = 0;
  var to_store_order = {};
  if(this.state.count===0){
    const services=this.props.service;
    var data_services = [];

    for (var i in services.ser){
      data_services.push(services.ser[i]);
    }

    for (var i = data_services.length - 1; i >= 0; i--) {
      data_services[i]['quantity'] = 0
    }
  }
  if(this.state.data_ser){
    total = this.calculateTotal(this.state.data_ser);
    to_store_order['user_id'] = user_id1;
    for (var i = this.state.data_ser.length - 1; i >= 0; i--) {
      const temp1 = this.state.data_ser[i]['service_type'];
      const temp2 = this.state.data_ser[i]['quantity'];
      if(temp2>0){
        to_store_order[temp1] = temp2;
      }
    }
    console.log(to_store_order)
  }

  if (this.state.flag) {
    
      return <Redirect to="/slots" />;
    }


if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
return(
  <div>
  <br/>
  <br/>
  <Container className="container_stype">
  <Row>
  <Col sm="9">
    <Row>
    <Col sm="9"><h1>Services for {name}</h1></Col>
    </Row>
    <Row>

    <Col sm="9"  >


    <Table borderless hover style={{textAlign:'center'}}>
        <thead className="block-example">
          <tr>
            <th>Service Type</th>
            <th>Price (INR)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>

      {

        this.state.data_ser?
        this.state.data_ser.map((item) => (
      <tr>
        <td>{item.service_type}</td>
        <td><FaRupeeSign />{item.cost}</td>
        <td>
            <button variant="light"
            onClick={() => { this.changeQuantityminus(this.state.data_ser, item.service_type); }}
            >-</button>

               {' '}{item.quantity}{' '}
            <button variant="light"
              onClick={() => { this.changeQuantityplus(this.state.data_ser, item.service_type); }}
            >+</button>
        </td>
      </tr>
      ))
      :
      data_services.map((item) => (
      <tr>
        <td>{item.service_type}</td>
        <td><FaRupeeSign />{item.cost}</td>
        <td>
            <button variant="light"
            onClick={() => { this.changeQuantityminus(data_services, item.service_type); }}>-</button>

               {' '}{item.quantity}{' '}
            <button variant="light"
              onClick={() => { this.changeQuantityplus(data_services, item.service_type); }}
            >+</button>
        </td>
      </tr>
      ))

    }
      </tbody>
    </Table>
    </Col>
    </Row>
    </Col>
      <Col sm="3">
      <div className="summary_stype">
      <br/>
      <h3>Order</h3>
      <hr className="summary_stype_underline" />
        <b>Total Cost : {total}</b><br/><br/>
        <Button onClick={() => {this.storeOrder(to_store_order)}}>Continue to Checkout</Button> 
      </div>
      </Col>
    </Row>
    </Container>  
  </div>
)
}
}

serviceTypes.propTypes={
  loadUser:PropTypes.func.isRequired,
  token:PropTypes.string.isRequired,
  get_services:PropTypes.func.isRequired,
  service:PropTypes.object.isRequired,
  store_order:PropTypes.func.isRequired
}



const mapStateToProps=state=>({
user:state.auth.user,
token:state.auth.token,
service:state.service,
})
export default connect(mapStateToProps,{loadUser, get_services, store_order})(serviceTypes)
