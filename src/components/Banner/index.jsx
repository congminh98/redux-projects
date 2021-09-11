import React from 'react';
import PropTypes from 'prop-types';
import './banner.scss';

function Banner(props) {
    const { title, backgroundUrl } = props;
    const bannerStyle = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}

    return (
        <section className="banner" style={bannerStyle}>
            <h1 className="banner__title">{title}</h1>
        </section>
    )
}

Banner.propTypes = {
    title: PropTypes.string,
    background: PropTypes.string,
}
Banner.defaultProps = {
    title: '',
    background: ''
}


export default Banner

