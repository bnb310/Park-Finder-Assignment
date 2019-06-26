'use strict';

const apiKey = '5XyjU4WWLiJEGnoBRQ7ELbMS5jEOA4qWUDkM4Y1d'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>Park Website</a>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
};

function findParks(chosenState, limit) {
  const params = {
    api_key: apiKey,
    stateCode: chosenState,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let chosenState = $('select#state').val();
    const limit = $('#js-max-results').val();
    findParks(chosenState, maxResults);
  });
}

$(watchForm);
