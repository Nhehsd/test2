document.addEventListener("DOMContentLoaded", function() {
  const statusContainer = document.getElementById("status-container");


  const apiUrl = `https://api.tfl.gov.uk/line/mode/tube/status`;

  // Fetch tube status data from TfL API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayTubeStatus(data))
    .catch(error => console.error("Error fetching data:", error));

  // Function to display tube status
  function displayTubeStatus(data) {
    const lineColors = {
      Bakerloo: "#996633",
      Central: "#CC3333",
      Circle: "#FFCC00",
      District: "#006633",
      Hammersmith: "#CC9999",
      Jubilee: "#868F98",
      Metropolitan: "#660066",
      Northern: "#000000",
      Piccadilly: "#0019a8",
      Victoria: "#0099CC",
      Waterloo: "#66CCCC"
      // Add more lines and colors as needed
    };

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
