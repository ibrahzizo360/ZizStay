import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getUsersCount } from '../utils/user';
import { getHotelsCount } from '../utils/hotel';
import { getRoomsCount } from '../utils/room';
import { getTotalRevenue } from '../utils/booking';


const WidgetContext = createContext();

const widgetReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS_COUNT':
      return { ...state, usersCount: action.payload };
    case 'SET_HOTELS_COUNT':
      return { ...state, hotelsCount: action.payload };
    case 'SET_ROOMS_COUNT':
      return { ...state, roomsCount: action.payload };
    case 'SET_TOTAL_REVENUE':
      return { ...state, totalRevenue: action.payload };
    default:
      return state;
  }
};

export const WidgetProvider = ({ children }) => {
  const initialState = {
    usersCount: null,
    hotelsCount: null,
    roomsCount: null,
    totalRevenue: null,
  };

  

  const [state, dispatch] = useReducer(widgetReducer, initialState);


useEffect(() => {
  getUsersCount()
    .then((count) => {
      dispatch({ type: 'SET_USERS_COUNT', payload: count });
      return getHotelsCount();
    })
    .then((count) => {
      dispatch({ type: 'SET_HOTELS_COUNT', payload: count });
      return getRoomsCount();
    })
    .then((count) => {
      dispatch({ type: 'SET_ROOMS_COUNT', payload: count });
      return getTotalRevenue();
    })
    .then((revenue) => {
      dispatch({ type: 'SET_TOTAL_REVENUE', payload: revenue });
    })
    .catch((error) => {
      console.error('Error fetching widget data:', error);
    });
}, []);


  return (
    <WidgetContext.Provider value={state}>
      {children}
    </WidgetContext.Provider>
  );
};


export const useWidgetContext = () => {
  return useContext(WidgetContext);
};
