const path = require('path');
const randColor = require('../utils/getRandomW3Color');

const loadFollowersAndFollowing = (config) => {
    changeTitle();

    // Left off @ thinking how to organize view for followers

    const page = document.getElementById('mainPage');
    page.innerHTML = `
    <div class="w3-card w3-margin-left w3-margin-right w3-margin-top w3-margin-bottom w3-light-grey">
        <div class="button-bar" style="margin-bottom: 0">
            <button id="followingBtn" class="w3-button w3-margin-left">Following</button>
            <button id="followersBtn" class="w3-button">Followers</button>
            <button id="followedPagesBtn" class="w3-button w3-margin-right">Followed Pages</button>
        </div>
        <div id="pageContent" class="w3-card w3-margin-left w3-margin-right w3-margin-bottom w3-white" style="margin-top: 0;">
            <h4 style="padding: 25px; text-align: center; margin-block-start: 0; margin-block-end: 0;">Select the category above</h4>
        </div>
    </div>
    `;

    const content = document.getElementById('pageContent');

    const followingBtn = document.getElementById('followingBtn');
    const followersBtn = document.getElementById('followersBtn');
    const followedPagesBtn = document.getElementById('followedPagesBtn');

    followingBtn.addEventListener('click', e => {
        followingBtn.style.backgroundColor = '#fff';
        followersBtn.style.backgroundColor = '#F1F1F1';
        followedPagesBtn.style.backgroundColor = '#F1F1F1';
        loadFollowing(config, content);
    });
    followersBtn.addEventListener('click', e => {
        followingBtn.style.backgroundColor = '#F1F1F1';
        followersBtn.style.backgroundColor = '#fff';
        followedPagesBtn.style.backgroundColor = '#F1F1F1';
        loadFollowers(config, content);
    });
    followedPagesBtn.addEventListener('click', e => {
        followingBtn.style.backgroundColor = '#F1F1F1';
        followersBtn.style.backgroundColor = '#F1F1F1';
        followedPagesBtn.style.backgroundColor = '#fff';
        loadFollowedPages(config, content);
    });
}

/**
 * Show the people you follow
 * 
 * @param {Config} config Config obj.
 * @param {HTMLElement} ctn The inside card
 */
const loadFollowing = (config, ctn) => {
    const rawFollowing = require(path.join(config.dataPath, 'following_and_followers', 'following.json'));

    let leftColumn = "";
    let rightColumn = "";
    const generateData = () => {
        following = rawFollowing.following;
        for (index = 0; index < following.length; ++index) {
            follower = following[index];
            if (index % 2 === 0) {
                // Even, goes in column 1
                leftColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${follower.name}, since ${new Date(follower.timestamp * 1000).toString().substr(0, 15)}
                </p><br>`;
            } else {
                // Odd, goes in column 2
                rightColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${follower.name}, since ${new Date(follower.timestamp * 1000).toString().substr(0, 15)}
                </p><br>`;
            }
        }
    }

    generateData();
    ctn.innerHTML = '<h4 style="padding: 10px; margin-block-start: 0; margin-block-end: 0;">Theese are the people that you follow:</h4>'
    ctn.innerHTML += `
    <div class="row w3-margin-left w3-margin-right">
        <div class="column">${leftColumn}</div>
        <div class="column">${rightColumn}</div>
    </div>
    `
}

/**
 * Show the people that follow you
 * 
 * @param {Config} config Config obj.
 * @param {HTMLElement} ctn The inside card
 */
const loadFollowers = (config, ctn) => {
    const rawFollowers = require(path.join(config.dataPath, 'following_and_followers', 'followers.json'));

    let leftColumn = "";
    let rightColumn = "";
    const generateData = () => {
        followers = rawFollowers.followers;
        for (index = 0; index < followers.length; ++index) {
            follower = followers[index];
            if (index % 2 === 0) {
                // Even, goes in column 1
                leftColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${follower.name}
                </p><br>`;
            } else {
                // Odd, goes in column 2
                rightColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${follower.name}
                </p><br>`;
            }
        }
    }

    generateData();
    ctn.innerHTML = '<h4 style="padding: 10px; margin-block-start: 0; margin-block-end: 0;">Theese are the people follow you:</h4>'
    ctn.innerHTML += `
    <div class="row w3-margin-left w3-margin-right">
        <div class="column">${leftColumn}</div>
        <div class="column">${rightColumn}</div>
    </div>
    `
}

/**
 * Show the pages you follow
 * 
 * @param {Config} config Config obj.
 * @param {HTMLElement} ctn The inside card
 */
const loadFollowedPages = (config, ctn) => {
    const rawFollowedPages = require(path.join(config.dataPath, 'following_and_followers', 'followed_pages.json'));

    let leftColumn = "";
    let rightColumn = "";
    const generateData = () => {
        pages = rawFollowedPages.pages_followed;
        for (index = 0; index < pages.length; ++index) {
            page = pages[index];
            let pageName;
            try {
                pageName = page.data[0].name;
            } catch (e) {
                pageName = page.attachments[0].data[0].text;
            }
            if (index % 2 === 0) {
                // Even, goes in column 1
                leftColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${pageName}, since ${new Date(page.timestamp * 1000).toString().substr(0, 15)}
                </p><br>`;
            } else {
                // Odd, goes in column 2
                rightColumn += `
                <p>
                    <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                    ${pageName}, since ${new Date(page.timestamp * 1000).toString().substr(0, 15)}
                </p><br>`;
            }
        }
    }

    generateData();
    ctn.innerHTML = '<h4 style="padding: 10px; margin-block-start: 0; margin-block-end: 0;">Theese are the pages that you follow:</h4>'
    ctn.innerHTML += `
    <div class="row w3-margin-left w3-margin-right">
        <div class="column">${leftColumn}</div>
        <div class="column">${rightColumn}</div>
    </div>
    `
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Your Followers and who you\'re following</h1>'
}

exports.loadFollowersAndFollowing = loadFollowersAndFollowing;