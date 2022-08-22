const contentHTML = async () => {
    const articleJSON = await fetch(`/data_results`)
        .then(res => res.json());

    let articleImg = [];
    let articleHTML = "";
    articleJSON.forEach(article => {
        articleImg.push(article.img);
        let href = ` https://en.wikipedia.org/wiki/${article.name.replace(/\s/g, "_")}`
        let html = `
            <div class="content">
                <div class="main-content">
                    <h2>
                        ${article.name}
                    </h2>
                    <p>
                        ${article.article}
                    </p>
                </div>
                <div class="more-section">
                    <a href= ${href}
                       target="_blank" rel="noopener noreferrer"
                    >📖 Read More</a>
                </div>
            </div>
                `

        articleHTML += html;
    })

    return [articleHTML, articleImg];
}

contentHTML().then(data => {
    const contentDiv = $("#the-content");
    contentDiv.append(data[0]);

    const contents = $(".content");
    // const timeStamps = $(".time-stamp");
    const background = $(".content-background");
    const backgroundImg = data[1];
    const prevBtn = $(".prev");
    const nextBtn = $(".next");

    let contentNum = 0;
    contents[contentNum].classList.add("content-active");
    background.css("background-image", `url(${backgroundImg[contentNum]})`);

    prevBtn.on("click", () => {
        contentNum--;
        if (contentNum < 0) {
            contentNum = 0;
            return;
        }
        updateContent();
    });

    nextBtn.on("click", () => {
        contentNum++;
        if (contentNum >= contents.length) {
            contentNum = contents.length - 1;
            return;
        }
        updateContent();
    })

    function updateContent() {
        let content = contents[contentNum];
        // let timeStamp = timeStamps[contentNum];
        contents.removeClass("content-active");
        // timeStamps.removeClass("time-stamp-active");
        content.classList.add("content-active");
        // timeStamp.classList.add("time-stamp-active");
        background.css("background-image", `url(${backgroundImg[contentNum]})`);
    }
})

