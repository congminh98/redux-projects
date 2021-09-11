import React from 'react';
import PropTypes from 'prop-types';
import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlide';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

function AddEdit(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();
    const isAddMode = !photoId;
    const editedPhoto = useSelector(state => {
        const foundPhoto = state.photos.find(x => x.id === +photoId);
        return foundPhoto;
    });

    const initialValues =
        isAddMode ? {
            title: '',
            categoryId: null,
            photo: '',
        } : editedPhoto;

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (isAddMode) {
                    const action = addPhoto({
                        ...values,
                        id: Math.trunc(Math.random() * 2000),
                    });
                    dispatch(action);
                } else {
                    // Do something here
                    const action = updatePhoto(values);
                    dispatch(action);
                }
                history.push('/photos');
                resolve(true);
            }, 2000);
        });
    }

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo" />
            <div className="photo-edit__form">
                <PhotoForm isAddMode={isAddMode} initialValues={initialValues} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

AddEdit.propTypes = {

}

export default AddEdit

