import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import Restaurant from '../../components/Restaurants';
import Loading from '../../components/Loading';
import { restaurant } from '../../interfaces/restaurant';

const Index: React.FC = () => {
   const history = useHistory();
   const { data, error } = useFetch<restaurant[]>(
      `${process.env.REACT_APP_SERVER}/api/restaurants`,
   );
   if (error) {
      history.push('/');
   }

   return (
      <div className="background">
         <Navbar />
         {data && (
            <>
               <h3 className="mt-6 text-center">
                  Here all the food restaurants or avenues you can order from
               </h3>
               <div className="accordion container-md w-75 pb-5" id="accordion">
                  {data &&
                     data.map((restaurant, index) => (
                        <Restaurant
                           key={index}
                           index={index}
                           restaurant={restaurant}
                        />
                     ))}
               </div>
            </>
         )}
         {!data && <Loading />}
      </div>
   );
};

export default Index;
