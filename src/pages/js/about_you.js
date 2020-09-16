const fs = require('fs');
const path = require('path');

const status = {
    UNKNOWN: 1,
    LOADING: 2,
    SUCCESS: 0,
    ERROR: -1,
}

class AboutYou {
    AboutYou(
        friend_group = null,
        messenger = null,
        notifs = null,
        prefs = null,
        viewed = null,
        visited = null,
        addr_book = null
    ) {
        this.friend_group = friend_group;
        this.messenger = messenger;
        this.notifs = notifs;
        this.prefs = prefs;
        this.viewed = viewed;
        this.visited = visited;
        this.addr_book = addr_book;
    }

    getFriendGroup() {
        if (this.friend_group === null) {
            console.error("Friend Group was not read!")
            return status.ERROR, ""
        } else {
            try {
                return status.SUCCESS, this.friend_group["friend_peer_group"];
            } catch (e) {
                console.error(e);
                return status.ERROR;
            }
        }
    }
}

function loadData() {
    console.log(__dirname);

    let loaded = false;
    let dataFriendGroup = path.resolve(__dirname + '../../../data/about_you/friend_peer_group.json');
    let rawDataFriendGroup = fs.readFileSync(dataFriendGroup);
    let friendGroup = JSON.parse(rawDataFriendGroup);
    console.log(friendGroup);

    aboutYou = new AboutYou(
        friend_group = friendGroup
    );
    loaded = true;

    if (loaded) {
        showPage();
    }
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
}