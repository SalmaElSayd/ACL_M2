import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class CancelRequest extends Component {
    constructor(props) {
        super(props)
        this.onChangeRequestID = this.onChangeRequestID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            request_id: ''
        }
    }

    onChangeRequestID(e) {
        this.setState({
            request_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            request_id: this.state.request_id
        }

        axios.put('http://localhost:3001/academicMember/cancelRequest', request,{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    this.setState({
                        message: response.data.error
                    })
                    console.log(response.data.error)

                }
            }, error => {
                console.log(error);
            })

        this.setState({
            request_id: ''
        })
    }
    
    render() {
        return (
            <div className='form-loc'>
                <h3>Cancel Request:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Request ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeRequestID} value={this.state.request_id} placeholder="Please enter request ID" />
                        <br />
                        </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>{this.state.message}</h3>
                </div>
            </div>
        )
    }
}

export default CancelRequest
