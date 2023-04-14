import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback((arg) => {
    setIsLoading(true);
    dispatch(thunk(arg))
    .unwrap()
    .catch((err) => setIsError(err))
    .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  return [runThunk, isLoading, isError];
}

export default useThunk;