const loadAboutYou = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>About You</h1>'
}

exports.loadAboutYou = loadAboutYou;