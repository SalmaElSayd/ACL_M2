import React, { Component } from 'react';
import axios from 'axios';
import '../style/table.css';

export class ViewSlotLinkingRequests extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            requests: []
        }

        axios.get('http://localhost:3001/coordinator/viewSlotLinkingRequests', {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    this.setState({
                        requests: response.data
                    })
                }
                if (!response.data.length) {
                    this.setState({
                        requests: [response.data]
                    })
                }
            }, error => {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div className='table-loc'>
                <h3>Slot-Linking Requests</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Sending Staff ID</th>
                                <th>Receiving Staff ID</th>
                                <th>Request Date</th>
                                <th>Date Sent</th>
                                <th>Status</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requests.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['_id']}</td>
                                        <td>{item['sending_staff']}</td>
                                        <td>{item['receiving_staff']}</td>
                                        <td>{item['request_date']}</td>
                                        <td>{item['date_sent']}</td>
                                        <td>{item['request_type']}</td>
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

export default ViewSlotLinkingRequests
