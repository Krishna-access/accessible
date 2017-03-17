import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';


import * as flashMessage  from '../../actions/flashMessage';

/**
 * Import custom components
 */
import FlashMessage from '../common/flash/message.component';
import renderText from '../common/form/renderText';

class SignupForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        window.$('body').addClass('hold-transition login-page');
    }

    componentWillUnmount() {
        this.props.actions.removeFlashMessage();
    }

    handleSubmit(formProps) {
        // TODO
    }

    render() {
        let message = this.props.message;
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="#">Sign up as a WNW creative</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">WNW was started by creatives and we look after our kind.</p>

                    <FlashMessage message={message}/>

                    <form method="post" onSubmit={handleSubmit(this.handleSubmit)}>
                        <Field
                            name="first_name"
                            component={renderText}
                            type="test"
                            label="First Name"
                        >
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </Field>
                        <Field
                            name="last_name"
                            component={renderText}
                            type="text"
                            label="Last Name"
                        >
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </Field>
                        <Field
                            name="email"
                            component={renderText}
                            type="email"
                            label="Email"
                        >
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </Field>

                        <div className="row">
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat"
                                        disabled={submitting}>Sign UP
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

/**
 * Map the state to props.
 */
function mapStateToProps(state) {
    return {
        message: state.flash.message
    }
}

/**
 * Map the actions to props.
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, flashMessage), dispatch)
    }
}

const validateSignup = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = '(The first name is required.)'
    }

    if (!values.last_name) {
        errors.last_name = '(The last name is required.)'
    }

    if (!values.email) {
        errors.email = '(The email field is required.)'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.'
    }

    return errors
};

/**
 * Connect the component to the Redux store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SignupForm', // ←A Unique identifier for this form
    validate: validateSignup  // ←Callback function for client-side validation
})(SignupForm))