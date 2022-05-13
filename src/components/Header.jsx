import React from "react";
import {FaSignInAlt, FaUser, FaSignOutAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state)=> state.auth);
    
    const onClick = (e) => {
        dispatch(logout());
        dispatch(reset());
    };
    
    return (
        <header className='header'>
             <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                {user!==null && (
                     <li>
                        <button className='btn' onClick={onClick}>
                            <FaSignInAlt />Logout
                        </button>
                    </li>
                )}   
                {user===null && (
                    <> 
                        <li>
                            <Link to='/login'>
                                <FaSignOutAlt />Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser />Register
                            </Link>
                        </li>
                    </>
                )}                  
            </ul>
        </header>
    );
}

export default Header;