//declara el array de canciones vazio. esto es necesario para poder referenciarlo fuera del initialize
let songs = [];

// función arrow initialize para inicializar todo (será ejecutada al final de la página)
var initialize = () => {
    // declaración de variables y manipulación de DOM necesarias para las funciones initialize
    const pauseOrPlay = document.getElementById("pause-or-play");
    const songName = document.getElementById("name");
    const artistName = document.getElementById("artist");
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("previous");


    // creación de la variable de objetos canciones
    songs = [
        {
            num: "1",
            name: "Tomentosa",
            artist: "Sarah Soares",
            source: "songs/1-tomentosa.mp3",
            img: "https://i1.sndcdn.com/artworks-MvvHwWJwSY84LxmG-Kjv8Zg-t500x500.jpg",
        },
        {
            num: "2",
            name: "Sete Cidades",
            artist: "Sarah Soares",
            source: "songs/2-sete-cidades-(demo).mp3",
            img: "https://i1.sndcdn.com/artworks-6cDxzsxvyf0yCyaq-lxs2lQ-t500x500.jpg",
        },
        {
            num: "3",
            name: "Merula",
            artist: "Sarah Soares",
            source: "songs/3-merula.mp3",
            img: "https://i1.sndcdn.com/artworks-UW0NGyLOzC0bzSpW-ZRz7BA-t500x500.jpg",
        },
        {
            num: "4",
            name: "Dawn",
            artist: "Sarah Soares",
            source: "songs/4-dawn.mp3",
            img: "https://i1.sndcdn.com/artworks-MvGRuyWhz3W1kLsH-cjpL0Q-t500x500.jpg",
        },
        {
            num: "5",
            name: "Cátodo / Ânodo",
            artist: "Sarah Soares",
            source: "songs/5-catodo-anodo.mp3",
            img: "https://i1.sndcdn.com/artworks-IlnDiMT7lHmyJZBk-9bFoQA-t500x500.jpg",
        },
        {
            num: "6",
            name: "Retrowave Attempt",
            artist: "Sarah Soares",
            source: "songs/6-retrowave-attempt.mp3",
            img: "https://i1.sndcdn.com/artworks-yxxUOEnV8e1wU4st-XL000Q-t500x500.jpg",
        },
        {
            num: "7",
            name: "Blue Dim Light",
            artist: "Sarah Soares",
            source: "songs/7-blue-dim-light.mp3",
            img: "https://i1.sndcdn.com/artworks-bIGc1oO2zWn2cQhC-jw846w-t500x500.jpg",
        },
        {
            num: "8",
            name: "Pirlimpimpom",
            artist: "Sarah Soares",
            source: "songs/8-pirlimpimpom.mp3",
            img: "https://i1.sndcdn.com/artworks-kyObGGkmLJUBdLY6-yW9xyA-t500x500.jpg",
        }
    ];

    //seleción de primera canción de la variable songs definida anteriormente
    firstSong = songs[0];

    // función que crea el elemento de audio y el elemento de portada y los envía al documento html 
    var startFirstSong = () => {
        const albumContainer = document.getElementById("cover");
        var audio_elem = document.createElement('audio');
        audio_elem.setAttribute("id", "song");
        audio_elem.setAttribute("num", firstSong.num);
        audio_elem.setAttribute("src", firstSong.source);
        document.body.appendChild(audio_elem);

        var cover_elem = document.createElement('img');
        cover_elem.setAttribute("id", "album-cover");
        cover_elem.setAttribute("src", firstSong.img);
        albumContainer.appendChild(cover_elem);

        songName.innerHTML = firstSong.name;
        artistName.innerHTML = firstSong.artist;

    }


    //llamada a la función anterior
    startFirstSong();

    //almacena la canción actual para el event listener que cambia la canción cuando la actual termina
    const mainSong = document.getElementById("song");


    // event listener para llamar a la función toggle cuando se hace clic en el botón de id pause-or-play
    pauseOrPlay.addEventListener('click', toggle);
    nextButton.addEventListener('click', nextSong);
    previousButton.addEventListener('click', previousSong);
    mainSong.addEventListener("ended", nextSong);

}


//declaración de variables del DOM que son necesarias para las funciones externas a initialize (son utilizadas apenas caso el usuario haga clic en los botones de control)
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const songName = document.getElementById("name");
const artistName = document.getElementById("artist");


//////////////////////////////////////////////////////////


// función para cambiar el butón de pause para play or vice versa dependiendo si la canción está tocando o no (también inicia o pausa la canción).
var toggle = () => {

    const mainSong = document.getElementById("song");

    if (!mainSong.paused) {
        mainSong.pause();
        playButton.classList.add("active");
        pauseButton.classList.remove("active");

    } else {
        mainSong.play();
        pauseButton.classList.add("active");
        playButton.classList.remove("active");
    }
}


// función convoluta que seleciona la numeración de la canción actual y actualiza para la próxima canción en el array de objetos
// si la canción es la última, va a la primera de la lista. las canciones estan en loop
var nextSong = () => {

    var mainSong = document.getElementById("song");
    var mainCover = document.getElementById("album-cover");

    var nextSongPos = parseInt(mainSong.getAttribute("num"), 10);

    var songsLength = songs.length;

    console.log(mainSong);

    console.log(songsLength);

    console.log(nextSongPos);

    if (nextSongPos === songsLength) {
        mainSong.src = songs[0].source;
        mainCover.src = songs[0].img;
        mainSong.setAttribute("num", songs[0].num);
        songName.innerHTML = songs[0].name;
        artistName.innerHTML = songs[0].artist;

        mainSong = document.getElementById("song");
        toggle();
        mainSong.play();
    } else {
        mainSong.src = songs[nextSongPos].source;
        mainCover.src = songs[nextSongPos].img;
        mainSong.setAttribute("num", songs[nextSongPos].num);
        songName.innerHTML = songs[nextSongPos].name;
        artistName.innerHTML = songs[nextSongPos].artist;

        mainSong = document.getElementById("song");

        toggle();
        mainSong.play();
    }
}


// función convoluta que seleciona la numeración de la canción actual y actualiza para la canción anterior en el array de objetos
//si la canción es la primera, va a la última de lista. las canciones estan en loop
var previousSong = () => {


    var mainSong = document.getElementById("song");
    var mainCover = document.getElementById("album-cover");

    var nextSongPos = parseInt(mainSong.getAttribute("num"), 10);

    var songsLength = songs.length;

    console.log(mainSong);

    console.log(songsLength);

    console.log(nextSongPos);


    if (nextSongPos === 1) {
        mainSong.src = songs[songsLength - 1].source;
        mainCover.src = songs[songsLength - 1].img;
        mainSong.setAttribute("num", songs[songsLength - 1].num);
        songName.innerHTML = songs[songsLength - 1].name;
        artistName.innerHTML = songs[songsLength - 1].artist;

        mainSong = document.getElementById("song");

        toggle();
        mainSong.play();
    } else {
        mainSong.src = songs[nextSongPos - 2].source;
        mainCover.src = songs[nextSongPos - 2].img;
        mainSong.setAttribute("num", songs[songsLength - 2].num);
        songName.innerHTML = songs[nextSongPos - 2].name;
        artistName.innerHTML = songs[nextSongPos - 2].artist;

        mainSong = document.getElementById("song");

        toggle();
        mainSong.play();
    }

}


// ejecuta la función initialize - no importa que estea en final de la página, pues será la primera función a ser llamada y a partir de ahí siguen las otras dentro de su contenido
initialize();

















