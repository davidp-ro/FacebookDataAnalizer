const fs = require('fs');
const home = require('./pages/home');
const ipcRenderer = require('electron').ipcRenderer;
let config; // Config object

window.addEventListener('load', e => {
    // Load the config
    ipcRenderer.send('getConfig')
    ipcRenderer.on('loadConfig', (event, args) => {
        config = args.config;
        if (fs.existsSync(config.dataPath)) {
            // Config is valid
            home.loadHome(config);
        } else {
            // Config is invalid
            home.loadHome(null);
        }
    });
});

/**
 * Page switcher
 * 
 * @param {Page to switch to} page 
 */
const switchPage = (page) => {
    switch (page) {
        case 'home':
            home.loadHome(config);
            return;
        case 'profile':
            const profile = require('./pages/profile');
            profile.loadYourProfile(config);
            return;
        case 'aboutYou':
            const aboutYou = require('./pages/aboutYou');
            aboutYou.loadAboutYou(config);
            return;
        case 'followersAndFollowing':
            const followersAndFollowing = require('./pages/followersAndFollowing');
            followersAndFollowing.loadFollowersAndFollowing(config);
            return;
        case 'friends':
            const friends = require('./pages/friends');
            friends.loadFriends(config);
            return;
        case 'messages':
            const messages = require('./pages/messages');
            messages.loadMessages(config);
            return;
        case 'comments':
            const comments = require('./pages/comments');
            comments.loadComments(config);
            return;
        case 'media':
            const media = require('./pages/media');
            media.loadMedia(config);
            return;
        case 'ads':
            const ads = require('./pages/adverts');
            ads.loadAds(config);
            return;
        case 'apps':
            const appsWebsites = require('./pages/appsWebsites');
            appsWebsites.loadAppsWebsites(config);
            return;
        case 'events':
            const events = require('./pages/events');
            events.loadEvents(config);
            return;
        case 'groups':
            const groups = require('./pages/groups');
            groups.loadGroups(config);
            return;
        case 'security':
            const security = require('./pages/security');
            security.loadSecurity(config);
            return;
        case 'saved':
            const saved = require('./pages/saved');
            saved.loadSaved(config);
            return;
        case 'archive':
            const archive = require('./pages/archive');
            archive.loadArchive(config);
            return;
        case 'about':
            const about = require('./pages/about');
            about.loadAbout(config);
            return;
        default:
            console.warn('Page ' + page + ' is invalid');
            return;
    }
}

/* Button listeners */
const homeBtn = document.getElementById('homeBtn')
homeBtn.addEventListener('click', e => {
    switchPage('home');
});

const profileBtn = document.getElementById('profileBtn')
profileBtn.addEventListener('click', e => {
    switchPage('profile');
});

const aboutYouBtn = document.getElementById('aboutYouBtn')
aboutYouBtn.addEventListener('click', e => {
    switchPage('aboutYou');
});

const followBtn = document.getElementById('followBtn')
followBtn.addEventListener('click', e => {
    switchPage('followersAndFollowing');
});

const friendsBtn = document.getElementById('friendsBtn')
friendsBtn.addEventListener('click', e => {
    switchPage('friends');
});

const messagesBtn = document.getElementById('messagesBtn')
messagesBtn.addEventListener('click', e => {
    switchPage('messages');
});

const commentsBtn = document.getElementById('commentsBtn')
commentsBtn.addEventListener('click', e => {
    switchPage('comments');
});

const mediaBtn = document.getElementById('mediaBtn')
mediaBtn.addEventListener('click', e => {
    switchPage('media');
});

const adsBtn = document.getElementById('adsBtn')
adsBtn.addEventListener('click', e => {
    switchPage('ads');
});

const appsBtn = document.getElementById('appsBtn')
appsBtn.addEventListener('click', e => {
    switchPage('apps');
});

const eventsBtn = document.getElementById('eventsBtn')
eventsBtn.addEventListener('click', e => {
    switchPage('events');
});

const groupsBtn = document.getElementById('groupsBtn')
groupsBtn.addEventListener('click', e => {
    switchPage('groups');
});

const securityBtn = document.getElementById('securityBtn')
securityBtn.addEventListener('click', e => {
    switchPage('security');
});

const savedBtn = document.getElementById('savedBtn')
savedBtn.addEventListener('click', e => {
    switchPage('saved');
});

const archiveBtn = document.getElementById('archiveBtn')
archiveBtn.addEventListener('click', e => {
    switchPage('archive');
});

const aboutBtn = document.getElementById('aboutBtn')
aboutBtn.addEventListener('click', e => {
    switchPage('about');
});