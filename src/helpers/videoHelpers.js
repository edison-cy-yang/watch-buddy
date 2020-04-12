const getVideoId = (url) => {
  //Get videoId
  const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const videoId = url.match(rx)[1];
  return videoId;
};

const format = (seconds) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

const pad = (string) => {
  return ('0' + string).slice(-2)
}

module.exports = {
  getVideoId,
  format,
  pad
}