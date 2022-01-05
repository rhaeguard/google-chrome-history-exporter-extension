const MICROSECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function getDownloadBtn() {
    return document.getElementById("download-btn");
}

function onClickDownload() {
    getDownloadBtn().innerText = "Preparing...";
    const startTime = new Date().getTime() - MICROSECONDS_PER_DAY * 365 * 2;
    chrome.history.search(
        {
            text: "",
            startTime: startTime,
            maxResults: 1000000000,
        },
        (results) => {
            triggerDownload(
                JSON.stringify(
                    results.map(({ title, url }) => {
                        return { title, url };
                    })
                )
            );
            getDownloadBtn().innerText = "Download as JSON";
        }
    );
}

function triggerDownload(content) {
    let link = document.createElement("a");
    link.download = "google_chrome_history.json";
    link.href = URL.createObjectURL(
        new Blob([content], { type: "octet/stream" })
    );

    link.click();

    URL.revokeObjectURL(link.href);
}

document.addEventListener("DOMContentLoaded", function () {
    getDownloadBtn().addEventListener("click", onClickDownload);
});
