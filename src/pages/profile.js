const ipcRenderer = require('electron').ipcRenderer;
const path = require('path');
const cC = require('../utils/camelCase')
const randColor = require('../utils/getRandomW3Color')

class Profile {
    constructor(config, info, updateHistory, hobbies) {
        this.config = config;
        this.info = info;
        this.updateHistory = updateHistory;
        this.hobbies = hobbies;
    }

    get userInfo() {
        return this.info.profile;
    }

    get userUpdates() {
        return this.updateHistory.profile_updates;
    }

    get userHobbies() {
        return this.hobbies.profile_hobbies;
    }

    /**
     * Get the full (non relative) path for the profile picture
     * 
     * Will return the logo if no picture is found
     */
    get fullProfileImagePath() {
        this.__imagePath = this.findProfilePictureURI();
        if (this.__imagePath == null) {
            return path.join(__dirname, '../', "res/icon.svg");
        }
        return path.join(this.config.dataPath, this.__imagePath);
    }

    get userEmail() {
        try {
            return this.userInfo.emails.emails[0];
        } catch (_) {
            try {
                return this.userInfo.emails.previous_emails[0];
            } catch (e) {
                return "You don't have an email associtated with this account"
            }
        }
    }

    get userBirthdate() {
        return `${this.userInfo.birthday.day} / ${this.userInfo.birthday.month} / ${this.userInfo.birthday.year}`;
    }

    /**
     * Parse the profileHistory and search for a profile picture update
     * 
     * If a profilePictureURI is present in the config, it will use that as the profile picture
     * 
     * @returns {URI} if a picture was found
     * @returns {null} if no picture was found.
     */
    findProfilePictureURI() {
        this.foundURI = null;
        try {
            this.foundURI = this.config.profilePictureURI;
            return this.foundURI;
        } catch (e) {
            console.log("No profile picture found URI in config, searching...")
        }
        this.userUpdates.forEach((update) => {
            if (update.title != undefined &&
                update.title.toLowerCase().substr(update.title.length - 16, 15) == "profile picture" &&
                this.foundURI == null) {
                this.foundURI = update.attachments[0].data[0].media.uri;
                console.log(`Found Profile Picture, URI:${this.foundURI}`);
                // Save the config with the URI, so we don't have to search for it every time
                this.config.profilePictureURI = this.foundURI;
                ipcRenderer.send("saveConfig", {
                    config: this.config
                });
                return;
            }
        });
        return this.foundURI;
    }
}

const loadYourProfile = (config) => {
    changeTitle();
    const page = document.getElementById('mainPage');
    page.innerHTML = `
    <div class="w3-content w3-margin-top" style="min-width:1000px;">
        <div id="profileGrid" class="w3-row-padding"></div>
    </div>
    `;
    const profileGrid = document.getElementById("profileGrid");

    const userProfile = new Profile(
        config,
        require(path.join(config.dataPath, 'profile_information', 'profile_information.json')),
        require(path.join(config.dataPath, 'profile_information', 'profile_update_history.json')),
        require(path.join(config.dataPath, 'profile_information', 'your_hobbies.json'))
    );

    profileGrid.innerHTML += generateLeftCollumn(userProfile);
    profileGrid.innerHTML += generateRightCollumn(userProfile);
}

const generateFamilyInfo = (userProfile) => {
    const familyMembers = userProfile.userInfo.family_members;
    let generatedHTML = "";

    familyMembers.forEach((member) => {
        generatedHTML += `<p><i class="material-icons w3-margin-right ${randColor.getColor(true)}">person_outline</i>${member.relation} - ${member.name}</p>`;
    });

    return generatedHTML;
}

const generateLeftCollumn = (userProfile) => {
    return `
    <!-- Left column -->
    <div class="w3-third">
        <div class="w3-card-4 w3-white w3-opacity-min">
            <div class="w3-display-container">
                <div class="avatar">
                    <img class="avatar" src="${userProfile.fullProfileImagePath}" alt="Avatar">
                </div>
                <div class="avatar-separator"></div>
                <div class="w3-display-bottomleft w3-container w3-text-black" style="min-width=100px">
                    <h2 class="name">${userProfile.userInfo.name.full_name}</h2>
                </div>
            </div>
            <div class="w3-container">
                <!-- User Info -->
                <p><i class="material-icons w3-margin-right w3-text-blue">location_city</i>${userProfile.userInfo.current_city.name}</p>
                <p><i class="material-icons w3-margin-right w3-text-blue">email</i>${userProfile.userEmail}</p>
                <p><i class="material-icons w3-margin-right w3-text-blue">date_range</i>${userProfile.userBirthdate}</p>
                <p><i class="material-icons w3-margin-right w3-text-blue">people</i>${userProfile.userInfo.relationship.status}</p>
                <p><i class="material-icons w3-margin-right w3-text-blue">person_pin</i>${cC.toCamelCase(userProfile.userInfo.gender.gender_option)}</p>
                <hr>
                <!-- User family -->
                ${generateFamilyInfo(userProfile)}
            </div>
        </div><br>
    </div>
    `;
}

const generateRightCollumn = (userProfile) => {
    return `
    <!-- Right column -->
    <div class="w3-twothird">
        <div class="w3-container w3-card w3-white w3-opacity-min">
            <h2 class="w3-text-green w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-green"></i>Education</h2>
            <div class="w3-container">
                <h5><b>Nicolae Balcescu Lyceum, <small>Cluj-Napoca</small></b></h5>
                <h6 class="w3-text-green"><i class="fa fa-calendar fa-fw w3-margin-right"></i>...2015 - 2019</h6>
                <ul>
                    <li>Awards:
                        <br>
                        <p2 class="job-desc">&nbsp&nbsp&nbsp&nbsp• 2x AstroPi Participant, once Finalists</p2>
                        <br>
                        <p2 class="job-desc">&nbsp&nbsp&nbsp&nbsp• 1st Place Kids Hack Day</p2>
                    </li>
                </ul>
                <hr>
            </div>
        </div>
    </div>
    `;
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>Your profile</h1>'
}

exports.loadYourProfile = loadYourProfile;