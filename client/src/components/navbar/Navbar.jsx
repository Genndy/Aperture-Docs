import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/img/ic_logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.svg'
import {API_URL} from "../../config";
import { Icon, IconButton, SvgIcon } from '@mui/material';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo"/>
                <div className="navbar__header">Aperture Doc</div>
                {isAuth && <input
                    value={searchName}
                    onChange={e => searchChangeHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="Название файла..."/>}
                {isAuth && 
                <div className="navbar__tabs">
                    <NavLink to='/'>
                        <IconButton>
                            <SvgIcon>
                                <path d="M22.8941 16.9399V7.04752C22.8941 6.37662 22.3494 5.83273 21.6775 5.83273H10.5309C10.2981 5.83272 10.0701 5.76599 9.87409 5.64045C9.67808 5.51491 9.52226 5.33584 9.42515 5.12451L8.7744 3.70822C8.67729 3.49688 8.52148 3.31781 8.32547 3.19227C8.12945 3.06673 7.90148 3 7.66861 3H1.2166C0.544704 3 0 3.5439 0 4.21479V19.2767C0 19.9476 0.544704 20.4915 1.2166 20.4915H21.6775C21.7484 20.4915 21.8179 20.4851 21.8854 20.4735C21.9694 20.4851 22.0549 20.4915 22.1421 20.4915C23.1682 20.4915 24 19.661 24 18.6364C24 17.8791 23.5454 17.2282 22.8941 16.9399Z"/>
                            </SvgIcon>
                        </IconButton>
                    </NavLink>
                    <NavLink to='/videochat'>
                        <IconButton>
                            <SvgIcon>
                                <path d="M1.67432 6.08105C0.749756 6.08105 0 6.83374 0 7.76172V19.5264C0 20.4543 0.749756 21.2068 1.67432 21.2068H16.7441C17.6689 21.2068 18.4187 20.4543 18.4187 19.5264V15.8149L24 19.5264V6.64136L18.4187 10.3528V7.76172C18.4187 6.83374 17.6689 6.08105 16.7441 6.08105H7.53491L2.93018 3V6.08105H1.67432Z"/>
                            </SvgIcon>
                        </IconButton>
                    </NavLink>
                </div>}

                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div> }
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div> }
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Выход</div> }
                {isAuth && <NavLink to='/profile'>
                    <img className="navbar__avatar" src={avatar} alt=""/>
                </NavLink>}
            </div>
        </div>
    );
};

export default Navbar;
