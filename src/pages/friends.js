const path = require('path');
const randColor = require('../utils/getRandomW3Color');

const loadFriends = (config) => {
    changeTitle();

    class FriendData {
        constructor(presentFriends, removedFriends, receivedRequests,
            rejectedRequests, sentRequests) {
            this.presentFriends = presentFriends;
            this.removedFriends = removedFriends;
            this.receivedRequests = receivedRequests;
            this.rejectedRequests = rejectedRequests;
            this.sentRequests = sentRequests;
        }

        get usersPresentFriends() {
            this.leftCol = "";
            this.rightCol = "";

            for (let index = 0; index < this.presentFriends.friends.length; ++index) {
                const friend = this.presentFriends.friends[index];
                if (index % 2 === 0) {
                    // Even, goes in column 1
                    this.leftCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                } else {
                    // Odd, goes in column 2
                    this.rightCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                }
            }

            return { leftColumn: this.leftCol, rightColumn: this.rightCol };
        }

        get usersRemovedFriends() {
            this.leftCol = "";
            this.rightCol = "";

            for (let index = 0; index < this.removedFriends.deleted_friends.length; ++index) {
                const friend = this.presentFriends.friends[index];
                if (index % 2 === 0) {
                    // Even, goes in column 1
                    this.leftCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                } else {
                    // Odd, goes in column 2
                    this.rightCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                }
            }

            return { leftColumn: this.leftCol, rightColumn: this.rightCol };
        }

        get usersReceivedRequests() {
            this.leftCol = "";
            this.rightCol = "";

            for (let index = 0; index < this.receivedRequests.received_requests.length; ++index) {
                const friend = this.presentFriends.friends[index];
                if (index % 2 === 0) {
                    // Even, goes in column 1
                    this.leftCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                } else {
                    // Odd, goes in column 2
                    this.rightCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                }
            }

            return { leftColumn: this.leftCol, rightColumn: this.rightCol };
        }

        get usersRejectedRequests() {
            this.leftCol = "";
            this.rightCol = "";

            for (let index = 0; index < this.rejectedRequests.rejected_requests.length; ++index) {
                const friend = this.presentFriends.friends[index];
                if (index % 2 === 0) {
                    // Even, goes in column 1
                    this.leftCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                } else {
                    // Odd, goes in column 2
                    this.rightCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                }
            }

            return { leftColumn: this.leftCol, rightColumn: this.rightCol };
        }

        get usersSentRequests() {
            let leftCol = "";
            let rightCol = "";

            for (let index = 0; index < this.sentRequests.sent_requests.length; ++index) {
                const friend = this.presentFriends.friends[index];
                if (index % 2 === 0) {
                    // Even, goes in column 1
                    leftCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                } else {
                    // Odd, goes in column 2
                    rightCol += /*html*/ `
                    <p>
                        <i class="material-icons w3-left w3-circle w3-margin-right ${randColor.getColor(true)}">api</i>
                        ${friend.name}, since: ${new Date(friend.timestamp * 1000).toString().substr(0, 15)}
                    </p><br>
                    `
                }
            }

            return { leftColumn: leftCol, rightColumn: rightCol };
        }
    }

    const page = document.getElementById('mainPage');
    page.innerHTML = 'Loading...';

    friendData = new FriendData(
        require(path.join(config.dataPath, 'friends', 'friends.json')),
        require(path.join(config.dataPath, 'friends', 'removed_friends.json')),
        require(path.join(config.dataPath, 'friends', 'received_friend_requests.json')),
        require(path.join(config.dataPath, 'friends', 'rejected_friend_requests.json')),
        require(path.join(config.dataPath, 'friends', 'sent_friend_requests.json'))
    );

    page.innerHTML = /*html*/ `
    <div class="w3-card w3-margin-left w3-margin-right w3-margin-top w3-margin-bottom w3-light-grey">
        <div class="button-bar" style="margin-bottom: 0">
            <button id="friendsNowBtn" class="w3-button w3-margin-left">Your Friends</button>
            <button id="removedFriendsBtn" class="w3-button">Removed Friends</button>
            <button id="receivedReqBtn" class="w3-button">Recieved Friend Requests</button>
            <button id="rejectedReqBtn" class="w3-button">Rejected Friend Requests</button>
            <button id="sentReqBtn" class="w3-button w3-margin-right">Sent Friend Requests</button>
        </div>
        <div id="pageContent" class="w3-card w3-margin-left w3-margin-right w3-margin-bottom w3-white" style="margin-top: 0;">
            <h4 style="padding: 25px; text-align: center; margin-block-start: 0; margin-block-end: 0;">Select the category above</h4>
        </div>
    </div>
    `;



    // This is bad I know, but I wanted to move on to more interesting stuff, and
    // not waste too much time on this
    const friendsBtn = document.getElementById('friendsNowBtn');
    const removedFriendsBtn = document.getElementById('removedFriendsBtn');
    const receivedReqBtn = document.getElementById('receivedReqBtn');
    const rejectedReqBtn = document.getElementById('rejectedReqBtn');
    const sentReqBtn = document.getElementById('sentReqBtn');
    const registerListeners = () => {
        friendsBtn.addEventListener('click', e => {
            friendsBtn.style.backgroundColor = '#fff';
            removedFriendsBtn.style.backgroundColor = '#F1F1F1';
            receivedReqBtn.style.backgroundColor = '#F1F1F1';
            rejectedReqBtn.style.backgroundColor = '#F1F1F1';
            sentReqBtn.style.backgroundColor = '#F1F1F1';
            loadUserFriends(friendData);
        });
        removedFriendsBtn.addEventListener('click', e => {
            friendsBtn.style.backgroundColor = '#F1F1F1';
            removedFriendsBtn.style.backgroundColor = '#fff';
            receivedReqBtn.style.backgroundColor = '#F1F1F1';
            rejectedReqBtn.style.backgroundColor = '#F1F1F1';
            sentReqBtn.style.backgroundColor = '#F1F1F1';
            loadRemovedFriends(friendData);
        });
        receivedReqBtn.addEventListener('click', e => {
            friendsBtn.style.backgroundColor = '#F1F1F1';
            removedFriendsBtn.style.backgroundColor = '#F1F1F1';
            receivedReqBtn.style.backgroundColor = '#fff';
            rejectedReqBtn.style.backgroundColor = '#F1F1F1';
            sentReqBtn.style.backgroundColor = '#F1F1F1';
            loadRecievedReq(leftCol, rightCol, friendData);
        });
        rejectedReqBtn.addEventListener('click', e => {
            friendsBtn.style.backgroundColor = '#F1F1F1';
            removedFriendsBtn.style.backgroundColor = '#F1F1F1';
            receivedReqBtn.style.backgroundColor = '#F1F1F1';
            rejectedReqBtn.style.backgroundColor = '#fff';
            sentReqBtn.style.backgroundColor = '#F1F1F1';
            loadRejectedReq(leftCol, rightCol, friendData);
        });
        sentReqBtn.addEventListener('click', e => {
            friendsBtn.style.backgroundColor = '#F1F1F1';
            removedFriendsBtn.style.backgroundColor = '#F1F1F1';
            receivedReqBtn.style.backgroundColor = '#F1F1F1';
            rejectedReqBtn.style.backgroundColor = '#F1F1F1';
            sentReqBtn.style.backgroundColor = '#fff';
            loadSentReq(leftCol, rightCol, friendData);
        });
    }
    registerListeners();
}

let wasContentSet = false;

const setContent = () => {
    const content = document.getElementById('pageContent');
    content.innerHTML = /*html*/ `
    <div class="row w3-margin-left w3-margin-right">
        <div id="left-col" class="column"></div>
        <div id="right-col" class="column"></div>
    </div>
    `
    wasContentSet = true;
}

const loadUserFriends = (friendData) => {
    if (!wasContentSet) setContent();
    const leftCol = document.getElementById('left-col');
    const rightCol = document.getElementById('right-col');

    const data = friendData.usersPresentFriends;
    leftCol.innerHTML = data.leftColumn;
    rightCol.innerHTML = data.rightColumn;
}

const loadRemovedFriends = (friendData) => {
    if (!wasContentSet) setContent();
    const leftCol = document.getElementById('left-col');
    const rightCol = document.getElementById('right-col');

    const data = friendData.usersRemovedFriends;
    leftCol = data.leftColumn;
    rightCol = data.rightColumn;
}

const loadRecievedReq = (leftCol, rightCol, friendData) => {
    const data = friendData.usersReceivedRequests;
    leftCol = data.leftColumn;
    rightCol = data.rightColumn;
}

const loadRejectedReq = (leftCol, rightCol, friendData) => {
    const data = friendData.usersRejectedRequests;
    leftCol = data.leftColumn;
    rightCol = data.rightColumn;
}

const loadSentReq = (leftCol, rightCol, friendData) => {
    const data = friendData.usersSentRequests;
    leftCol = data.leftColumn;
    rightCol = data.rightColumn;
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Friends</h1>'
}

exports.loadFriends = loadFriends;