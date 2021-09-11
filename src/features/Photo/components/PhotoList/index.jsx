import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import PhotoCard from '../PhotoCard';

PhotoList.propTypes = {
    photoLists: PropTypes.array,
    onPhotoEditClick: PropTypes.func,
    onPhotoRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
    photoLists: [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null,
};

function PhotoList(props) {
    const { photoLists, onPhotoEditClick, onPhotoRemoveClick } = props;

    return (
        <Row>
            {photoLists.map(photo => (
                <Col key={photo.id} xs="12" md="6" lg="3">
                    <PhotoCard photo={photo} onEditClick={onPhotoEditClick} onRemoveClick={onPhotoRemoveClick} />
                </Col>
            ))}
        </Row>
    );
}



export default PhotoList;