import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

const SelectField = (props) => {
    const { field, options, form:{ touched, errors, setFieldValue }, label, placeholder, disabled } = props;
    const { name } = field;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Select
                id={name}
                {...field}
                options={options}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={options => setFieldValue(name, options.value)}
                disabled={disabled}
                placeholder={placeholder}>
            </Select>
            <div className={showError ? 'is-invalid' : ''}></div>
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
};


SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};
SelectField.defaultProps = {
    label: '',
    placeholder: 'what"s your photo category?',
    disabled: false,
    options: []
}

export default SelectField;
