import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'

function Slot (props){
    console.log('slot')
        console.log(props)

       { if (props.slot_info){
      return (
    
       
                                       <div className = 'slot-div'> 
                                      <span>Course ID: {props.slot_info['course_id']}</span>
                                      <br/>
                                      <span>Group: {props.slot_info['group']}</span>
                                      <br/>
                                      <span>Location ID: {props.slot_info['location_id']}</span>
                                      <br/>
                                      <span>Replacement: {props.slot_info['replacement']}</span>
                                      <br/>
                                      <span>Type: {props.slot_info['type']}</span>
                                      </div>)}
                                      else{
                                          return( <div className = 'slot-div'> 
                                          <span></span>
                                          <br/>
                                          <span></span>
                                          <br/>
                                          <span>-</span>
                                          <br/>
                                          <span></span>
                                          <br/>
                                          <span></span>
                                          </div>)
                                      }}
                               
}

export default Slot;
