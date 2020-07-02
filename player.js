// Simple Music Player Script v.0.2
// Authors: hecpolanco, MrDrone

// now the variable 'playing' reflects the current playing state
// improved user interaction with progressBar using the function clearInterval()
// other minor improvements
const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears
let timerId;
let curTime = document.querySelector('.currentTime');
let durTime = document.querySelector('.durationTime');
songIndex = 0;
songs = ['./assets/music/beyonce.mp3', './assets/music/dontstartnow.mp3']; // object storing paths for audio objects
thumbnails = ['./assets/images/lemonade.png', './assets/images/dontstartnow.png']; // object storing paths for album covers and backgrounds
songArtists = ['Beyonce', 'Dua Lipa']; // object storing track artists
songTitles = ["Don't Hurt Yourself", "Don't Start Now"]; // object storing track titles
progressBar.max = song.duration;
// function where pp (play-pause) element changes based on playing boolean value.
// now the variable 'playing' reflects the current playing state
let playing = false;

function playPause() {
    if (!playing) {
        const song = document.querySelector('#song'),
            thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = true;
        //set interval of run updateProgressValue function - every 1/2 second, and write the timer value into 'timerId' to be able to clear it later
        timerId = setInterval(updateProgressValue, 500);
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"
        song.pause();
        playing = false;
        clearInterval(timerId);
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function () {
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 
function nextSong() {
    console.log("Next Song");
    clearInterval(timerId);
    songIndex++;
    if (songIndex > 1) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    progressBar.max = song.duration;
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];
    playing = false;
    playPause();
}
// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 1;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = false;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    if (playing) {
        progressBar.max = song.duration;
        progressBar.value = song.currentTime;
        curTime.innerHTML = (formatTime(Math.floor(song.currentTime)));
        if (durTime.innerHTML === "NaN:NaN") {
            durTime.innerHTML = "0:00";
        } else {
            durTime.innerHTML = (formatTime(Math.floor(song.duration)));
        }
    }
};
// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};
// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
    console.log("ChangedPB");
};

function mDown() {
    clearInterval(timerId);
    console.log("ClearInt ", timerId);
}

function mUp() {
    timerId = setInterval(updateProgressValue, 500);
    console.log("SetInt ", timerId);
}

function mInput() {
    curTime.innerHTML = formatTime(Math.floor(progressBar.value));
    console.log("ChangeCurTime ", progressBar.value);
}
