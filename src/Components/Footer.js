import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Footer = () => {
    return (<><footer>
        <Container>
            <div className="footerTop">
                <Row>
                    <Col lg={3} md={4}>
                        <h3>Title Goes Here</h3>
                        <ul className="list-unstyled m-0">
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                        </ul>
                    </Col>
                    <Col lg={3} md={4}>
                        <h3>Title Goes Here</h3>
                        <ul className="list-unstyled m-0">
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                        </ul>
                    </Col>
                    <Col lg={3} md={4}>
                        <h3>Title Goes Here</h3>
                        <ul className="list-unstyled m-0">
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Important Link</Nav.Link></li>
                        </ul>
                    </Col>
                    <Col lg={3} md={12}>
                        <h3>Social</h3>
                        <div className="re_social">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="facebook" />
                            </a>
                            <a
                                href="https://twitter.com/?lang=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="twitter" />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="instagram" />
                            </a>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="github" />
                            </a>
                            <a
                                href="https://discord.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="discord" />
                            </a>

                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footerBottom">
                <Row>
                    <Col md={6} className="fs-14px text-center text-md-left fs-md-16px text-white opacity-40">
                        ©2021 Playshare.All Right Reserved.
                    </Col>
                    <Col md={6} className="fs-14px fs-md-16px text-white">
                        <ul className="list-unstyled m-0">
                            <li><Nav.Link as={Link} to="/">Terms of Use</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/">Privacy Policy</Nav.Link></li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </Container>
    </footer></>)
}
export default Footer