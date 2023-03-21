// I brani all'interno del nostro MUSIC PLAYER
let tracks = [
    {'url': './audio/song-1.mp3', 'cover': './cover/cover-1.jpg', 'artist': 'Ghostrifter', 'title': 'Midnight Stroll'},
    {'url': './audio/song-2.mp3', 'cover': './cover/cover-2.jpg', 'artist': 'Ghostrifter', 'title': 'Hot Coffee'},
    {'url': './audio/song-3.mp3', 'cover': './cover/cover-3.jpg', 'artist': 'Ghostrifter', 'title': 'Merry Bay'},
    {'url': './audio/song-4.mp3', 'cover': './cover/cover-4.jpg', 'artist': 'Ghostrifter', 'title': 'Morning Routine'},
    {'url': './audio/song-5.mp3', 'cover': './cover/cover-5.jpg', 'artist': 'Ghostrifter', 'title': 'Still Awake'},
    {'url': './audio/song-6.mp3', 'cover': './cover/cover-6.jpg', 'artist': 'Ghostrifter', 'title': 'Afternoon Nap'},
    {'url': './audio/song-7.mp3', 'cover': './cover/cover-7.jpg', 'artist': 'Ghostrifter', 'title': 'Demised To Shield'},
    {'url': './audio/song-8.mp3', 'cover': './cover/cover-8.jpg', 'artist': 'Ghostrifter', 'title': 'Departue'},
    {'url': './audio/song-9.mp3', 'cover': './cover/cover-9.jpg', 'artist': 'Ghostrifter', 'title': 'Mellow Out'},
    {'url': './audio/song-10.mp3', 'cover': './cover/cover-10.jpg', 'artist': 'Ghostrifter', 'title': 'Simplicit Nights'}
];

// Catturare la COLONNA 2
let wrapper = document.querySelector('#wrapper');

// Inizializzare un contatore di brani
let counterTrack = 0;

// Inizializzare l'oggetto audio, perche' dovremo ricrealo  ogni volta che si cambia il brano
let audio = null;

// Permette di mappare un range di valori in un altro
function showProgressBar(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

// Funzione per creare la sezione AUDIO-COVER
function createCover(array) {
    // Ripulire la sezione
    wrapper.innerHTML = '';

    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-3', 'col-lg-5', 'd-flex', 'justify-content-center');
    div.innerHTML = `
        <!-- Immagine Cover -->
        <img class="img-cover" src="${array[counterTrack].cover}" alt="">

        <!-- File Audio -->
        <audio preload="metadata">
            <source src="${array[counterTrack].url}" type="audio/mpeg">
        </audio>
        
}

    `;
    wrapper.appendChild(div);

    // Catturare l'emento audio ogni volta che verra' lanciata questa funzione
    audio = document.querySelector('audio');
}

// Funzione per creare la sezione INFO del brano
function createInfoTrack(array) {
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-5', 'col-lg-6');
    div.innerHTML = `
        <h2>${array[counterTrack].title}</h2>
        <h3>${array[counterTrack].artist}</h3>
        
        <!-- Progres bar -->
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div id="progressBar" class="progress-bar" style="width: 0%"></div>
        </div>
        
        <!-- Tempo Inizio e Fine del brano -->
        <div class="d-flex justify-content-between">
            <!-- Tempo Inizio del brano -->
            <p id="currentTime">0:00</p>
            <!-- Durata del brano -->
            <p id="durationTrack">3:00</p>
        </div>

        <!-- sezione Pulsanti AUDIO -->
        <div class="d-flex justify-content-between">
            <!-- Prev -->
            <button id="btnPrev" class="btn border"><i class="fa-solid fa-backward fs-3"></i></button>
            <!-- Play -->
            <button id="btnPlay" class="btn border"><i class="fa-solid fa-play fs-3"></i></button>
            <!-- Next -->
            <button id="btnNext" class="btn border"><i class="fa-solid fa-forward fs-3"></i></button>
        </div>
    `;
    wrapper.appendChild(div);

    // Catturare i pulsanti
    let btnPlay = document.querySelector('#btnPlay');
    let btnNext = document.querySelector('#btnNext');
    let btnPrev = document.querySelector('#btnPrev');

    // Catturare le info del Tempo di esecuzione del brano
    let durationTrack = document.querySelector('#durationTrack');
    let currentTime = document.querySelector('#currentTime');

    // Catturare la progressbar
    let progressBar = document.querySelector('#progressBar');

 
   /* // Gestione PLAY
    btnPlay.addEventListener('click', () => {    
        if (audio.paused) {
            audio.play();
            btnPlay.innerHTML = `<i class="fa-solid fa-pause fs-3"></i>`;
        } else {
            audio.pause();
            btnPlay.innerHTML = `<i class="fa-solid fa-play fs-3"></i>`;
        }
    })  */

    // Gestione PLAY
btnPlay.addEventListener('click', () => {    
    if (audio.paused) {
        audio.play();
        btnPlay.innerHTML = `<i class="fa-solid fa-pause fs-3"></i>`;
        document.querySelector('.img-cover').classList.add('spin'); // aggiungi la classe 'spin' all'elemento dell'immagine
    } else {
        audio.pause();
        btnPlay.innerHTML = `<i class="fa-solid fa-play fs-3"></i>`;
        document.querySelector('.img-cover').classList.remove('spin'); // rimuovi la classe 'spin' dall'elemento dell'immagine
    }
})







    // Gestione NEXT
    btnNext.addEventListener('click', () => {
        if (counterTrack < array.length - 1) {
            // Incrementiamo il contatore, che rappresentera' l'indice del brano, per passare al brano successivo
            counterTrack++;
        } else {
            counterTrack = 0;
        }
        
        createCover(tracks);
        createInfoTrack(tracks); 

        console.log(counterTrack);
    })

    // Gestione Prev
    btnPrev.addEventListener('click', () => {
        if (counterTrack > 0) {
            // Decrementiamo il contatore per passare al brano precedente
            counterTrack--; 
        } else {
            counterTrack = array.length - 1;
        }
        createCover(tracks);
        createInfoTrack(tracks); 
        console.log(counterTrack);
        
    })

    /**
     *  Gestione Tempo di un brano
     */
    // Mettere in ascolto l'oggetto audio sul caricamento delle meta info del brano
    let duration = 0;
    audio.addEventListener('loadedmetadata', () => {
        let minutes = audio.duration / 60;
        duration = minutes.toFixed(2);
        durationTrack.innerHTML = duration;
    })

    // Mettere in ascolto l'oggetto audio sul cambiamento del tempo del brano che scorre
    audio.addEventListener('timeupdate', () => {
        let minutes = audio.currentTime / 60;
        let currentTimeTrack = minutes.toFixed(2);
        currentTime.innerHTML = currentTimeTrack;

        progressBar.style.width = `${showProgressBar(currentTimeTrack, 0, duration, 0, 100)}%`


        console.log(currentTimeTrack);
    })


}

// Invocare al caricamento della pagina:
// la funzione createCover() e la funzione createInfoTrack
createCover(tracks);
createInfoTrack(tracks);

console.log(tracks);



