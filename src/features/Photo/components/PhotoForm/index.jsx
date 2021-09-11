import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import Images from 'constant/images';
import { PHOTO_CATEGORY_OPTIONS } from 'constant/global';
import InputField from 'custom-fields/inputField';
import { FastField, Formik, Form } from 'formik';
import SelectField from 'custom-fields/selectField';
import Select from 'react-select';
import RandomFromField from 'custom-fields/randomPhotoField';
import * as Yup from 'yup';

function PhotoForm(props) {
    const { isAddMode, initialValues } = props;
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required.'),
        categoryId: Yup.number().required('This field is required.').nullable(),
        photo: Yup.string().required('This field is required.'),
    });
    useEffect(() => {
        console.log(1);
        return () => {
            console.log(2);
        }
    }, [])
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={props.onSubmit}>
            {formikProps => {
                const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formikProps;
                return (
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <FastField name="title" component={InputField} label="Title" />
                            <FastField name="categoryId" component={SelectField} label="Category" options={PHOTO_CATEGORY_OPTIONS} />
                            <FastField name="photo" component={RandomFromField} label="Add Photo" />
                            <FormGroup>
                                <Button color="primary" type="submit">
                                    {isSubmitting && <Spinner size="sm" />}
                                    {isAddMode ? 'Add to album' : 'Update your photo'}
                                </Button>
                            </FormGroup>
                        </Form>
                    </Container>
                )
            }}
        </Formik>
    )
}

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
}
PhotoForm.defaultProps = {
    onSubmit: null
}
export default PhotoForm

