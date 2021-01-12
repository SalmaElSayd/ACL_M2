import React, { Component } from 'react';
import '../style/ViewStaff.css';
import axios from 'axios';

export class ViewDayOff extends Component {
    constructor(props) {
        super(props)

        this.onChangeMemberID = this.onChangeMemberID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            member_id: '',
            days_off: []
        }
    }

    onChangeMemberID(e) {
        this.setState({
            member_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const member = {
            member_id: this.state.member_id
        }

        console.log(member);

        axios.post('http://localhost:3001/viewDayOff', member, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        days_off: response.data
                    })
                }
                if (!response.data.length) {
                    this.setState({
                        days_off: [response.data]
                    })
                }
            }, error => {
                console.log(error);
            });

        this.setState({
            member_id: ""
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>View Staff Member Vacation By ID</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Staff Member ID</label>
                        <input type="text" className="form-control" onChange={this.onChangeMemberID} value={this.state.member_id} placeholder="Enter staff member ID" />
                        <small className="form-text text-muted">e.g. ac-1 (This is an optional field)</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                <br />
                    <h3>Staff Vacations:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Day Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.days_off.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['staff_member_id']}</td>
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

export default ViewDayOff

