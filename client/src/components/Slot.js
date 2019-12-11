import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {getSlots,bookSlot} from '../actions/slotActions'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import Container1 from './Container1'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Slot extends Component{

   state= {
     flag:null
   }

  componentDidMount(){
     this.props.getSlots()
  }

  bookslot = async(e) =>{
    console.log('in booking slot...........')
    console.log(e, this.props.order)
    const slottter = await this.props.bookSlot(e,this.props.order);
    this.setState({flag:true})
  }

render(){
 const slots_available = this.props.Slots.all_slots?this.props.Slots.all_slots:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/location" />;
}

if(this.props.Slots.isLoading){
  return <Container1/>
}
else{
return(

<div >
<AppNavbar />
<Container>
<br/><br/>
  <Row>
    <Col md="12">
      <h1>Choose a Slot</h1>
    </Col>
  </Row>
  <br/>
  <Row>
  <Col md="12">
    <Col md="8" style={{marginLeft:'20%'}}>

        <Container>
          <Row>

          {
              slots_available?

              slots_available.map((item) => (
            <Col md="3" className="slot_select"  onClick={()=>{this.bookslot(item._id)}}>

                <span>{item.start_time}:00 - </span>
                <span>{item.end_time}:00</span>

            </Col>

          ))

        :null
      }

          </Row>
        </Container>

    </Col>
    </Col>
  </Row>
</Container>
<Footer>
<Footer/>
</Footer>
</div>
)}
}
}

Slot.propTypes={
  token:PropTypes.string,
  getSlots:PropTypes.func.isRequired,
  Slots:PropTypes.object.isRequired,
  bookSlot:PropTypes.func.isRequired,
  order:PropTypes.string
}

const mapStateToProps=state=>({
Slots:state.slots,
token:state.auth.token,
order:state.order.order_id
})
export default connect(mapStateToProps,{getSlots, bookSlot})(Slot)
