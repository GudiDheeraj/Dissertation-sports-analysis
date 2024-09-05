// Function to clear the chart wrapper content
function clearChartWrapper() {
  const chartWrapper = document.querySelector('.chart-wrapper');
  chartWrapper.innerHTML = '';
}

// Function to create and display images
function displayImages(imageArray) {
  clearChartWrapper();

  const chartWrapper = document.querySelector('.chart-wrapper');
  imageArray.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = `${image}`;
    imgElement.style.maxWidth = '47%';
    imgElement.style.margin = '10px';
    chartWrapper.appendChild(imgElement);
  });
}

// Function to display graphs based on the player type and graph type
function updateDisplay(playerType, graphType) {
  let imagesToDisplay = [];

  if (playerType === 'batsman') {
    if (graphType === '3D Cluster Graphs') {
      imagesToDisplay = ['images/1.png', 'images/2.png'];
    } else if (graphType === 'Rating Distribution') {
      imagesToDisplay = ['images/3.png', 'images/4.png'];
    } else if (graphType === 'Rating of Players') {
      imagesToDisplay = ['images/5.png', 'images/6.png'];
    }
  } else if (playerType === 'bowler') {
    if (graphType === '3D Cluster Graphs') {
      imagesToDisplay = ['images/7.png'];
    } else if (graphType === 'Rating Distribution') {
      imagesToDisplay = ['images/8.png'];
    } else if (graphType === 'Rating of Players') {
      imagesToDisplay = ['images/9.png', 'images/10.png'];
    }
  }

  displayImages(imagesToDisplay);
}

// Function to create input fields dynamically based on player type
function createInputs(playerType) {
  const inputContainer = document.getElementById('input-container');
  inputContainer.innerHTML = ''; // Reset the section

  let inputFields = [];
  
  if (playerType === 'batsman') {
    inputFields = [
      'Runs', 'Boundaries', 'Dismissal', 'Innings',
      'Average', 'Strike Rate', 'Average Runs',
      'Average Balls Faced', 'Average Boundaries',
      'Average Strike Rate'
    ];
  } else if (playerType === 'bowler') {
    inputFields = [
      'Runs Conceded', 'Wickets', 'Extras', 'Balls Bowled',
      'Innings', 'Average', 'Strike Rate', 'Economy Rate'
    ];
  }

  inputFields.forEach((label, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label for="input${index + 1}">${label}:</label>
      <input type="number" id="input${index + 1}" placeholder="Enter ${label}">
    `;
    inputContainer.appendChild(div);
  });
}

// Function to calculate result for batsman based on provided formula
function calculateBatsman() {
  const resultText = document.getElementById('result-text');
  
  const runs = parseFloat(document.getElementById('input1').value) || 0;
  const boundaries = parseFloat(document.getElementById('input2').value) || 0;
  const dismissal = parseFloat(document.getElementById('input3').value) || 0;
  const innings = parseFloat(document.getElementById('input4').value) || 0;
  const average = parseFloat(document.getElementById('input5').value) || 0;
  const strikeRate = parseFloat(document.getElementById('input6').value) || 0;
  const highestscore = parseFloat(document.getElementById('input9').value) || 0;
  const averageRuns = parseFloat(document.getElementById('input7').value) || 0;
  const averageBallsFaced = parseFloat(document.getElementById('input8').value) || 0;
  const averageStrikeRate = parseFloat(document.getElementById('input10').value) || 0;

  // Calculate the result based on the provided formula
  const result = 0.23 * runs
                + 0.13 * boundaries
                + 0.02 * (1 / (dismissal || 1))  // Avoid division by zero
                + 0.03 * innings
                + 0.1 * average
                + 0.073 * strikeRate
                + 0.07 * averageRuns
                + 0.05 * averageBallsFaced
                + 0.12 * highestscore
                + 0.063 * averageStrikeRate;

  // Round the result to the next integer
  const roundedResult = Math.ceil(result);

  // Display the result with accuracy information
  resultText.textContent = `The result is: ${roundedResult} (Accuracy: 0.8382
Precision: 0.8472
Recall: 0.8382
F-measure (F1 Score): 0.8361
)`;
  resultText.style.color = "orange";

}

// Function to calculate result for bowler based on provided formula
function calculateBowler() {
  const resultText = document.getElementById('result-text');
  
  const runsConceded = parseFloat(document.getElementById('input1').value) || 0;
  const wickets = parseFloat(document.getElementById('input2').value) || 0;
  const extras = parseFloat(document.getElementById('input3').value) || 0;
  const ballsBowled = parseFloat(document.getElementById('input4').value) || 0;
  const innings = parseFloat(document.getElementById('input5').value) || 0;
  const average = parseFloat(document.getElementById('input6').value) || 0;
  const strikeRate = parseFloat(document.getElementById('input7').value) || 0;
  const economyRate = parseFloat(document.getElementById('input8').value) || 0;

  // Calculate the result based on the provided formula
  const result = 0.061 * (1 / (runsConceded || 1))  // Avoid division by zero
                + 0.045 * wickets
                - 0.078 * extras
                + 0.113 * ballsBowled
                + 0.02 * innings
                - 0.024 * average
                - 0.024 * strikeRate
                - 0.61 * economyRate;

  // Round the result to the next integer
  const roundedResult = Math.ceil(result);

  // Display the result with accuracy information
  resultText.textContent = `The result is: ${roundedResult} (Accuracy: 0.9739
Precision: 0.9750
Recall: 0.9739
F-measure (F1 Score): 0.9736)`;
  resultText.style.color = "orange";

}

// Function to handle button activation
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  activeButton.classList.add('active');
}

// Event listeners for graph buttons
document.getElementById('add-bar-graph').addEventListener('click', function() {
  const playerType = document.getElementById('player-type').value;
  updateDisplay(playerType, '3D Cluster Graphs');
  setActiveButton(this);
});

document.getElementById('add-histograph').addEventListener('click', function() {
  const playerType = document.getElementById('player-type').value;
  updateDisplay(playerType, 'Rating Distribution');
  setActiveButton(this);
});

document.getElementById('add-circle-graph').addEventListener('click', function() {
  const playerType = document.getElementById('player-type').value;
  updateDisplay(playerType, 'Rating of Players');
  setActiveButton(this);
});

// Event listener for player type dropdown
document.getElementById('player-type').addEventListener('change', function() {
  const selectedPlayerType = this.value;
  createInputs(selectedPlayerType);

  const activeButton = document.querySelector('.buttons button.active');
  if (activeButton) {
    updateDisplay(selectedPlayerType, activeButton.textContent);
  }
});

// Event listener for the calculate button
document.getElementById('calculate-btn').addEventListener('click', function() {
  const selectedPlayerType = document.getElementById('player-type').value;
  if (selectedPlayerType === 'batsman') {
    calculateBatsman();
  } else if (selectedPlayerType === 'bowler') {
    calculateBowler();
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const zoomSlider = document.getElementById('zoom-slider');
  const zoomPercentage = document.getElementById('zoom-percentage');
  const resetZoom = document.getElementById('reset-zoom');
  const chartWrapper = document.querySelector('.chart-wrapper');

  // Function to apply zoom
  function applyZoom(scale) {
    chartWrapper.style.transform = `scale(${scale / 100})`;
    zoomPercentage.textContent = `${scale}%`;
  }

  // Handle slider change
  zoomSlider.addEventListener('input', function() {
    applyZoom(this.value);
  });

  // Handle reset button click
  resetZoom.addEventListener('click', function() {
    zoomSlider.value = 100;
    applyZoom(100);
  });
});

// Initialize the page with batsman inputs and the first graph
document.addEventListener('DOMContentLoaded', function() {
  createInputs('batsman');
  updateDisplay('batsman', '3D Cluster Graphs');
});
