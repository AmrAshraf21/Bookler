import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../../store/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
};

export default AuthInitializer;