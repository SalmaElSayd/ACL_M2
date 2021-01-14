import React, { Component } from 'react';
import '../style/ViewStaff.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class ViewSlots extends Component{
    constructor(props){
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            courseID:'',
            slots:[]
        }
    }

    onChangeCourseID(e) {
        this.setState({
            courseID: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const course = {
            courseID: this.state.courseID
        }

        console.log(course);

        axios.post('http://localhost:3001/instructor/viewSlots',course,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res=>{
            console.log(res.data)
            if(res.data.length >0){
                this.setState({
                    slots:res.data
                })
            }
            if(!res.data.length){
                this.setState({
                    slots:[res.data]
                })
            }
        },error=>{
            console.log(error)
        })

        this.setState({
            courseID:''
        })
    }

    render(){
        return (
            <div className='form-loc'>
                <h3>View Slot Assignments</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.courseID} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>Slots:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Taken</th>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Replacement</th>
                                <th>Location</th>
                                <th>Course ID</th>
                                <th>Group</th>
                                <th>Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.slots.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['id']}</td>
                                        <td>{item['type']}</td>
                                        <td>{item['date']}</td>
                                        <td>{item['day']}</td>
                                        <td>{item['replacement'] ? "Yes" : "No"}</td>
                                        <td>{item['location_id']}</td>
                                        <td>{item['course_id']}</td>
                                        <td>{item['group']}</td>
                                        <td>{item['taken'] ? "Yes" : "No"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    

}

export default ViewSlots