import React, { Component } from 'react'  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export class Datepic extends Component {  
        constructor(props) {  
                super(props)  
  
                this.state = {  
                        date: ''  
                }  
        }  
        Changedate = (e) => {  
                this.setState({  
                        date: e  
                });  
        };  
  
        render() {  
                return (  
  
                        <div className="container">   
                                <div class="row" style={{ marginTop: "10px" }}>  
  
                                        <div class="col-sm-4">  
  
                                                <DatePicker className="form-control"  
                                                        selected={this.state.date} placeholderText="Select Date" showPopperArrow={false}  
                                                        onChange={this.Changedate}  
                                                />  
                                        </div>  
  
                                </div>  
                        </div>  
                )  
        }  
}  
  
export default Datepic  

/*
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class datePicker extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
  }
 
  render() {
    return (
      <form onSubmit={ this.onFormSubmit }>
        <div className="form-group">
          <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
          <button className="btn btn-primary">Show Date</button>
        </div>
      </form>
    );
  }
  
}

export default datePicker;
*/