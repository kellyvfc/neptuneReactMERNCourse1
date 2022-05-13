import React from "react";
import {FaSignInAlt} from 'react-icons/fa';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state)=> state.auth);

    useEffect(()=> {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess && user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

    const [formData, setFormData] = useState({      
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (e) => {
         setFormData((prevState)=>({
             ...prevState ,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    if (isLoading) {
        <Spinner />
    }

    return <>
        <section className='heading'>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>
                Please create an account
            </p>
        </section>
        <section className="form">
            <form>         
                <div className="form-group">
                    <input 
                        type='email' 
                        className='form-control' 
                        id='email'  
                        name='email' 
                        placeholder='Enter your email' 
                        value={email} 
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password'  
                        name='password' 
                        placeholder='Enter a password' 
                        value={password} 
                        onChange={onChange} />
                </div>         
                <div className="form-group">
                    <button type="submit" className='btn btn-block' onClick={onSubmit}>Submit</button>
                </div>       
            </form>
        </section>
    </>
}

export default Login;