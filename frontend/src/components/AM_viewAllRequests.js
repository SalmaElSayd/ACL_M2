import React, { Component } from 'react';
import axios from 'axios';
import '../style/table.css';

export class ViewAllRequests extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            requests: []
        }
        axios.get('http://localhost:3001/academicMember/viewAllRequests',{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response)
                if (response.data.requests.length > 0) {
                    this.setState({
                        requests: response.data.requests
                    })
                }
                if (!response.data.requests.length) {
                    this.setState({
                        requests: [response.data.requests]
                    })
                }
            }, error => {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div className='table-loc'>
                <h3>All Your Requests:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Sending Staff ID</th>
                                <th>Receiving Staff ID</th>
                                <th>Type</th>
                                <th>Request Date</th>
                                <th>Date Sent</th>
                                <th>Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requests.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['_id']}</td>
                                        <td>{item['sending_staff']}</td>
                                        <td>{item['receiving_staff']}</td>
                                        <td>{item['request_type']}</td>
                                        <td>{item['request_date']}</td>
                                        <td>{item['date_sent']}</td>
                                        <td>{item['status']}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default ViewAllRequests