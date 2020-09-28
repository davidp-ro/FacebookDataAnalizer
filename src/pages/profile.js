const loadYourProfile = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Your profile</h1>'
}

exports.loadYourProfile = loadYourProfile;