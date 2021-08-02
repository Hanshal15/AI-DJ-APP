song = ""
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

scoreLeftWrist = 0; //used for checking the left wrist has been detected or not in the webcam
scoreRightWrist = 0;

function preload() {
   song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}

function modelLoaded() {
    console.log("posenet is done")
}

function draw() {
    image(video,0,0,600,500);

    if(scoreLeftWrist>0.2) {
        circle(leftwristX,leftwristY,20);

        fill("#FF0000");
        stroke("FF0000");
        InNumberleftwristY = Number(leftwristY); //used to convert strings into number
        removedecimals = floor(InNumberleftwristY);
        volume = removedecimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

    if(scoreRightWrist>0.2) {
    circle(rightwristX,rightwristY,20);
    fill("#FF0000");
    stroke("#FF0000");

    if(rightwristY>0 && rightwristY<=100) {
        document.getElementById("speed").innerHTML = "speed = 0.5x"
        song.rate(0.5);
    }

    if(rightwristY>100 && rightwristY<=200) {
        document.getElementById("speed").innerHTML = "speed = 1x"
        song.rate(1);
    }

    if(rightwristY>200 && rightwristY<=300) {
        document.getElementById("speed").innerHTML = "speed = 1.5x"
        song.rate(1.5);
    }

    if(rightwristY>300 && rightwristY<=400) {
        document.getElementById("speed").innerHTML = "speed = 2x"
        song.rate(2);
    }

    if(rightwristY>400 && rightwristY<=500) {
        document.getElementById("speed").innerHTML = "speed = 2.5x"
        song.rate(2.5);
    }
}
}

function play() {
    song.play(); //it is a pre-defiened funtion of p5 that starts playing music
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop(); //it is a pre-defiened funtion of p5 that starts stops music
}

function gotposes(results) {
if(results.length>0) {
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("score left wrist = " + scoreLeftWrist);

    scoreRightWrist = results[0].pose.keypoints[10].score
    console.log("score right wrist = " + scoreRightWrist);
    
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);
    console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY);
}
}