import React from "react";
import {useDispatch} from 'react-redux';
import {removeGoal} from '../features/goals/goalSlice';

function GoalItem({goal}) {
    const dispatch = useDispatch();

    const onClick = (e) => {
        dispatch(removeGoal(goal));
    };

    return (
    <div className='goal'>
        <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
        <h2>{goal.text}</h2>
        <button className="close" onClick={onClick}>X</button>
    </div>)
}

export default GoalItem;