const botaoPlayPause = document.getElementById('play-pause');
const botaoAvancar = document.getElementById('proximo');
const botaoVoltar = document.getElementById('anterior');
const songName = document.getElementById('song-name');
const nomeBanda = document.getElementById('nome-autor');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const totalTime = document.getElementById('total-time');
const songTime = document.getElementById('song-time');
const fundo = document.getElementById('cor-de-fundo');
const caixa = document.getElementById('box')

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - <3

const danielNaCovaDosLeoes = {
    songName: "Daniel Na Cova Dos Leões",
    file: "daniel_na_cova_dos_leoes",
    artist: "Legião Urbana",
    color: "#b1bfd4",
    box: "#5d7178"
};

const exagerado = {
    songName: "Exagerado",
    file: "exagerado",
    artist: "Cazuza",
    color: "#b3bda2",
    box: "#b1686b"
};

const laVieEnRose = {
    songName: "La Vie En Rose",
    file: "la_vie_en_rose",
    artist: "Michael Bublé & Cécile McLorin Salvant",
    color: "#b68d97",
    box: "#9d5458"
};

const outOfMyLeague = {
    songName: "Out of My League",
    file: "out_of_my_league",
    artist: "Fitz and The Tantrums",
    color: "#acbbbf",
    box: "#a0676e"
};

const radio = {
    songName: "Radio",
    file: "radio",
    artist: "Lana Del Rey",
    color: "#eeddbb",
    box: "#7e8769"
};

const sway = {
    songName: "Sway",
    file: "sway",
    artist: "Michael Bublé",
    color: "#c7b483",
    box: "#a67c3e"
};

const theGirlFromIpanema = {
    songName: "The Girl From Ipanema",
    file: "the_girl_from_ipanema",
    artist: "Tom Jobim & Frank Sinatra",
    color: "#d0b580",
    box: "#b56859"
};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - <3

let taTocando = 0;
const playlist = [laVieEnRose, outOfMyLeague, theGirlFromIpanema, exagerado, sway, radio, danielNaCovaDosLeoes];
let index = 0;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - <3

tocarFaixa = () => {
    song.play();
    botaoPlayPause.classList.remove('bi-play-fill');
    botaoPlayPause.classList.add('bi-pause-fill');
    taTocando = 1;
}
pausarFaixa = () => {
    song.pause();
    botaoPlayPause.classList.remove('bi-pause-fill');
    botaoPlayPause.classList.add('bi-play-fill');
    taTocando = 0;
} 

tocarOuPausar = () => {
    if (taTocando === 0) {
        tocarFaixa();
        taTocando = 1;
    } else {
        pausarFaixa();
        taTocando = 0; 
    }
}

changeBackground = () => {
    fundo.style.backgroundColor = playlist[index].color;
    fundo.style.transition = "background-color 1s"
    caixa.style.backgroundColor = playlist[index].box;
    caixa.style.transition = "background-color 1s"
}

initializeSong = () => {
    cover.src = `/images/${playlist[index].file}.JPG`;
    songName.innerText = playlist[index].songName;
    nomeBanda.innerText = playlist[index].artist;
    song.src = `/songs/${playlist[index].file}.mp3`;
    changeBackground();
}
initializeSong();

proximaFaixa = () => {
    if (index === playlist.length - 1) {
        index = 0;
    } else {
        index = index + 1;
    }

    initializeSong();
    tocarFaixa();
    updateProgress();
}
voltarFaixa = () => {
    if (index === 0) {
        index = playlist.length - 1;
    } else {
        index = index - 1;
    }

    initializeSong();
    tocarFaixa();
    updateProgress();
}

updateProgress = () => {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toMinuteAndSecond(song.currentTime);
}

jumpTo = (event) => {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

toMinuteAndSecond = (originalNumber) => {
    let hours = Math.floor(originalNumber/ 3600);
    let minutes = Math.floor((originalNumber - hours * 3600) / 60);
    let seconds = Math.floor((originalNumber - hours * 3600) - minutes*60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, "0")}`;
}

updateTotalTime = () => {
    totalTime.innerText = toMinuteAndSecond(song.duration);
}

musicEnds = () => {
    index = (index + 1) % playlist.length;
    song.src = playlist[index];

    initializeSong();
    tocarFaixa();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - <3

botaoPlayPause.addEventListener('click', tocarOuPausar);
botaoAvancar.addEventListener('click', proximaFaixa);
botaoVoltar.addEventListener('click', voltarFaixa);
song.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', jumpTo)
song.addEventListener('loadedmetadata', updateTotalTime)
song.addEventListener('ended', musicEnds)
