import React from "react";
import GoalForm from '../components/GoalForm';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { getGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';
import { toast } from 'react-toastify';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state)=> state.auth);
  const { goals, isError, isSuccess, message, isLoading } = useSelector((state)=> state.goals);

  useEffect(()=>{
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getGoals());
  }, [user, toast, message, isError, dispatch, navigate]);
  
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        <div className="goals">
          {goals.map((goal)=>(
              <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Dashboard;