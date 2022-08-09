const postButton = document.getElementById("post");
const postDialog = document.getElementById("postDialog");
const closeButton = document.getElementById("close");
const output = document.querySelector("output");
const textBox = document.querySelector('[role="textbox"]');
const button = document.querySelector("form > button");

postButton.addEventListener("click", () => {
    if (typeof postDialog.showModal === "function") {
        postDialog.showModal();
    } else {
        output.value =
            "Sorry, the <dialog> API is not supported by this browser.";
    }
});

closeButton.addEventListener("click", () => {
    postDialog.close();
    textBox.innerText = "";
});
let posts = [];
function changeButton(isDisabled, color, bgColor) {
    button.disabled = isDisabled;
    button.style.color = color;
    button.style.backgroundColor = bgColor;
}
textBox.addEventListener("input", ({ target: { innerText } }) => {
    if (Boolean(innerText.length)) {
        changeButton(false, "white", "#0a65c2");
    } else {
        changeButton(true, "gray", "#e1e1e1");
    }
});

button.addEventListener("click", (e) => {
    e.preventDefault();
    let items = JSON.parse(localStorage.getItem("posts"));
    if (items === null) {
        posts = [];
    } else {
        posts = items;
    }
    posts.push(textBox.innerText);
    localStorage.setItem(`posts`, JSON.stringify(posts));
    textBox.innerText = "";
    postDialog.close();
    showPosts();
});

function showPosts() {
    let Output = "";
    let items = JSON.parse(localStorage.getItem("posts"));
    if (items === null) {
        posts = [];
    } else {
        posts = items.reverse();
    }
    posts.forEach((post, index) => {
        Output += `
                  <article>
    <header>
        <img src="https://media-exp1.licdn.com/dms/image/C5603AQHuHiUjgvOegA/profile-displayphoto-shrink_100_100/0/1594467788626?e=1665619200&v=beta&t=YDwrYflhamAsaGi66UAwbyu_TbAz1ddw-gpLX9ln2vQ" />
        <div>
            <b>Rajan Magar</b>
            <small>UI Engineer @Flipkart</small>
            <button id="view">${Math.floor(Math.random() * 10)}d • 🌍</button>
        </div>
    </header>
    <main>
        <p>${post.replace(/<[]>/g, "")}</p>
        <span>👌 ${Math.floor(Math.random() * 100)}</span>
        <span>${Math.floor(Math.random() * 10)} comments</span>
    </main>
</article>
                  `;
    });
    document.querySelector("section").insertAdjacentHTML("afterend", Output);
}

document.addEventListener("DOMContentLoaded", () => {
    showPosts();
});
