var audio = document.getElementById('audio')

// html5 function - toggle play/pause btn and audio
$("#plays_btn").click(function() {
    if (audio.paused === false) {
        audio.pause()
    } else {
        audio.play()
    }
})

//control the play and pause button show or hide
audio.addEventListener('play', function () {
    $("#play_btn").hide()
    $("#pause_btn").show()
})

audio.addEventListener('pause', function () {
    $("#play_btn").show()
    $("#pause_btn").hide()
})

// count function for time left
audio.addEventListener("timeupdate", function() {
    var duration = parseInt( audio.duration || 0 )
    var currentTime = parseInt( audio.currentTime || 0)
    var timeLeft = duration - currentTime
    
    var s = timeLeft % 60
    var m = Math.floor( timeLeft / 60 ) % 60
    
    s = s < 10 ? "0" + s : s
    m = m < 10 ? "0" + m : m
    
    $('#timeleft').text("-" + m+ ":" + s)
    
})

//close the playlist by click button
var closePlaylist = () => {
    var listBottom = document.querySelector('#playlist_btn')
    listBottom.addEventListener('click', () => {
        var closeList = document.querySelector('.playList')
        closeList.classList.toggle('close')
    })
}

var makeSongAddress = (element) => {
    var songIndex = Number(element.dataset.index)
    var totalSong = provideTableInfo()
    var address = totalSong[songIndex].SongName

    return '.\\musicLibrary\\' + address
}

var replaceMusic = (adress) => {
    audio.src = adress
    audio.play()
}

var changeCover = (url) => {
    var cover = document.querySelector('.cover-art')
    cover.src = url
}

var changeSongName = (songName) => {
    var song = document.querySelector('h2')
    song.innerHTML = songName
}

var changeArtistName = (artistName) => {
    var artist = document.querySelector('h3')
    artist.innerHTML = artistName
}

//Change song's name, cover, artist name by each song's element
var changeSongArtCov = (songIndex) => {
    // var songIndex = Number(songElement.dataset.index)
    var totalSong = provideTableInfo()
    var eachSong = totalSong[songIndex]

    var coverUrl = eachSong.AlbumURL
    changeCover(coverUrl)

    var songName = eachSong.Title
    changeSongName(songName)

    var artistName = eachSong.Artist
    changeArtistName(artistName)
}


var listPlay = () => {
    var listPlay = document.querySelector('.playList')
    listPlay.addEventListener('click', (event) => {
        var targetSong = event.target
        var songAddress = makeSongAddress(targetSong)
        replaceMusic(songAddress)
        var songIndex = Number(targetSong.dataset.index)
        changeSongArtCov(songIndex)
    })
}

var provideTableInfo = () => {
    return [
        {
            ID:0,
            SongName:'Annika Wells - Break.mp3',
            Title:'Break',
            Artist:'Annika Wells',
            Album: 'Break',
            AlbumURL:'.\\musicLibrary\\MusicCover\\Break.jpeg',
            lrc:'Annika Wells - Break.lrc',
        },
        {
            ID:1,
            SongName:'Niykee Heaton - Bad Intentions.mp3',
            Title:'Bad Intentions',
            Artist:'Niykee Heaton',
            Album: 'Bad Intentions',
            AlbumURL:'.\\musicLibrary\\MusicCover\\Bad Intentions.jpeg',
            lrc:'Niykee Heaton - Bad Intentions.lrc',
        },
        {
            ID:2,
            SongName:'Taylor Swift - Enchanted.mp3',
            Title:'Enchanted',
            Artist:'Taylor Swift',
            Album: 'Speak Now (Extended Version)',
            AlbumURL:'.\\musicLibrary\\MusicCover\\Speak Now (Extended Version).jpeg',
            lrc:'Taylor Swift - Enchanted.lrc',
        },
        {
            ID:3,
            SongName:'Taylor Swift - Shake It Off.mp3',
            Title:'Shake It Off',
            Artist:'Taylor Swift',
            Album: 'Shake It Off',
            AlbumURL:'.\\musicLibrary\\MusicCover\\Shake It Off.jpeg',
            lrc: 'Taylor Swift - Shake It Off.lrc'
        },
    ]
}

var tableRows = (everySong, songIndex) => {
    var Tit = everySong.Title
    var art = everySong.Artist

    return `
        <tr>
            <td>${Tit}</td>
            <td><img class="listplay" src="./icon/play.png" alt="play" data-index="${songIndex}"></td>
            <td>${art}s</td>
        </tr>
    `
}

var addTableRows = () => {
    var rowInfo = provideTableInfo()
    for (var i = 0; i < rowInfo.length; i++) {
        var eachSong = rowInfo[i];
        var cell = tableRows(eachSong, i)
        var insertPosition = document.querySelector('.playList')
        appendHtml(insertPosition, cell)
    }
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var makeSongAdressByIndex = (index) => {
    var totalSong = provideTableInfo()
    var address = totalSong[index].SongName

    return '.\\musicLibrary\\' + address
}

var getSongIndexByName = (name) => {
    var totalSong = provideTableInfo()
    for (var i = 0; i < totalSong.length; i++) {
        var songTitle = totalSong[i].Title;
        if (songTitle === name) {
            return i
        }
    }
}

var getCurSongIndex = () => {
    var songNameEle = document.querySelector('h2')
    var songName = songNameEle.innerHTML

    return getSongIndexByName(songName)
}

var playSongByIndex = (index) => {
    var songAdress = makeSongAdressByIndex(index)
    replaceMusic(songAdress)
}

var buttonPlay = () => {
    var nextBtn = document.querySelector('#next_btn')
    nextBtn.addEventListener('click', () => {
        var currentSong = getCurSongIndex()
        var next = 1
        var newSongIndex = currentSong + next
        if (newSongIndex === 4) {
            newSongIndex = 0
        }
        playSongByIndex(newSongIndex)
        changeSongArtCov(newSongIndex)
    })

    var prevBtn = document.querySelector('#prev_btn')
    prevBtn.addEventListener('click', () => {
        var currentSong = getCurSongIndex()
        var previous = -1
        var oldSongIndex = currentSong + previous
        if (oldSongIndex === -1) {
            oldSongIndex = 3
        }
        playSongByIndex(oldSongIndex)
        changeSongArtCov(oldSongIndex)
    })
}

//Change the song's volume to muted or not.
var silence = () => {
    var muteBtn = document.querySelector('#volume_btn')
    muteBtn.addEventListener('click', () => {
        var sound = audio.muted
        sound = !sound
        audio.muted = sound
    })
}

var __main = () => {
    addTableRows()
    closePlaylist()
    listPlay()
    buttonPlay()
    silence()
}

__main()