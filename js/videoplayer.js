/*This applies for audio*/
const video    =  document.getElementById('video');
const play     =  document.getElementById('play');
const stop     =  document.getElementById('stop');
const progress =  document.getElementById('progress');
const timestamp     =  document.getElementById('timestamp');


function toggleVideoStatus() {
	if (video.paused){
		video.play();
	}else{
		video.pause();
	}
	return true;
}

function updatePlayIcon() {
	if(video.paused){
		play.innerHTML= '<i class="fa fa-play fa-2x"></i>';
	}else{
		play.innerHTML= '<i class="fa fa-pause fa-2x"></i>';
	}
	return true;	
}

function updateProgress() {
	progress.value = (video.currentTime/video.duration)*100;
	let mins = parseInt(video.currentTime / 60, 10);
	let secs = parseInt(video.currentTime % 60);
	if(mins<10){
		mins = '0'+ String(mins);
	}
	if(secs<10){
		secs = '0'+ String(secs);
	}
	timestamp.innerHTML = `${mins}:${secs}`;
	return true;
}

function setVideoProgress() {
	video.currentTime = (+progress.value) * video.duration/100;
	return true;
}

function stopVideo() {
	video.currentTime =0;
	video.pause();

	return true;
}

video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play' ,updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);

/*controls*/
play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',stopVideo);
progress.addEventListener('change',setVideoProgress);
