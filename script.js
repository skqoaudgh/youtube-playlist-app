let nextPageToken, prevPageToken;

document.addEventListener('DOMContentLoaded', function() {
    let key = 'AIzaSyAKol0ai1U9nSW4NEXHQ57vEz2sG926WNc';
    let playlistId = 'PLVj73insf4VCwtSsS0b6IJDO4uvtYA1Vc';
    let url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');

    let option = {
        part: 'snippet',
        key: key,
        playlistId: playlistId,
        maxResults: 20
    }

    loadVideos();

    function loadVideos(token='') {
        option.pageToken = token;
        url.search = new URLSearchParams(option).toString();

        fetch(url)
        .then(res => res.json())
        .then(data => {
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;
            let id = data.items[0].snippet.resourceId.videoId;
            mainVideo(id);
            resultsLoop(data.items);
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

    function resultsLoop(data) {
        const main = document.getElementsByTagName('main')[0];
        main.innerHTML = '';

        data.forEach(item => {
            const thumb = item.snippet.thumbnails.medium.url;
            const title = item.snippet.title;
            const description = item.snippet.description;
            const id = item.snippet.resourceId.videoId;

            main.innerHTML += `
                <article class="item" data-key="${id}">
                    <img src="${thumb}" alt="" class="thumb">
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${description}</p>
                    </div>
                </article>
            `;
        });

        main.addEventListener('click', function(e) {
            let article = e.target;
            if(e.target.tagName == 'IMG' || e.target.tagName == 'DIV') {
                article = e.target.parentNode;
            }
            else if(e.target.tagName == 'H4' || e.target.tagName == 'P') {
                article = e.target.parentNode.parentNode;
            }
            let id = article.getAttribute('data-key');
            mainVideo(id);
        });
    }

    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');
    leftBtn.addEventListener('click', function() {
        loadVideos(prevPageToken);
    });
    rightBtn.addEventListener('click', function() {
        loadVideos(nextPageToken);
    });
});