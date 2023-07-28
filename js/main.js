let myChart;

function calculateDerivatives(positionData, timeStep) {
    // Function to calculate the difference between two points
    const diff = (a, b) => b - a;

    // Function to calculate derivative
    const derivative = (data) => {
        let derivatives = [];
        for (let i = 1; i < data.length; i++) {
            derivatives.push(diff(data[i - 1], data[i]) / timeStep);
        }
        return derivatives;
    };

    // Calculate derivatives
    let velocity = derivative(positionData);
    let acceleration = derivative(velocity);
    let jerk = derivative(acceleration);
    let jounce = derivative(jerk);

    return {velocity, acceleration, jerk, jounce};
}

function createChart(positionData) {
    let derivatives = calculateDerivatives(positionData, 1);

    let trace = {
        x: positionData,
        y: derivatives.velocity,
        z: derivatives.acceleration,
        mode: 'markers',
        type: 'scatter3d',
        marker: {
            size: 3
        },
        name: 'Motion'
    };

    let layout = {
        title: '3D Scatter Plot of Motion Derivatives',
        autosize: true,
        scene: {
            xaxis: {title: 'Position'},
            yaxis: {title: 'Velocity'},
            zaxis: {title: 'Acceleration'},
        },
    };

    Plotly.newPlot('myDiv', [trace], layout);
}

function generateRandomData() {
    // Generate a random array length between 10 and 30
    let length = 25;//Math.floor(Math.random() * 21) + 10;

    // Create an array of the specified length with random numbers between 1 and 1000
    return Array.from({length: length}, () => Math.floor(Math.random() * 100) + 1);
}

function updateChart() {
    let positionData = generateRandomData();
    let derivatives = calculateDerivatives(positionData, 1);

    let update = {
        x: [positionData],
        y: [derivatives.velocity],
        z: [derivatives.acceleration]
    };

    Plotly.update('myDiv', update);
}


createChart(generateRandomData());
// Run the function every 10 seconds
setInterval(updateChart, 1 * 1000);
