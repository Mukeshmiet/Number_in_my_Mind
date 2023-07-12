"use strict";

// Variables

    // Functions variables
    const rightp = document.querySelector(".right p")
    const usrval = document.querySelector(".uservalue")
    const wonvar = document.querySelector(".won")
    const lowvar = document.querySelector(".low")
    const checkvar = document.querySelector(".check")
    const bodyvar = document.querySelector("body")
    const highvar = document.querySelector(".high")
    const highscorevar = document.querySelector(".myhiscore")
    const scorevar = document.querySelector(".myscore")


    // Generate random number
    let myGuess = Math.trunc(Math.random() * 20) + 1;
    // Score
    let score = 20;
    let hscore = 0;
    // Audio files
    const baudio = new Audio('./audios/background.mp3');
    const gusaudio = new Audio('./audios/gusses.mp3');
    const winaudio = new Audio('./audios/win.mp3');
    const loseaudio = new Audio('./audios/lose.mp3');

// Functions
    // MuteAll function
    const muteall = function () {
        baudio.muted = true;
        gusaudio.muted = true;
        winaudio.muted = true;
        loseaudio.muted = true;
        baudio.currentTime = 0;
        gusaudio.currentTime = 0;
        winaudio.currentTime = 0;
        loseaudio.currentTime = 0;
    };

    // Unmute function
    const unmute = function () {
        baudio.muted = false;
        gusaudio.muted = false;
        winaudio.muted = false;
        loseaudio.muted = false;
    };

    // Lose function
    const loose = function () {
            baudio.pause();
            baudio.currentTime = 0;
            loseaudio.play();
            rightp.textContent = myGuess;
            usrval.classList.add("hide");
            wonvar.classList.add("lose");
            lowvar.classList.add("hide");
            checkvar.classList.add("hide");
            bodyvar.classList.remove("light");
            bodyvar.classList.remove("dark");
            highvar.style.color = "rgb(9, 9, 9)";
            bodyvar.style.backgroundColor = "rgb(9,9,9)";
            hscore = hscore < score ? score : hscore;
            highscorevar.textContent = hscore;
            scorevar.textContent = score;
    };

    // User value function
    const userValue = function () {
        gusaudio.play();
        gusaudio.currentTime = 0;
        const value = Number(usrval.value);

        if (!value) {
            alert("Please enter your guess");
            lowvar.style.color = "rgb(38, 37, 37)";
            highvar.style.color = "rgb(38, 37, 37)";
        } else if (value < myGuess && value > 0) {
            highvar.classList.add("hide");
            lowvar.classList.remove("hide");
            lowvar.style.color = "rgb(238, 30, 127)";
            highvar.style.color = "rgb(38, 37, 37)";
            bodyvar.classList.add("light");
            bodyvar.classList.remove("dark");
            score--;
            scorevar.textContent = score;
            if (score === 0 || score < 0) {loose();}
        } else if (value > myGuess && value < 21) {
            highvar.classList.remove("hide");
            lowvar.classList.add("hide");
            highvar.style.color = "rgb(238, 30, 127)";
            lowvar.style.color = "rgb(38, 37, 37)";
            bodyvar.classList.add("dark");
            bodyvar.classList.remove("light");
            score--;
            scorevar.textContent = score;
            if (score === 0 || score < 0) {loose();}
        } else if (value === myGuess) {
            baudio.pause();
            baudio.currentTime = 0;
            winaudio.currentTime = 0;
            winaudio.play();
            rightp.textContent = myGuess;
            usrval.classList.add("hide");
            wonvar.classList.add("win");
            lowvar.classList.add("hide");
            checkvar.classList.add("hide");
            highvar.style.color = "rgb(0, 104, 28)";
            bodyvar.style.backgroundColor = "rgb(0, 104, 28)";
            bodyvar.classList.remove("light");
            bodyvar.classList.remove("dark");
            hscore = hscore < score ? score : hscore;
            highscorevar.textContent = hscore;
            scorevar.textContent = score;
        } else {
            alert("Please enter a number between 1 and 20");
        }
    };

    // New game function
    const newGame = function () {
        baudio.play();
        winaudio.pause();
        wonvar.classList.remove("lose");
        usrval.value = "";
        usrval.classList.remove("hide");
        wonvar.classList.remove("win");
        lowvar.classList.remove("hide");
        highvar.classList.remove("hide");
        checkvar.classList.remove("hide");
        rightp.textContent = "?";
        scorevar.textContent = 20;
        lowvar.style.color = "rgb(38, 37, 37)";
        highvar.style.color = "rgb(38, 37, 37)";
        bodyvar.style.backgroundColor = "black";
        score = 20;
        myGuess = Math.trunc(Math.random() * 20) + 1;
    };

    // Background audio function
    const backAudio = function() {
        document.querySelector(".overlay").classList.add("hide");
        baudio.play();
        baudio.volume = 0.7;
    };


// Main code
    checkvar.addEventListener("click", userValue);
    document.querySelector(".again").addEventListener("click", newGame);
    document.querySelector(".start-play").addEventListener("click", backAudio);
    document.querySelector(".mute .back").addEventListener("click", unmute);
    document.querySelector(".mute .all").addEventListener("click", muteall);

