document.addEventListener("DOMContentLoaded", function () {
  const statusContainer = document.getElementById("status-container");

  const tubeApiUrl = `https://api.tfl.gov.uk/line/mode/tube/status`; // Defines the api for the tube lines
  const elizabethLineApiUrl = 'https://api.tfl.gov.uk/line/elizabeth/status'; //Defines the api for the Elizabeth line
  const nationalRailApiUrl = 'https://api.tfl.gov.uk/line/mode/overground/status'; //Defines the api for the London Overground line (using the old name to avoid having to re write with the correct name 🙃)

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
  }
    // Function to display tube status and set the colour of the text to match the colour of the lines
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
        };

      //puts all the data from the api call together 
      
const tubeLines = tubeData.map((line) => {
  const lineColor = lineColors[line.name] || "#000000";
  const statusSeverity = line.lineStatuses[0].statusSeverity;
  const statusColor = getStatusColor(statusSeverity);

  return `<div class="line" style="color: ${lineColor};">
            <strong>${line.name}</strong>
            <span class="status" style="color: ${statusColor};">${line.lineStatuses[0].statusSeverityDescription}</span>
          </div>`;
});


    const elizabethLine = elizabethLineData.map((line) => {
      const lineColor = lineColors[line.name] || "#000000";
      const statusSeverity = line.lineStatuses[0].statusSeverity;
      const statusColor = getStatusColor(statusSeverity);
   
      return `<div class="line" style="color: ${lineColor};">
                <strong>${line.name}</strong>
                <span class="status" style="color: ${statusColor};">${line.lineStatuses[0].statusSeverityDescription}</span>
                </div>`;
    });

    const londonOvergroundLine = nationalRailData.filter((line) => line.name === "London Overground")
      .map((line) => {
        const lineColor = lineColors[line.name] || "#000000";
        const statusSeverity = line.lineStatuses[0].statusSeverity;
        const statusColor = getStatusColor(statusSeverity);
        
        return `<div class="line" style="color: ${lineColor};">
                  <strong>${line.name}</strong>
                  <span class="status" style="color: ${statusColor};">${line.lineStatuses[0].statusSeverityDescription}</span>
                  </div>`;
      });

    statusContainer.innerHTML = `<div class="table-container">${tubeLines.concat(elizabethLine, londonOvergroundLine).join("")}</div>`; //joins the data together 
  }

  // Function to determine the color based on status severity
  function getStatusColor(severity) {
    switch (severity) {
      case 10: // Good Service
        return "#00AA00"; // Green
      case 9: // Minor Delays
        return "#FFA500"; // Orange
      case 8: // Severe Delays
        return "#FF0000"; // Red
      default:
        return "#FF0000"; // All else goes to red
    }
  }
});
