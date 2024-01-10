document.addEventListener("DOMContentLoaded", function() {
  const statusContainer = document.getElementById("status-container");


  const tubeApiUrl = `https://api.tfl.gov.uk/line/mode/tube/status`;
  const elizabethLineApiUrl = 'https://api.tfl.gov.uk/line/elizabeth/status';

 // Fetch tube status data from TfL API
  const fetchTubeData = fetch(tubeApiUrl).then((response) => response.json());
  const fetchElizabethLineData = fetch(elizabethLineApiUrl).then((response) => response.json());

  // Use Promise.all to wait for both API requests to complete
  Promise.all([fetchTubeData, fetchElizabethLineData])
    .then(([tubeData, elizabethLineData]) => displayTubeStatus(tubeData, elizabethLineData))
    .catch((error) => console.error("Error fetching data:", error));

  // Function to display tube status
  function displayTubeStatus(tubeData, elizabethLineData) {
    const lineColors = {
      Bakerloo: "#996633",
      Central: "#CC3333",
      Circle: "#E1A700",
      District: "#006633",
      Hammersmith: "#CC9999",
      Jubilee: "#868F98",
      Metropolitan: "#660066",
      Northern: "#000000",
      Piccadilly: "#0019a8",
      Victoria: "#0099CC",
      Waterloo: "#66CCCC",
      Elizabeth: "#9E579D" // Elizabeth line color
      // Add more lines and colors as needed
    };

   
    const tubeLines = tubeData.map((line) => {
      const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
      return `<div class="line" style="color: ${lineColor};">
                <strong>${line.name}</strong>: ${line.lineStatuses[0].statusSeverityDescription}
              </div>`;
    });

    const elizabethLine = elizabethLineData.map((line) => {
      const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
      return `<div class="line" style="color: ${lineColor};">
                <strong>${line.name}</strong>: ${line.lineStatuses[0].statusSeverityDescription}
              </div>`;
    });

    statusContainer.innerHTML = tubeLines.concat(elizabethLine).join("");
  }
});
