import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterHotels } from '../store/hotelSlice';
import SearchResults from '../pages/SearchPage/SearchPage';

const SearchResultsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      // If no search params, redirect back
      navigate('/');
      return;
    }
    
    // Convert ISO strings back to dates
    const searchParams = {
      ...location.state,
      checkIn: location.state.checkIn ? new Date(location.state.checkIn) : null,
      checkOut: location.state.checkOut ? new Date(location.state.checkOut) : null
    };
    
    dispatch(filterHotels(searchParams));
  }, [location.state, dispatch, navigate]);

  return <SearchResults />;
};

export default SearchResultsPage;