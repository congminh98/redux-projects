import React from 'react';
import PropTypes from 'prop-types';
import Banner from 'components/Banner';
import Images from 'constant/images';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import store from 'app/store';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlide';

function Main(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const photoListState = useSelector(state => state.photos);
    // store.subscribe(()=>{
    //     localStorage.setItem('reduxPhotos', JSON.stringify(store.getState()));
    // });
    // const data = localStorage.getItem('reduxPhotos');
    const photoLists = photoListState;
    // console.log(photoLists);
    
    // function remove
    const handlePhotoRemoveClick = (photo) => {
        const action = removePhoto(photo.id);
        dispatch(action);
    };
    //
    const handlePhotoEditClick = (photo) => {
        history.push(`/photos/${photo.id}`);
    };
    
    return (
        <div className="photo-main">
            <Banner title="Your awesome photo" backgroundUrl={Images.PINK_BG} />
            <Container className="text-center">
                <div className="py-5">
                    <Link to="/photos/add">Add new photo</Link>
                </div>
                <PhotoList photoLists={photoLists} onPhotoRemoveClick={handlePhotoRemoveClick} onPhotoEditClick={handlePhotoEditClick} />
            </Container>
        </div>
    )
}

Main.propTypes = {

}

export default Main

