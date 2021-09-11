import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const dataUser = useSelector(state => state.user.current);
    // 
    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between" style={{ padding: '20px 0' }}>
                    <Col lg="6" md="auto" className="justify-content-center d-flex">
                        <a href="https://www.google.com.vn/"
                            className="header__link header__title"
                            target="_blank"
                            rel="noreferrer">
                            Easy Frontend
                        </a>
                    </Col>
                    <Col lg="6" md="auto" className="justify-content-center d-flex">
                        {dataUser
                            ? <div style={{ display: "flex", alignItems: "center" }}>
                                <img style={{ height: "30px", borderRadius: "50%" }} src={dataUser.photoUrl} alt="" /><span style={{ color: "#007bff", marginLeft: "5px",cursor:"pointer" }}>Logout</span>
                            </div>
                            :
                            <NavLink exact className="header__link" to="/signin" activeClassName="header__link--active">
                                SignIn
                        </NavLink>
                        }
                    </Col>
                </Row>
            </Container>
        </header>
    );
};


Header.propTypes = {

};


export default Header;
