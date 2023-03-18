chrome.tabs.onZoomChange.addListener((ZoomChangeInfo) => {
  console.log(`Zoom level changed to ${ZoomChangeInfo.newZoomFactor}`);
});
