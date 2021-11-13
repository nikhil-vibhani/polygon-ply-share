import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import {Web3Context} from '../web3/contexts/web3Context'
import logo from '../assets/rebackLogo.svg'

const Header = () => {
    const { networkDetails, handleConnect, resetApp } = useContext(Web3Context)
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    });
    const location = useLocation();
    const collapse = useRef();
    const [navExpanded, setNavExpanded] = useState(false);
    const handleClickOutside = (e) => {
        if (collapse && collapse.current) {
            const ref = collapse.current;
            if (!ref.contains(e.target)) {
                setNavExpanded(false);
            }
        }
    };

    useEffect(() => {
        
    }, [])

    return (<>
        <header className="fixed-top">
            <Navbar bg="transparent" variant="dark" expand="lg" expanded={navExpanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/"><img src={logo} /></Navbar.Brand>
                    <Navbar.Collapse id="navbar-nav" ref={collapse}>
                        <Nav className="m-auto" onSelect={(e) => setNavExpanded(false)}>
                            {/* <Nav.Link as={Link} to="/token-sales" className={location.pathname === "/token-sales" ? "active" : ""}>Token Sales</Nav.Link>
                            <Nav.Link as={Link} to="/mystery boxes" className={location.pathname === "/mystery boxes" ? "active" : ""}>Mystery Boxes</Nav.Link> */}
                            <Nav.Link as={Link} to="/staking" className={location.pathname === "/staking" ? "active" : ""}>Staking</Nav.Link>
                            <Nav.Link as={Link} to="/staking-list" className={location.pathname === "/staking" ? "active" : ""}>Transaction History</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div>
                        {networkDetails.address!=="" && <Button variant="connectBtn">{networkDetails.address}</Button>}
                        {networkDetails.address==="" && <Button variant="connectBtn" onClick={() => handleConnect()}><Icon name="wallet" />Connect Wallet</Button>}
                        {networkDetails.address!=="" && <Button variant="connectBtn" onClick={() => resetApp()}><Icon name="wallet" />Disconnect Wallet</Button>}
                        <Navbar.Toggle aria-controls="navbar-nav" ref={collapse} onClick={() => setNavExpanded(navExpanded ? false : "expanded")} />
                    </div>
                </Container>
            </Navbar>
        </header>
    </>)
}
export default Header