import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addGoal} from '../features/goals/goalSlice';

function GoalForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const onClick = (e) => {
        dispatch(addGoal({
            text
        }))
    };

    return (
        <>
            <section className='form'>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" id='text' value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block' onClick={onClick}>Add goal</button>
                </div> 
            </section>
        </>
    )
};

export default GoalForm;