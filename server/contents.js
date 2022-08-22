const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const names = require("./names").names;
const namesRaw = require("./names").namesRaw;
const articlesURLNames = [];
names.forEach(name => articlesURLNames.push({name}));

// by-pass the cors error
app.use(cors());

// Calling static files.
app.use(express.static('../src'));

// Create endpoints or route handlers
app.get("/data_results", (req, res) => {

    const getValues = async () => {
        const namePromises = articlesURLNames.map(url =>
            fetch(
                `https://en.wikipedia.org/w/api.php?action=query&titles=${url.name}&prop=extracts&format=json&exintro=1&explaintext=false&origin=*`
            ).then(res => res.json())
        );

        const imgPromises = articlesURLNames.map(url =>
            fetch(
                `https://en.wikipedia.org/w/api.php?pithumbsize=1080&action=query&format=json&titles=${url.name}&prop=pageimages`
            ).then(res => res.json())
        );

        const articleResponse = await Promise.all(namePromises);
        const imgResponse = await Promise.all(imgPromises);

        let articleObjects = [];
        for (let i in articleResponse) {
            // Mapping the keys of the JSON data of query to its values.
            let article =
                Object.keys(articleResponse[i].query.pages).map(key => articleResponse[i].query.pages[key])[0].extract
                    .substring(0, 350) + `...`;
            let img =
                Object.keys(imgResponse[i].query.pages).map(key => imgResponse[i].query.pages[key])[0].thumbnail.source;

            let articleName = namesRaw[i];
            articleObjects.push({
                name: articleName,
                article,
                img
            })
        }

        return articleObjects;
    };

    getValues().then(data => res.send(data));
});

// Listen on a port
app.listen(PORT, () => console.log("Server running."));
