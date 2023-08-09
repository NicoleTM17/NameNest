import { useState, useEffect } from 'react';

import './App.css';
import './responsive.css';

// This is an app for fetching baby names based on the gender parameters ('boy', 'girl', 'neutral')
function App() {

  const [gender, setGender] = useState(''); // useState for typed in gender (boy, girl, neutral)
  const [names, setNames] = useState([]); // useState for each of the names received
  const [searchError, setSearchError] = useState(false); // useState for if get request fails
  const [submitPressed, setSubmitPressed] = useState(false);

  const apiKey = process.env.API_NINJAS_API_KEY; // API key currently stored in env file

  // event for input box
  function handleChange(event){
    // console.log(event.target.value);
    setGender(event.target.value);
    setSearchError(false);
  };

  // event for submitting form
  function handleSubmit(event){
    event.preventDefault();
    // console.log(event);
    setSubmitPressed(true);
  };


  useEffect(() => {
    // send request
    // save response to variable
    if(submitPressed && (gender === 'boy' || gender === 'girl' || gender === 'neutral')) {
      console.log('Fetching data...');
      fetch(`https://api.api-ninjas.com/v1/babynames?gender=${gender}`, {
        headers: {
          'X-Api-Key': apiKey
        }
      })

      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNames(data);
        setSearchError(false);
        setSubmitPressed(false);
      })
      .catch(error => {
        console.error('A problem occurred trying to fetch from api-Ninjas:', error);
        setSearchError(true);
        setSubmitPressed(false);
      });
    }
  }, [gender, apiKey, submitPressed]); // the dependency array specifies which values/variables should be watched for changes
// Any changes to the 'gender' useState will cause the effect to be rerun!





  return (
    <div className="container">
      <header>Generate baby names!</header>

      <div className='search-bar'>
        <form onSubmit={handleSubmit} className='searchbar'>
          <input onChange={handleChange} type='text' className='search' placeholder='Enter boy, girl, or neutral'/>
          <input type='submit' className='submit-btn'/>
        </form>
      </div>

      <p className={searchError === true ? 'results' : 'results-hidden'}>No results found - Please type in the correct gender term (boy, girl, neutral)</p>
      <div className='names-card'>
        <ul className='baby-names'>
          {names.length > 0 ? ( // if there is content in the names array, map through the names and store each in an li
            names.map((name, index) => (
              <li className='baby-name' key={index}>{name}</li>
            ))
          ) : (
            <li className='empty'></li>
          )}
        </ul>
      </div>


      {/* if search fails, results-hidden message should pop up */}
      <footer>© Copyright 2023 Nicole Moncrieffe</footer>
    </div>
  );
}

export default App;


// {searchError === true ? 'results' : 'results-hidden'}
