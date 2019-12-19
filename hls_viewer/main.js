'use strict;'

const watchButton = document.getElementById('watch-button');
const watchStreamKey = document.getElementById('watch-streamkey');
const player = document.getElementById('player');
let playerHLSWrapper = null;

function initHLS(sourceUrl) {
    if (Hls.isSupported()) {
        console.info('HLS playback is supported on your device!');
        playerHLSWrapper = new Hls();
        playerHLSWrapper.loadSource(sourceUrl);
        playerHLSWrapper.attachMedia(player);
        playerHLSWrapper.on(Hls.Events.MANIFEST_PARSED, function() { player.play(); });
    }
    else if (player.canPlayType('application/vnd.apple.mpegurl')) {
        console.warn('HLS playback is not supported on your device, falling back to MPEG streaming.');
        player.src = sourceUrl;
        player.addEventListener('loadedmetadata', function() { player.play(); });
    }
    else {
        alert('Sorry, your device does not support neither HLS oder MPEG streaming. :(')
    }
}

function switchPlayerSource(event) {
    event.preventDefault();
    const streamKey = watchStreamKey.value;
    console.info(`Switching player source to ${streamKey}`)
    if (playerHLSWrapper !== null) {
        playerHLSWrapper.destroy();
    }
    initHLS(`${window.location}/watch/${streamKey}.m3u8`);
}

watchButton.addEventListener('click', switchPlayerSource);
