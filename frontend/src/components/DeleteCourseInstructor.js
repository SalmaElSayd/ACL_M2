import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class DeleteCourseInstructor extends Component {
    constructor(props) {
        super(props)

        this.onChangeInstructorID = this.onChangeInstructorID.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            instructor_id: '',
            course_id: '',
            message: ''
        }
    }

    onChangeInstructorID(e) {
        this.setState({
            instructor_id: e.target.value
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
            instructor_id: this.state.instructor_id,
            course_id: this.state.course_id
        }

        console.log(request);

        axios.post('http://localhost:3001/deleteCourseInstructor', request)
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
            instructor_id: '',
            course_id: ''
        })
    }

    render() {
        return (
            <div className='form-loc'>
                <h3>Delete Course Instructor</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Instructor ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeInstructorID} value={this.state.instructor_id} placeholder="Enter instructor ID" />
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

export default DeleteCourseInstructor
