import React, { Component } from 'react';
import '../style/ViewStaff.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class ViewStaffDepartment extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            staff_members: []
        }
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:3001/instructor/viewProfilesDepartment',{},{headers:{authorisation:localStorage.getItem('jwtToken')}})
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
    }

    render() {
        return (
            <div className='form-loc'>
                <h3>View Staff By Department</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>Staff Members:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Office</th>
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
                                        <td>{item['name']}</td>
                                        <td>{item['email']}</td>
                                        <td>{item['office_location']}</td>
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

export default ViewStaffDepartment