

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

//our local host port...
const port = process.env.PORT || 3000;


app.use(express.json());

//here the forntend is connected to the baackend...
app.use(express.static(path.join(__dirname, '..', 'frontend')));


app.get('/comments', async (req, res) => {
    try {
        const videoId = req.query.videoId;
        if (!videoId) {
            return res.status(400).json({ error: 'Video ID is required' });
        }
        const comments = await fetchComments(videoId);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


async function fetchComments(videoId) {
    //our youtube api key...
    const apiKey = 'AIzaSyBxfePSfCi_AftH_8sNoGnd-aRrKLgg2LU'; 


    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&videoId=${videoId}&part=snippet&maxResults=20`;

    const response = await axios.get(apiUrl);
    const comments = response.data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
    
    return comments;
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
