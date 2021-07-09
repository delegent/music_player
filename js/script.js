//
const container = document.querySelector('.container'),
musicImg = container.querySelector('.img-area img'),
musicName = container.querySelector('.song-details .name'),
musicArtist = container.querySelector('.song-details .artist'),
musicAudio = container.querySelector('#main-audio'),
playPauseBtn = container.querySelector('.play-pause'),
nextBtn = container.querySelector('#next'),
prevBtn = container.querySelector('.prev'),
progressBar = container.querySelector('.progress-bar'),
progressArea = container.querySelector('.progress-area');
musicList = container.querySelector('.music-list'),
moreMusicBtn = container.querySelector('#more-music'),
closeMusicBtn = container.querySelector('#close');
let image = document.querySelector('.img-area img')
let count = 0;



let musicIndex = 1;

window.addEventListener('load',()=>{
	loadMusic(musicIndex);
	playingSong()
})


//load music function

function loadMusic(indexNum){
	musicName.innerText = allMusic[indexNum - 1].name;
	musicArtist.innerText  = allMusic[indexNum - 1].artist;
	musicImg.src = 'images/'+ allMusic[indexNum - 1].img;
	musicAudio.src = 'songs/' + allMusic[indexNum - 1].src;
}

// play music function
function playMusic(){
	container.classList.add('paused');
	playPauseBtn.querySelector('i').classList.remove('fa-play');
	playPauseBtn.querySelector('i').classList.add('fa-pause'); 
    image.classList.add('rotate')
	musicAudio.play();
	
}

function pauseMusic(){
	container.classList.remove('paused');
	playPauseBtn.querySelector('i').classList.add('fa-play');
	playPauseBtn.querySelector('i').classList.remove('fa-pause'); 
	image.classList.remove('rotate')
	musicAudio.pause();
	

}



// next MusicPlayer
function nextMusic(){
	musicIndex = musicIndex + 1 ;
	if (musicIndex > allMusic.length){
		musicIndex = 1;
	}else{
		musicIndex = musicIndex;
	}
	loadMusic(musicIndex);
	playMusic();
}

function prevMusic(){
	musicIndex = musicIndex - 1 ;
	if (musicIndex < 1){
		musicIndex = allMusic.length;
	}else{
		musicIndex = musicIndex;
	}
	loadMusic(musicIndex);
	playMusic();
}


// play or music button
playPauseBtn.addEventListener('click',()=>{
	const isMusicPaused = container.classList.contains('paused');
	isMusicPaused ? pauseMusic(): playMusic();
});


nextBtn.addEventListener('click',()=>{
  nextMusic();
});



prevBtn.addEventListener('click',()=>{
	prevMusic();
  });



// update progress progressBar
musicAudio.addEventListener('timeupdate',(e)=>{
   const currentTime = e.target.currentTime;
   const duration = e.target.duration; // getting duration total
   let progressWidth = (currentTime / duration) * 100;
   progressBar.style.width = '' + progressWidth + '%';

   let musicCurrentTime = container.querySelector('.current-time');
   musicDuration = container.querySelector('.max-duration');
   musicAudio.addEventListener('loadeddata', function(){

   let mainAdDuration = musicAudio.duration;
   let totalMin = Math.floor(mainAdDuration / 60);
   let totalSec = Math.floor(mainAdDuration % 60);
   if(totalSec < 10){
	   totalSec = '0' + totalSec;
   } 

   musicDuration.innerText = '' + totalMin + ':' + totalSec;


});
  /// update song total duration
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){
	  currentSec = '0' + currentSec;
  } 

  musicCurrentTime.innerText = '' + currentMin + ':' + currentSec;


})

// real khela
progressArea.addEventListener('click', function(e){
	let progresswidth = progressArea.clientWidth;
	let clickedOffsetX = e.offsetX;
	let songDuration = musicAudio.duration;

	musicAudio.currentTime = (clickedOffsetX / progresswidth) * songDuration;
	playMusic()
})



// /// change loop
// const repeatBtn = container.querySelector('#repeat-plist');
// repeatBtn.addEventListener('click',()=>{
// 	let getText = repeatBtn.innerText;
// 	switch(getText){
// 		case 'repeat':
// 			repeatBtn.innerText = "repeat_one";
// 			repeatBtn.setAttribute('title', 'song looped');
// 			break;

// 		case 'repeat_one':
// 			repeatBtn.innerText = "shuffle";
// 			repeatBtn.setAttribute('title', 'playback shuffled');
// 			break;	
	
	
// 		case 'shuffle':
// 			repeatBtn.innerText = "repeat";
// 			repeatBtn.setAttribute('title', ' ');
// 			break;
	
// 		}
// })


moreMusicBtn.addEventListener('click',()=>{
	musicList.classList.toggle('show');
});


closeMusicBtn.addEventListener('click',()=>{
	moreMusicBtn.click();
});


const ulTag = container.querySelector('ul');
// let create li tags length for list

for(let i = 0; i < allMusic.length; i++)
{
	let liTag = '<li li-index = "' + (i + 1)+ '"><div class="row">		<span>' + allMusic[i].name + '</span>		<p>' + allMusic[i].artist + '</p></div><audio src="songs/' + allMusic[i].src + '" class="' + allMusic[i].src.slice(0,-4) + '"></audio><span id = "' + allMusic[i].src.slice(0,-4) + '" class="audio-duration">1:45</span></li>'
	ulTag.insertAdjacentHTML('beforeend',liTag)
    
	let liAudioDurationTag = ulTag.querySelector('#' + allMusic[i].src.slice(0,-4) + '');
	let liAudioTag = ulTag.querySelector('.' + allMusic[i].src.slice(0,-4) + '')

	liAudioTag.addEventListener('loadeddata',()=>{

		let duration = liAudioTag.duration;
		let totalMin = Math.floor(duration / 60);
		let totalSec = Math.floor(duration % 60);
		if(totalSec < 10){
			totalSec = '0' + totalSec;
		} 
	 
		liAudioDurationTag.innerText = '' + totalMin + ':' + totalSec;
	});

}


/// play particular song from click on list tag

const allLiTags = ulTag.querySelectorAll('li');
function playingSong(){
	for(let j = 0 ; j < allLiTags.length;j++){
		let audioTag = allLiTags[j].querySelector('.audio-duration');
		
		if(allLiTags[j].classList.contains('playing')) {
			allLiTags[j].classList.remove('playing');
			
		}
		




		if(allLiTags[j].getAttribute('li-index') == musicIndex){
			allLiTags[j].classList.add('playing');
		}
		
		
		
		
		allLiTags[j].setAttribute('onclick','clicked(this)');
	}
}
/// lets play song finally
function clicked(element){
	let getLiIndex = element.getAttribute('li-index');
	musicIndex = getLiIndex;
	loadMusic(musicIndex);
	playMusic();
	playingSong();
}

document.addEventListener('keydown', event => {
	if (event.code === 'Space') {
	  if(count % 2 == 0){
		  pauseMusic();
		  count++;
	  }else{
		  playMusic();
		  count++;
	  }
	}
  })







  





