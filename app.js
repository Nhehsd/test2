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
      Waterloo: "#66CCCC",
      Elizabeth: "#9E579D"
      // Add more lines and colors as needed
    };

  // Function to display tube status
const tubeLines = data.map((line) => {
    const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
    const statusSeverityDescription = line.lineStatuses[0].statusSeverityDescription;
    const statusDetails = line.lineStatuses[0].statusDetails;

    let extraDetailsHTML = '';

    if (statusDetails && statusDetails.length > 0) {
      extraDetailsHTML = `<br><span class="details">${statusDetails[0].details}</span>`;
    }

    return `<div class="line" style="color: ${lineColor};">
              <strong>${line.name}</strong>: ${statusSeverityDescription}
              ${extraDetailsHTML}
            </div>`;
    });

    statusContainer.innerHTML = tubeLines.join("");
  }
});
