document.addEventListener("DOMContentLoaded", function() {
  const statusContainer = document.getElementById("status-container");


  const tubeApiUrl = `https://api.tfl.gov.uk/line/mode/tube/status`;
  const elizabethLineApiUrl = 'https://api.tfl.gov.uk/line/elizabeth/status';
  const nationalRailApiUrl = 'https://api.tfl.gov.uk/line/mode/national-rail/status';

 // Fetch tube status data from TfL API
  const fetchTubeData = fetch(tubeApiUrl).then((response) => response.json());
  const fetchElizabethLineData = fetch(elizabethLineApiUrl).then((response) => response.json());
  const fetchNationalRailData = fetch(nationalRailApiUrl).then((response) => response.json());
  
  // Use Promise.all to wait for both API requests to complete
Promise.all([fetchTubeData, fetchElizabethLineData, fetchNationalRailData])
    .then(([tubeData, elizabethLineData, nationalRailData]) => displayTubeStatus(tubeData, elizabethLineData, nationalRailData))
    .catch((error) => console.error("Error fetching data:", error));

   // Function to display tube, Elizabeth line, and National Rail Service status
  function displayTubeStatus(tubeData, elizabethLineData, nationalRailData) {
    console.log("Tube Data:", tubeData);
    console.log("Elizabeth Line Data:", elizabethLineData);
    console.log("National Rail Data:", nationalRailData);
  
  // Function to display tube status
  function displayTubeStatus(tubeData, elizabethLineData, nationalRailData) {
    const lineColors = {
      Bakerloo: "#996633",
      Central: "#CC3333",
      Circle: "#E1A700",
      District: "#006633",
      Jubilee: "#868F98",
      Metropolitan: "#660066",
      Northern: "#000000",
      Piccadilly: "#0019a8",
      Victoria: "#0099CC",
      "Waterloo & City": "#7EC8E3", 
      "Hammersmith & City": "#F68C95", 
      "London Overground": "#EE7C0E",
      "Elizabeth line": "#9E579D"
      // Add more lines and colors as needed
    };

   
 const tubeLines = tubeData.map((line) => {
      const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
      return `<div class="line" style="color: ${lineColor};">
                <strong>${line.name}</strong><span class="status">${line.lineStatuses[0].statusSeverityDescription}</span>
              </div>`;
    });

    const elizabethLine = elizabethLineData.map((line) => {
      const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
      return `<div class="line" style="color: ${lineColor};">
                <strong>${line.name}</strong><span class="status">${line.lineStatuses[0].statusSeverityDescription}</span>
              </div>`;
    });

    const londonOvergroundLine = nationalRailData.filter((line) => line.name === "London Overground")
      .map((line) => {
        const lineColor = lineColors[line.name] || "#000000"; // Default to black if color is not specified
        return `<div class="line" style="color: ${lineColor};">
                  <strong>${line.name}</strong><span class="status">${line.lineStatuses[0].statusSeverityDescription}</span>
                </div>`;
      });

    statusContainer.innerHTML = `<div class="table-container">${tubeLines.concat(elizabethLine, londonOvergroundLine).join("")}</div>`;
  }
});
