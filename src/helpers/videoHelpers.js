const getVideoId = (url) => {
  //Get videoId
  const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const videoId = url.match(rx)[1];
  return videoId;
};

module.exports = {
  getVideoId
}