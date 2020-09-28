const loadMedia = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Your Photos and Videos</h1>'
}

exports.loadMedia = loadMedia;