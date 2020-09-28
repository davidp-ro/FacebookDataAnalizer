const loadGroups = () => {
    changeTitle();

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Groups</h1>'
}

exports.loadGroups = loadGroups;