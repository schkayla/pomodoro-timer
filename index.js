// Light and dark mode toggle
let darkMode = false;

document.querySelector('.toggle-bar').addEventListener('click', () => {
    if (!darkMode) {
        document.querySelector('.ball').style.transform = 'translateX(1.2em)';
        document.body.classList.toggle('dark-mode');   
        document.querySelector('.mode-text').innerHTML = "dark mode";
        darkMode = true;
    } else {
        document.querySelector('.ball').style.transform = 'translateX(0)';
        document.body.classList.toggle('dark-mode');
        document.querySelector('.mode-text').innerHTML = "light mode";
        darkMode = false;
    } 
})



const button = document.querySelector('.button');
let countdownElement = document.getElementById('countdown');
const choosePlaylist = document.getElementById('playlist-select');
const playMusic = document.getElementById('playMusic');
let videoUrl, control, interval, workCountdown, breakCountdown, countdown;
let workOrBreak = true;

let stopButton, pauseButton;
let stopButtonActive = false;
let pauseButtonActive = false;

let minutes, secs, currentTime;

function updateTimer() {    
    if (workOrBreak) {
        if (currentTime) {
            countdown = currentTime;
        } else {
            countdown = workCountdown;
        }
        control = 'Work';
        countdownElement.classList.remove("break-timer");
        playMusic.innerHTML = `<iframe width="560" height="315" src=${videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }  else {
        if (currentTime ? countdown = currentTime : countdown = breakCountdown);
        control = 'Break';
        countdownElement.classList.add("break-timer");
        playMusic.innerHTML = '';
    }

    interval = setInterval(() => {

        minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;

        secs = `${seconds}`.padStart(2, '0');

        countdownElement.innerHTML = `${minutes}:${secs}<br>${control}`;

        if (countdown <= 0) {
            clearInterval(interval);
            workOrBreak = !workOrBreak;
            updateTimer();
        }

        countdown--;
    }, 1000);
}

 // Timer to 00:00 when stop button clicked
 function reset() {
    clearInterval(interval);
    countdownElement.innerHTML = `00:00`;
    document.body.removeChild(stopButton);
    document.body.removeChild(pauseButton);
    stopButtonActive = false;
    playMusic.innerHTML = '';
    countdownElement.classList.remove("break-timer");

}

// Pause timer and resume when clicked again
function pause() {
    pauseButtonActive = !pauseButtonActive;
    currentTime = countdown;

    if (pauseButtonActive) {
        countdownElement.innerHTML = `${minutes}:${secs}<br>${control}`;
        pauseButton.textContent = "Resume";
        clearInterval(interval);
        playMusic.innerHTML = '';
    } else {
        pauseButton.textContent = "Pause";
        updateTimer(currentTime);
    }
}

// Stop button
function addStopButton() {
    stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.type = "button";
    stopButton.className = "form-item button stop";
    document.body.appendChild(stopButton);
    stopButtonActive = true;
}

// Pause button
function addPauseButton() {
    pauseButton = document.createElement("button");
    pauseButton.textContent = "Pause";
    pauseButton.type = "button";
    pauseButton.className = "form-item button stop";
    document.body.appendChild(pauseButton);
}


// Go button to start timer and play music
button.addEventListener('click', () => {
    clearInterval(interval);
    currentTime = null;

    let workTime = parseInt(document.getElementById('work-time').value);
    let breakTime = document.getElementById('break-time').value;

    //  Check for inputs that are positive numbers
     if (!workTime || !breakTime || workTime < 0 || breakTime < 0) {
        alert("please enter a number greater than 0 for Work and Break time");
        countdownElement.innerHTML = ``;
        if (stopButton) document.body.removeChild(stopButton);
        if (pauseButton) document.body.removeChild(pauseButton);
        playMusic.innerHTML = '';
        stopButtonActive = false;
        return;
    }

    if (choosePlaylist.value === "lofi") {
        videoUrl = "https://www.youtube.com/embed/jfKfPfyJRdk?controls=0&autoplay=1";
    } else if (choosePlaylist.value === "indie"){
        videoUrl = "https://www.youtube.com/embed/6H--nIa3yko?controls=0&autoplay=1";
    } else {
        videoUrl = "https://www.youtube.com/embed/fEvM-OUbaKs?controls=0&autoplay=1";
    }

    workCountdown = workTime * 60;
    breakCountdown = breakTime * 60;

    countdownElement.innerHTML = `${workTime}:00`;

    updateTimer();   

    // Only add stop button if there isn't one currently
    if (!stopButtonActive) {
        addStopButton();
        addPauseButton();
        stopButtonActive = true;
    }

    stopButton.addEventListener('click', reset);
    pauseButton.addEventListener('click', pause);

});

//button popup for overall counter time counting up

//add spotify playlist
