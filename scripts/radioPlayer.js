export const radioPlayerInit = () => { 
    const radio  = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');


    const audio = new Audio();

    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIcon = () => {
        if (audio.paused){
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        }
        else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }

    const selectChange = (elem) => {
        console.log(radioItem)
        radioItem.forEach(item => {
            item.classList.remove('select')
        });
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = event.target.closest('.radio-item');
        
        selectChange(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeader.textContent = title;

        const img = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = img;

        audio.src=target.dataset.radioStantion;
        radioStop.disabled = false;
        
        audio.play();

        changeIcon();
    })

    radioStop.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
        }
        else {
            audio.pause();
        }
        changeIcon();
    })
}