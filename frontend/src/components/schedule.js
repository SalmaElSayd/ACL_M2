import axios from 'axios'
import React from 'react';
import setAuthToken from '../api'
import { Link } from 'react-router-dom'
import '../style/ViewStaff.css';

import Slot from './slot'
class Schedule extends React.Component{
    constructor(props){
        super(props);
       this.state={
           saturday:['','','','',''],
           sunday:['','','','',''],
           monday:['','','','',''],
           tuesday:['','','','',''],
           wednesday:['','','','',''],
           thursday:['','','','','']
       }
       this.putInSlots = this.putInSlots.bind(this)
    }
putInSlots(inday, targetday){
    if (inday){
    inday.forEach(element => {
        targetday[element.id-1]=element
    });}
    return targetday
}

  
    render(){
        console.log('sched comp')
        console.log(this.props.sched)
        console.log(this.state)
        let info = ""
        if (this.props.sched){
        return(
           <div>
        <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>First</th>
                                <th>Second</th>
                                <th>Third</th>
                                <th>Fourth</th>
                                <th>Fifth</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr key={'saturday'}>
                                        <td><b>Saturday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.saturday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.saturday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.saturday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.saturday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.saturday, ['','','','',''])[4]}/></td>
                                    </tr>
                                    <tr key={'sunday'}>
                                    <td><b>Sunday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.sunday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.sunday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.sunday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.sunday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.sunday, ['','','','',''])[4]}/></td>
                                    </tr>
                                    <tr key={'monday'}>
                                    <td><b>Monday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.monday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.monday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.monday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.monday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.monday, ['','','','',''])[4]}/></td>
                                    </tr>
                                    <tr key={'tuesday'}>
                                    <td><b>Tuesday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.tuesday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.tuesday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.tuesday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.tuesday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.tuesday, ['','','','',''])[4]}/></td>
                                    </tr>
                                    <tr key={'wednesday'}>
                                    <td><b>Wednesday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.wednesday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.wednesday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.wednesday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.wednesday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.wednesday, ['','','','',''])[4]}/></td>
                                    </tr>
                                    <tr key={'thursday'}>
                                    <td><b>Thursday</b></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.thursday, ['','','','',''])[0]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.thursday, ['','','','',''])[1]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.thursday, ['','','','',''])[2]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.thursday, ['','','','',''])[3]}/></td>
                                        <td><Slot slot_info={this.putInSlots(this.props.sched.thursday, ['','','','',''])[4]}/></td>
                                    </tr>

                        </tbody>
                    </table>
                    </div>
        )}else{
        return null}
    }
}

export default Schedule;