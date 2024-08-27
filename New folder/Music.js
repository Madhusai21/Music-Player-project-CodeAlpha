
// Select all necessary elements
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Create an audio element
let curr_track = document.createElement('audio');

// Define the list of tracks
let track_list = [
    {
        name: "Fear Song ",
        artist: "NTR",
        image: "images/Fear-song.jpg", // Provide the correct path to the image
        path: "music/[iSongs.info] 02 - Fear Song.mp3"   // Provide the correct path to the music file 
        },
    {
        name: "Chuttamalle",
        artist: "NTR",
        image: "images/love.jpg",
        path: "music/[iSongs.info] 03 - Chuttamalle.mp3",
    },
    {
        name: "All Hail The Tiger.",
        artist: "NTR",
        image: "images/boss.jpg",
        path: "music/[iSongs.info] 01 - All Hail The Tiger.mp3",
    },
    {
        name: "Devudaa ",
        artist: "NTR",
        image: "images/temper.jpeg",
        path: "music/[iSongs.info] 03 - Devudaa (1).mp3",
    },
    {
        name: "One More Time",
        artist: "NTR",
        image: "images/temper2.jpeg",
        path: "music/[iSongs.info] 04 -  One More Time.mp3",
    }
];

// Load the first track
function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[index].image + ")";
    track_name.textContent = track_list[index].name;
    track_artist.textContent = track_list[index].artist;
    now_playing.textContent = "PLAYING " + (index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Play or pause the track
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';
}

// Play the next track
function nextTrack() {
    if (track_index < track_list.length - 1 && !isRandom) {
        track_index += 1;
    } else if (track_index < track_list.length - 1 && isRandom) {
        track_index = Math.floor(Math.random() * track_list.length);
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

// Play the previous track
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

// Seek to a specific point in the track
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

// Update the seek slider
function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Set the volume
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

// Toggle random track
function randomTrack() {
    isRandom = !isRandom;
    if (isRandom) {
        document.querySelector(".random-track").style.color = "#1db954";
    } else {
        document.querySelector(".random-track").style.color = "#fff";
    }
}

// Repeat the track
function repeatTrack() {
    loadTrack(track_index);
    playTrack();
}

// Load the first track in the list
loadTrack(track_index);
