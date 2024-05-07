function analyzeComments() {
    var youtubeLink = document.getElementById("youtubeLink").value;
    var videoId = extractVideoId(youtubeLink);
    
    fetch(`/comments?videoId=${videoId}`)
        .then(response => response.json())
        .then(comments => displayComments(comments))
        .catch(error => console.error('Error:', error));
}

function extractVideoId(link) {
    var videoId = link.split("v=")[1];
    var ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

function displayComments(comments) {
    var positiveComments = [];
    var negativeComments = [];

    comments.forEach(function(comment) {
        if (analyzeSentiment(comment) === 'positive') {
            positiveComments.push(comment);
        } else {
            negativeComments.push(comment);
        }
    });

    var positiveCommentsHtml = positiveComments.map(comment => `<span class="positive">${comment}</span>`).join("<br>");
    var negativeCommentsHtml = negativeComments.map(comment => `<span class="negative">${comment}</span>`).join("<br>");

    var positiveCommentsContainer = document.getElementById("positiveComments");
    var negativeCommentsContainer = document.getElementById("negativeComments");

    positiveCommentsContainer.innerHTML = `<h2 style="background-color: green;">Positive Comments</h2>` + positiveCommentsHtml;
    negativeCommentsContainer.innerHTML = `<h2 style="background-color: red;">Negative Comments</h2>` + negativeCommentsHtml;

    positiveCommentsContainer.classList.remove("hidden");
    negativeCommentsContainer.classList.remove("hidden");
}

function analyzeSentiment(comment) {
    return Math.random() < 0.5 ? 'positive' : 'negative';
}
