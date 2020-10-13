const loadAbout = (config) => {
    changeTitle();

    const content = /*html*/ `
    <h2 style="color: #4267B2; font-weight: bold;">What even is this?</h2>
    <p style="font-size: 18px">
        &nbsp&nbspFacebook Data Visualizer is a small project I made mostly to learn how to use ElectronJS,
        and actually JavaScript in general, since this is my 'biggest' JS project yet.
        <br>
        &nbsp&nbspYou can use this small tool to better visualize (as per the name) the data Facebook collected
        from you.
    </p>
    <h2 style="color: #4267B2; font-weight: bold;">How do I use this?</h2>
    <p style="font-size: 18px">
        &nbsp&nbspTODO: Complete help
    </p>
    <h2 style="color: #4267B2; font-weight: bold;">Disclaimer</h2>
    <p style="font-size: 18px">
        &nbsp&nbspThis small piece of software is in no way associatted with Facebook Inc. nor is endorsed by them,
        like I said before I made it as a learning exercise
        <br>
        &nbsp&nbspContact: <i>davidpescariu12@gmail.com</i> 
    </p>
    `

    const page = document.getElementById('mainPage');
    page.innerHTML = content;
}

const changeTitle = () => {
    const title = document.getElementById('title');
    title.innerHTML = '<h1>About Facebook Data Visualizer</h1>'
}

exports.loadAbout = loadAbout;