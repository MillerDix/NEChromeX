let ClockModule = {};
ClockModule.real_time = function() {
    let el_clock = document.getElementById("clock");
    let el_greeting = document.getElementById("greeting");
    let clockString = "";
    let greetingString = "";
    let date = new Date();
    // clock补0
    let hours = date.getHours().toString().length < 2 ? "0" + date.getHours().toString() : date.getHours().toString();
    let minutes = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

    if (hours+":"+minutes !== clockString) {
        el_clock.innerHTML = hours + ":" + minutes;
        clockString = hours+":"+minutes;
    }else{
        return;
    }

    // greetings
    if (date.getHours() >= 0 && date.getHours() <= 11) {
        greetingString = "morning";
    }else if (date.getHours() >= 12 && date.getHours() <= 18) {
        greetingString = "afternoon";
    }else{
        greetingString = "evening";
    }
    el_greeting.innerHTML = "Good " + greetingString + "," + " MillerD.";
}
