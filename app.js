document.addEventListener("DOMContentLoaded", function() {
  const statusContainer = document.getElementById("status-container");

  // Replace YOUR_APP_ID and YOUR_APP_KEY with your actual TfL API credentials

  const apiUrl = `https://api.tfl.gov.uk/line/mode/tube/status`;

  // Fetch tube status data from TfL API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTubeStatus(data))
    .catch(error => console.error("Error fetching data:", error));

  // Function to display tube status
  function displayTubeStatus(data) {
    const tubeLines = data.map(line => {
      return `<div class="line">
                <strong>${line.name}</strong>: ${line.lineStatuses[0].statusSeverityDescription}
              </div>`;
    });

    statusContainer.innerHTML = tubeLines.join("");
  }
});
