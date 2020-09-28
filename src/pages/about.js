const loadAbout = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>About Facebook Data Visualizer</h1>'
}

exports.loadAbout = loadAbout;