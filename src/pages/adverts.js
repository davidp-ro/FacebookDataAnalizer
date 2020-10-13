const loadAds = (config) => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = '<h4>Lorem ipsum dolor sit amet.</h4>';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Advertisements</h1>'
}

exports.loadAds = loadAds;