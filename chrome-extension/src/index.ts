chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('GO', details);

  const url = details.url;

  console.log(url);

  // Check if the URL is a Google search URL
  if (url.includes('google.com/search')) {
    // Get the search query parameters from the URL
    const regex = /[\?&]q=([^&#]*)/;
    const match = regex.exec(url);
    const searchQuery = match && decodeURIComponent(match[1].replace(/\+/g, ' '));

    console.log("For Google", searchQuery);
  }
});
