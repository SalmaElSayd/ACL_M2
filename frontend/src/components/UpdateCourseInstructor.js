import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class UpdateCourseInstructor extends Component {
    constructor(props) {
        super(props)

        this.onChangeOldInstructorID = this.onChangeOldInstructorID.bind(this);
        this.onChangeNewInstructorID = this.onChangeNewInstructorID.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            old_instructor_id: '',
            new_instructor_id: '',
            course_id: '',
            message: ''
        }
    }

    onChangeOldInstructorID(e) {
        this.setState({
            old_instructor_id: e.target.value
        })
    }

    onChangeNewInstructorID(e) {
        this.setState({
            new_instructor_id: e.target.value
        })
    }

    onChangeCourseID(e) {
        this.setState({
            course_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            old_instructor_id: this.state.old_instructor_id,
            new_instructor_id: this.state.new_instructor_id,
            course_id: this.state.course_id
        }

        console.log(request);
        axios.post('http://localhost:3001/updateCourseInstructor', request)
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
            old_instructor_id: '',
            new_instructor_id: '',
            course_id: ''
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Update Course Instructor</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Old Instructor ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeOldInstructorID} value={this.state.old_instructor_id} placeholder="Enter old instructor ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>New Instructor ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeNewInstructorID} value={this.state.new_instructor_id} placeholder="Enter new instructor ID" />
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

export default UpdateCourseInstructor
