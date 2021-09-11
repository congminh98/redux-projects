import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';


const InputField = (props) => {
    const { field, form: { errors, touched }, type, label, placeholder, disabled } = props;
    // { name, value, onChange, onBlur }
    const { name} = field;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input
                id={name}
                type={type}
                {...field}
                disabled={disabled}
                invalid = {showError}
                placeholder={placeholder}>
            </Input>
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
};


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};
InputField.defaultProps = {
    input: 'text',
    label: '',
    placeholder: 'Eg: ...............',
    disabled: false
}

export default InputField;
