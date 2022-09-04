const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");
const threadSectionDOM = document.querySelector(".thread-section");
let inputText = "";
let contentText = "";

const getAllThreads = async() => {
    try {
        let allThreads = await axios.get("/api/v1/threads");
        const { data } = allThreads;

        allThreads = data.map((thread) => {
            const { title, content } = thread;
            return `
            <div class="single-thread">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
            `
        }).join("");

        threadSectionDOM.innerHTML = allThreads;

    } catch(err) {
        console.log(err);
    }
}

getAllThreads();

inputTextDOM.addEventListener("change", (e) => {
    inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
    contentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!inputText || !inputContent) {
        console.log("error");
    }
    console.log("add data");
    try {
        await axios.post("/api/v1/thread", {
            title: inputText,
            content: contentText,
        });
        getAllThreads();
    } catch (err) {
        console.log(err);
    }

    inputText = "";
    contentText = "";
    inputTextDOM.value = "";
    inputContentDOM.value = "";
});