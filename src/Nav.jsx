import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()
    return (
        <Navbar

            fixed="top" // 👈 Important to make it fixed at top
            className="z-50 "
        >
            <Container>




                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto gap-4">
                        <Nav.Link

                            onClick={() => navigate('/book')}
                            className="px-4 py-3 border border-blue-500 text-white font-semibold rounded hover:bg-blue-500 hover:text-white transition duration-200"
                        >
                            ORDER NOW
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
