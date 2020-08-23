const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and pause video
const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

// Update play/pause icon
const updatePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play-circle fa-2x"</i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause-circle fa-2x"</i>';
  }
};

// Update progress and timestamp
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;

  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }

  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }

  timestamp.innerHTML = minutes + ':' + seconds;
};

const setVideoProgress = () => {
  video.currentTime = (progress.value / 100) * video.duration;
};

const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
  const source = video.currentSrc;
  video.currentSrc = '';
  video.currentSrc = source;
};

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    toggleVideoStatus();
  } else if (event.code === 'Escape') {
    stopVideo();
  }
});
