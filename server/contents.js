const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios').default;
const PORT = process.env.PORT || 400;

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
            axios.get(
                `https://en.wikipedia.org/w/api.php?action=query&titles=${url.name}&prop=extracts&format=json&exintro=1&explaintext=false&origin=*`
            )
        );
        
        const imgPromises = articlesURLNames.map(url =>
            axios.get(
                `https://en.wikipedia.org/w/api.php?pithumbsize=1080&action=query&format=json&titles=${url.name}&prop=pageimages`
            )
        );
        
        const articleResponse = await Promise.all(namePromises);
        const imgResponse = await Promise.all(imgPromises);
        
        let articleObjects = [];
        for (let i in articleResponse) {
            // Mapping the keys of the JSON data of query to its values.
            let article =
                Object.keys(articleResponse[i].data.query.pages).map(key => articleResponse[i].data.query.pages[key])[0].extract
            
            let img =
                Object.keys(imgResponse[i].data.query.pages).map(key => imgResponse[i].data.query.pages[key])[0].thumbnail;
            
            article = (!article) ? "No article found." : article.substring(0, 350) + `...`;
            
            img = (!img) ? `../src/Images/indian-temple.webp` : img.source;
            
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
