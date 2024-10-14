import React from 'react';
import '../assets/css/register.scss';

function registerForm() {
    return (
        <div className="register-form my-4 text-center">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Registration Form</h2>
                    <form>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">First name</label>
                                    <input className="input--style-4" type="text" name="first_name" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Last name</label>
                                    <input className="input--style-4" type="text" name="last_name" />
                                </div>
                            </div>
                        </div>
                        {/* { <div className="row row-space">
                        { <div className="col-2">
                        <div className="input-group">
                        <label className="label">Birthday</label>
                        <div className="input-group-icon">
                        <input className="input--style-4 js-datepicker" type="text" name="birthday" />
                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                        </div>
                        </div>
                        </div> *
                        </div> } */}

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <input className="input--style-4" type="email" name="email" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Mobile Number</label>
                                    <input className="input--style-4" type="text" name="phone" />
                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" type="password" name="password" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Confirm Password</label>
                                    <input className="input--style-4" type="password" name="password" />
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">Gender</label>
                                <div className="p-t-10">
                                    <label className="radio-container m-r-45">Male
                                        <input type="radio" name="gender" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container m-r-45">Female
                                        <input type="radio" name="gender" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container">Others
                                        <input type="radio" name="gender" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* <div className="input-group">
                            <label className="label">Subject</label>
                            <div className="input-group">
                                <select name="subject" tabindex="-1" className='input--style-4'>
                                    <option disabled="disabled" selected="selected">Choose option</option>
                                    <option>Subject 1</option>
                                    <option>Subject 2</option>
                                    <option>Subject 3</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="py-3">
                            <button className="btn btn--radius-2 btn--blue w-75 mb-3" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default registerForm;