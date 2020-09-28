const loadFollowersAndFollowing = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Your Followers and who you\'re following</h1>'
}

exports.loadFollowersAndFollowing = loadFollowersAndFollowing;