chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('GO', details);

  const url = details.url;

  // Check if the URL is a Google search URL
  if (url.includes('google.com/search')) {
    // Get the search query parameters from the URL
    const regex = /[\?&]q=([^&#]*)/;
    const match = regex.exec(url);
    const searchQuery = match && decodeURIComponent(match[1].replace(/\+/g, ' '));

    console.log('For Google', searchQuery);

    const data = {
      query: searchQuery,
    };

    fetch('http://localhost:3000/api/search-receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Sending search query to tracker service with status:', response.status);
      })
      .catch((error) => console.error('Error:', error));
  }
});
