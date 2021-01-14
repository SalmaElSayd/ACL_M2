import React, { Component } from 'react';
import '../style/ViewStaff.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class ViewStaff extends Component {
    constructor(props) {
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course_id: "",
            staff_members: []
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

        axios.post('http://localhost:3001/viewStaff', course, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    this.setState({
                        staff_members: response.data
                    })
                }
                if (!response.data.length) {
                    this.setState({
                        staff_members: [response.data]
                    })
                }
            }, error => {
                console.log(error);
            });

        this.setState({
            course_id: ""
        })
    }

    render() {
        return (
            <div className='form-loc'>
                <h3>View Staff By Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input type="text" className="form-control" onChange={this.onChangeCourseID} value={this.state.course_id} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702 (This is an optional field)</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>Staff Members:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Office</th>
                                <th>Leave Balance</th>
                                <th>Role A</th>
                                <th>Role B</th>
                                <th>Gender</th>
                                <th>Faculty</th>
                                <th>Department</th>
                                <th>Day Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.staff_members.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['id']}</td>
                                        <td>{item['name']}</td>
                                        <td>{item['email']}</td>
                                        <td>{item['office_location']}</td>
                                        <td>{item['leave_balance']}</td>
                                        <td>{item['role1']}</td>
                                        <td>{item['role2']}</td>
                                        <td>{item['gender'] ? 'Female' : 'Male'}</td>
                                        <td>{item['faculty']}</td>
                                        <td>{item['department']}</td>
                                        <td>{item['day_off']}</td>
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

export default ViewStaff