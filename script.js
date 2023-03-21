// Brani music player

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

// Catturare colonna 2
let wrapped = document.querySelector ('#wrapped')

// contatore brani
let counterTrack = 0;

// Inzializzare l'oggetto audio
let audio = null;

// Mappare un range di valori in un altro
function showProgressBar( x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  
// Funzione per creare la funzione AUDIO/COVER
  function createCover(array){
    wrapped.innerHTML = '';

    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-3');
    div.innerHTML=`
    <!-- immagine cover -->
    <img class="imgcover"src="${array[counterTrack].cover}" alt="">
    
    <!-- file audio  -->
    <audio preload="metadata">
        <source src="${array[counterTrack].url}" type="audio/mpeg">
    </audio>
    `;

    wrapped.appendChild(div);

      // Catturiamo l'elemento audio ogni volta che verrà lanciata questa funzione
       audio = document.querySelector('audio');
    
} 




/* Funzione per creare la sezione info */
function createInfoTrack (array){
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-5');
    div.innerHTML=`
    <h2>${array[counterTrack].title}</h2>
    <h3>${array[counterTrack].artist}</h3>
    <!-- Progress bar -->
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div id="progressBar"class="progress-bar" style="width: 0%"></div>
      </div>
    <!-- Tempo inzio e fine del brano   -->
    <div class="d-flex justify-content-between">
        <p id="currentTime">0:00</p>
        <p id="durationTrack">3:00</p>
    </div>
   <!-- Sezione pulsanti audio -->
   <div class="d-flex justify-content-between">
    
   <button id="btnPrev" class="btn fs-3"><i class="fa-solid fa-backward"></i></button>
    
    <button id="btnPlay" class="btn fs-3"><i class="fa-solid fa-play"></i></button>
    
    <button id="btnNext"class="btn fs-3"><i class="fa-solid fa-forward"></i></button>
    `;
    wrapped.appendChild(div);




    // Catturiamo i pulsanti
    let btnPlay = document.querySelector('#btnPlay');
    let btnNext = document.querySelector('#btnNext');
    let btnPrev = document.querySelector('#btnPrev');
    
    let durationTrack = document.querySelector('#durationTrack');
    let currentTime = document.querySelector('#currentTime');
    let progressBar = document.querySelector ('#progressBar');


  

    let imgCover = document.querySelector('.imgcover');

    // istruzioni per fermare la rotazione della cover quando clicco su pausa e farla riprendere quando clicco su play.

    // Nascondi la rotazione della cover all'avvio della pagina
   imgCover.style.animationPlayState = 'paused';

   // Aggiungi l'evento 'click' al pulsante di riproduzione
    btnPlay.addEventListener('click', () => {
    if(audio.paused){
        audio.play();  
        btnPlay.innerHTML =`<i class="fa-solid fa-pause fs-3"></i>`;
        // Fai partire la rotazione della cover solo quando il brano inizia a suonare
        imgCover.style.animationPlayState = 'running';  
    } else{
        audio.pause();
        btnPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
        // Ferma la rotazione della cover quando il brano viene messo in pausa
        imgCover.style.animationPlayState = 'paused';
    }
})







    
    

    
    
    
    
    // Pulsante Next
    btnNext.addEventListener('click', () => {
        if(counterTrack < array.length - 1){
            counterTrack++;

        } else{
            counterTrack = 0
        }
        
        createCover(tracks);
        createInfoTrack(tracks);


    })

    // Pulsante Prev
    btnPrev.addEventListener('click', () => {
        if(counterTrack > 0) {
            counterTrack--;

        } else{
            counterTrack = array.length - 1;
        }
        
        createCover(tracks);
        createInfoTrack(tracks);


    })

    let duration = 0;
    
    // Gestione tempo brano
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



// INVOCARE LE DUE FUNZIONI
createCover(tracks);
createInfoTrack(tracks);