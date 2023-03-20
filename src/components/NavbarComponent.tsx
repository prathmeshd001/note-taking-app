import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { changeTheme, Reducer } from '../state/features/changeTheme/changeThemeSlice';
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";


export default function NavbarComponent() {
  const {pathname} = useLocation();

  const theme = useSelector((state: Reducer) => state.theme.theme);
  const dispatch = useDispatch();

  function changeBackground(){
    if (theme === "dark") {
      document.body.style.backgroundColor = "#050122"; //'#042743' #050122
    } else {
      document.body.style.backgroundColor = "white";
    }
  }

  changeBackground();

  const handleThemeChange = () => {
    dispatch(changeTheme());
  };

  return (
    <>
    <Navbar bg={`${theme}`} variant={`${theme}`}>
        <Container>
          <Navbar.Brand href="/">Note Taking App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" disabled={pathname === "/"}>Home</Nav.Link>
            <Nav.Link as={Link} to="/new" disabled={pathname === "/new"}>Create</Nav.Link>
          </Nav>
          <div
            className={`app__navbar-darkmode app__navbar-theme ${
              theme==="dark" && "dark-checkbox"
            }`}
          >
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={handleThemeChange}
              checked={theme==="dark"}
            />
            <label htmlFor="checkbox" className="label">
              <BsFillSunFill color="yellow" />
              <BsMoonStarsFill color="white" />
              <div className="ball"></div>
            </label>
          </div>
        </Container>
      </Navbar>
    </>
  )
}
