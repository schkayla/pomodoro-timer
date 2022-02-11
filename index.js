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

let interval;
let breakInterval;

let workTime;
let breakTime;

let workCountdown;
let breakCountdown;

let stopButton;
let stopButtonActive = false;
let pauseButton;
let pauseButtonActive = false;

let minutes;
let secs;

// Go button to start timer
button.addEventListener('click', () => {
    clearInterval(interval);
    clearInterval(breakInterval);

    workTime = parseInt(document.getElementById('work-time').value);
    breakTime = document.getElementById('break-time').value;

    workCountdown = workTime * 60;
    breakCountdown = breakTime * 60;

    countdownElement.innerHTML = `${workTime}:00 <br> Work`;

    // Check for inputs that are positive numbers
    if (!workTime || !breakTime || workTime < 0 || breakTime < 0) {
        alert("please enter a number greater than 0 for Work time and Break time");
        countdownElement.innerHTML = ``;
        document.body.removeChild(stopButton);
        stopButtonActive = false;
        return;
    }

    updateWorkTimer();   

    // Only add stop button if there isn't one currently
    if (!stopButtonActive) {
        addStopButton();
        addPauseButton();
        stopButtonActive = true;
    }

    // Timer to 00:00 when stop button clicked
    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        clearInterval(breakInterval);
        countdownElement.innerHTML = `00:00`;
        document.body.removeChild(stopButton);
        document.body.removeChild(pauseButton);
        stopButtonActive = false;
    })

    // Pause timer and resume when clicked again
    pauseButton.addEventListener('click', () => {
        pauseButtonActive = !pauseButtonActive;
        // let currentTime;
        if (countdownElement.innerHTML.includes('Work') && pauseButtonActive) {
            currentTime = workCountdown;
            countdownElement.innerHTML = `${minutes}:${secs}<br> Work`;
            pauseButton.textContent = "Resume";
            clearInterval(interval);
        } else if (countdownElement.innerHTML.includes('Break') && pauseButtonActive) {
            currentTime = breakCountdown;
            countdownElement.innerHTML = `${minutes}:${secs}<br> Break`;
            pauseButton.textContent = "Resume";
            clearInterval(breakInterval);
        } else if (countdownElement.innerHTML.includes('Work') && !pauseButtonActive) {
            pauseButton.textContent = "Pause";
            updateWorkTimer(currentTime);
        } else {
            pauseButton.textContent = "Pause";
            updateBreakTimer(currentTime);
        }
    })

});


function updateWorkTimer() {
        
    interval = setInterval(() => {
        minutes = Math.floor(workCountdown / 60);
        let seconds = workCountdown % 60;

        secs = `${seconds}`.padStart(2, '0');

        countdownElement.innerHTML = `${minutes}:${secs}<br> Work`;
        countdownElement.classList.remove("break-timer");

        if (workCountdown === 0) {
            clearInterval(interval);
            breakCountdown = breakTime * 60
            updateBreakTimer();
        }

        workCountdown--;
    }, 1000);
}


function updateBreakTimer() {

    breakInterval = setInterval(() => {
        let minutes = Math.floor(breakCountdown / 60);
        let seconds = breakCountdown % 60;
    
        secs = `${seconds}`.padStart(2, '0');
    
        countdownElement.innerHTML = `${minutes}:${secs}<br> Break`;
        countdownElement.classList.add("break-timer");

        if (breakCountdown === 0) {
            clearInterval(breakInterval);
            workCountdown = workTime * 60;
            updateWorkTimer();
        }
    
        breakCountdown--;

    }, 1000)
}

// Stop and pause buttons
function addStopButton() {
    stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.type = "button";
    stopButton.className = "form-item button stop";
    document.body.appendChild(stopButton);
    stopButtonActive = true;
}

function addPauseButton() {
    pauseButton = document.createElement("button");
    pauseButton.textContent = "Pause";
    pauseButton.type = "button";
    pauseButton.className = "form-item button stop";
    document.body.appendChild(pauseButton);
}

//button popup for overall counter time counting up

//add beep when switches

//add spotify playlist

//add pause and resume buttons
