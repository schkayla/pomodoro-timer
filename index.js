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
let breakBackground = document.querySelector('.break-timer');

button.addEventListener("click", () => {
    const workTime = parseInt(document.getElementById('work-time').value);
    const breakTime = document.getElementById('break-time').value;

    let workCountdown = workTime * 60;
    let breakCountdown = breakTime * 60;

    let interval;
    let breakInterval;

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
    updateWorkTimer();
    
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
    
    let stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.type = "button";
    stopButton.className = "form-item button stop";
    document.body.appendChild(stopButton);

    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        clearInterval(breakInterval);
        countdownElement.innerHTML = `00:00`;
        document.body.removeChild(stopButton);
    })
});



//counter popup for overall work time 

//add beep when switches

// check that workTime and breakTime are numbers, alert if not

//add spotify playlist

//add pause and resume buttons
