import React, { Component } from 'react';
import '../style/ViewStaff.css';
import axios from 'axios';

export class ViewTeachingAssignments extends Component {
    constructor(props) {
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course_id: '',
            teaching_assignments: []
        }
    }

    onChangeCourseID(e) {
        this.setState({
            course_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const course = {
            course_id: this.state.course_id
        }

        console.log(course);

        axios.post('http://localhost:3001/viewTeachingAssignments', course)
            .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    this.setState({
                        teaching_assignments: response.data
                    })
                }
                if (!response.data.length) {
                    this.setState({
                        teaching_assignments: [response.data]
                    })
                }
            }, error => {
                console.log(error);
            });

        this.setState({
            course_id: ''
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>View Teaching Assignments By Course ID</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.course_id} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>Teaching Assignments:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Weekday</th>
                                <th>Slot ID</th>
                                <th>Slot Type</th>
                                <th>Replacement Slot</th>
                                <th>Location</th>
                                <th>Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teaching_assignments.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['staff_id']}</td>
                                        <td>{item['staff_name']}</td>
                                        <td>{item['day_of_week']}</td>
                                        <td>{item.assignment['id']}</td>
                                        <td>{item.assignment['type']}</td>
                                        <td>{item.assignment['replacement'] ? 'Yes' : 'No'}</td>
                                        <td>{item.assignment['location_id']}</td>
                                        <td>{item.assignment['group']}</td>
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

export default ViewTeachingAssignments