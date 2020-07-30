export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioPlayer = document.querySelector('.audio-player');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['In The End', 'Numb', 'lose yourself'];

    let trackIndex = 0; 

    const addZero = n => n < 10 ? '0' + n : n;

    const loadTrack = () => {
        console.log("true")
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `audio/${track}.jpg` 
        audioHeader.textContent = track.toUpperCase(); 
        audioPlayer.src = `./audio/${track}.mp3`

        if(isPlayed) {
            audioPlayer.pause();
        }
        else {
            audioPlayer.play();
        }

    }


    audioNavigation.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target)

        if(target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            

            if(audioPlayer.paused) {
                audioPlayer.play();
            }
            else {
                audioPlayer.pause();
            }
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
            audioImg.src = `./audio/${track}.jpg`
            
        }

        if(target.classList.contains('audio-button__prev')) {
            if(trackIndex !== 0){
                trackIndex--;
            }
            else {
                trackIndex = playlist.length-1;
            }
            loadTrack();
        }

        if(target.classList.contains('audio-button__next')) {
            if(trackIndex === playlist.length-1){
                trackIndex = 0
            }
            else {
                trackIndex++;
            }
            loadTrack();
        }
    })

    audioPlayer.addEventListener('ended', () => {
        if(trackIndex === playlist.length-1){
            trackIndex = 0
        }
        else {
            trackIndex++;
        }
        loadTrack();
        audioPlayer.play();
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%'; 

        let minutePassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';
        
        let minuteTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed )}`;
        audioTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    })


    audioProgress.addEventListener('click', (event) => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })



    // const toggleIcon = () => {
    //     if(audioPlayer.paused){
    //         audioButtonPlay.classList.remove('fa-pause');
    //         audioButtonPlay.classList.add('fa-play');
    //     }
    //     else {
    //         audioButtonPlay.classList.add('fa-pause');
    //         audioButtonPlay.classList.remove('fa-play');
    //     }
    // }

    

    // const togglePlay = () => {
    //     if(audioPlayer.paused){
    //         audioPlayer.play();
    //     }
    //     else {
    //         audioPlayer.pause();
    //     }

    //    toggleIcon()

    // }

    // const addZero = n => n < 10 ? '0' + n : n;
    

    // audioButtonPlay.addEventListener('click', togglePlay);

    // audioButtonPlay.addEventListener('play', toggleIcon);
    // audioButtonPlay.addEventListener('pause', toggleIcon);


   

    // audioProgress.addEventListener('change', () => {
    //     const duration = audioPlayer.duration;
    //     const value = audioProgress.value;

    //      audioPlayer.currentTime = (value * duration) / 100;
    // })
}