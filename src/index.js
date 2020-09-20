const home = require('./home');
window.addEventListener('load', e => {
    home.loadHome();
});

/**
 * Page switcher
 * 
 * @param {Page to switch to} page 
 */
const switchPage = (page) => {
    switch (page) {
        case 'home':
            home.loadHome();
            return;
        case 'aboutYou':
            const aboutYou = require('./aboutYou');
            aboutYou.loadAboutYou();
            return;
        case 'ads':
            const ads = require('./adverts');
            ads.loadAds();
            return;
        case 'apps':
            const appsWebsites = require('./appsWebsites');
            appsWebsites.loadAppsWebsites();
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

const aboutYouBtn = document.getElementById('aboutYouBtn')
aboutYouBtn.addEventListener('click', e => {
    switchPage('aboutYou');
});

const adsBtn = document.getElementById('adsBtn')
adsBtn.addEventListener('click', e => {
    switchPage('ads');
});

const appsBtn = document.getElementById('appsBtn')
appsBtn.addEventListener('click', e => {
    switchPage('apps');
});