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


button.addEventListener("click", () => {
    clearInterval(interval);
    clearInterval(breakInterval);

    workTime = parseInt(document.getElementById('work-time').value);
    breakTime = document.getElementById('break-time').value;

    workCountdown = workTime * 60;
    breakCountdown = breakTime * 60;

    countdownElement.innerHTML = `${workTime}:00 <br> Work`;


    if (!workTime || !breakTime || workTime < 0 || breakTime < 0) {
        alert("please enter a number greater than 0 for Work time and Break time");
        countdownElement.innerHTML = ``;
        document.body.removeChild(stopButton);
        stopButtonActive = false;
        return;
    }

    updateWorkTimer();   

    if (!stopButtonActive) {
        addStopButton();
        stopButtonActive = true;
        
    }

    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        clearInterval(breakInterval);
        countdownElement.innerHTML = `00:00`;
        document.body.removeChild(stopButton);
        stopButtonActive = false;
    })

});


function updateWorkTimer() {
        
    interval = setInterval(() => {
        let minutes = Math.floor(workCountdown / 60);
        let seconds = workCountdown % 60;

        let secs = `${seconds}`.padStart(2, '0');

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


function addStopButton() {
    stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.type = "button";
    stopButton.className = "form-item button stop";
    document.body.appendChild(stopButton);
    stopButtonActive = true;
}


//button popup for overall counter time counting up

//add beep when switches

//add spotify playlist

//add pause and resume buttons
