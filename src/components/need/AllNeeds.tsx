import React, { useEffect, useState } from 'react';
import { fetchData } from '../../data/fetcher';

export const AllNeeds = () => {
  const [needs, setNeeds] = useState([]); 
  
  //need to refactor after auth works
  useEffect(() => {
    const token = '9ba45f09651c5b0c404f37a2d2572c026c146688'; 

    fetchData('needs', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((data) => {
        setNeeds(data);
      })
      .catch((error) => {
        console.error('Error fetching needs:', error);
      });
  }, []); 

  return (
    <div>
      <h2 className='ml-10 mt-10 font-bold'>All Needs</h2>
      <ul>
        {needs.map((need: any) => (
          <li key={need.id}>
            <div className='m-10 border-solid border-teal-300'>
              <h3>Description: {need.description}</h3>
              <p>Date Posted: {need.date_posted}</p>
              <p>Complete: {need.complete ? 'Yes' : 'No'}</p>
              <p>User: {need.user.username}</p>
              <p>Email: {need.user.email}</p>
              <p>Community: {need.community.name}</p>
              <p>Location: {need.community.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
