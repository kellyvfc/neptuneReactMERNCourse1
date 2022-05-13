import React from "react";
import {FaUser} from 'react-icons/fa';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Register() {
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
    }, [user, isError, message, isSuccess, navigate, dispatch, reset, toast]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = (e) => { 
        setFormData((prevState)=>({
             ...prevState ,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData))
    };

    if (isLoading) {
        return <Spinner />;
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>
                Please create an account
            </p>
        </section>
        <section className="form">
            <form>
                 <div className="form-group">
                    <input 
                        type='text' 
                        className='form-control' 
                        id='name'  
                        name='name' 
                        placeholder='Enter a name' 
                        value={name} 
                        onChange={onChange} />
                </div>
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
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password2'  
                        name='password2' 
                        placeholder='Confirm a password' 
                        value={password2} 
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block' onClick={onSubmit}>Submit</button>
                </div>       
            </form>
        </section>
    </>
}

export default Register;