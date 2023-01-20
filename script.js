function checkLinks() {
    // Get the URL from the input field
    var url = document.querySelector("#url").value;

    // Use fetch to make a request to the URL
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Parse the HTML and find all the links
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, "text/html");
            var links = htmlDoc.getElementsByTagName("a");

            // Iterate through the links and check for broken links
            var brokenLinks = [];
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var linkUrl = link.href;

                // Use fetch to check the status code of the link
                fetch(linkUrl)
                    .then(response => {
                        if (!response.ok) {
                            brokenLinks.push(linkUrl);
                        }
                    })
                    .catch(error => {
                        brokenLinks.push(linkUrl);
                    });
            }

            // Display the results
            var resultsDiv = document.querySelector("#results");
            resultsDiv.innerHTML = "";
            if (brokenLinks.length > 0) {
                var message = "Found " + brokenLinks.length + " broken links:<br>";
                for (var i = 0; i < brokenLinks.length; i++) {
                    message += brokenLinks[i] + "<br>";
                }
                resultsDiv.innerHTML = message;
            } else {
                resultsDiv.innerHTML = "No broken links found.";
            }
        })
        .catch(error => {
            console.log(error);
        });
}