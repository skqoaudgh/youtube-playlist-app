document.addEventListener('DOMContentLoaded', function() {
    let key = 'AIzaSyAKol0ai1U9nSW4NEXHQ57vEz2sG926WNc';
    let playlistId = 'PLVj73insf4VDeQEgraOpL7DNm4tHoSp63';
    let url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');

    let option = {
        part: 'snippet',
        key: key,
        playlistId: playlistId,
        maxResults: 20
    }

    url.search = new URLSearchParams(option).toString();

    loadVideos();

    function loadVideos() {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            let id = data.items[0].snippet.resourceId.videoId;
            mainVideo(id);
        });
    }

    function mainVideo(id) {
        const main = document.getElementById('video');
        main.innerHTML = `
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${id}"
                frameborder="0" 
                allow="accelerometer; 
                autoplay; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }
});