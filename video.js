const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const muteButton = document.getElementById('mute');
const volumeBar = document.getElementById('volume-bar');
const timeCode = document.getElementById('timecode');
const fullscreenButton = document.getElementById('fullscreen');

let previousVolume = video.volume;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


// Lecture et pause
playPauseButton.addEventListener('click', () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseButton.textContent = 'Pause';
  } else {
    video.pause();
    playPauseButton.textContent = 'Lecture';
  }
});

// Mise à jour de la barre de progression
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
  timeCode.textContent = formatTime(video.currentTime);
});

// Changement de la position de lecture
progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
});

// Mute et unmute
muteButton.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    muteButton.textContent = 'Unmute';
    volumeBar.value = previousVolume;
    video.volume = previousVolume;
  } else {
    video.muted = true;
    muteButton.textContent = 'Mute';
    previousVolume = video.volume;
    volumeBar.value = 0;
    video.volume = 0;
  }
});

// Changement du volume
volumeBar.addEventListener('input', () => {
  video.volume = volumeBar.value;
});

// Mode plein écran
fullscreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => {
      alert(`Erreur lors de la tentative de passage en plein écran : ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
