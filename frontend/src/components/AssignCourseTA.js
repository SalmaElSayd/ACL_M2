import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class AssignCourseTA extends Component {
    constructor(props) {
        super(props)

        this.onChangeTAID = this.onChangeTAID.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ta_id: '',
            course_id: '',
            message: ''
        }
    }

    onChangeCourseID(e) {
        this.setState({
            course_id: e.target.value
        })
    }

    onChangeTAID(e) {
        this.setState({
            ta_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            ta_id: this.state.ta_id,
            course_id: this.state.course_id
        }

        axios.post('http://localhost:3001/assignCourseTA', request, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
            }, error => {
                console.log(error);
            })

        this.setState({
            ta_id: '',
            course_id: ''
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Assign Course TA</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>TA ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeTAID} value={this.state.ta_id} placeholder="Enter TA ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.course_id} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
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

export default AssignCourseTA
