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
    let xData = Array.from({ length: positionData.length }, (_, i) => i);

    let trace1 = {
        x: xData,
        y: positionData,
        mode: 'lines',
        name: 'Position'
    };

    let trace2 = {
        x: xData,
        y: derivatives.velocity,
        mode: 'lines',
        name: 'Velocity'
    };

    let trace3 = {
        x: xData,
        y: derivatives.acceleration,
        mode: 'lines',
        name: 'acceleration'
    };

    let trace4 = {
        x: xData,
        y: derivatives.jerk,
        mode: 'lines',
        name: 'jerk'
    };
    let trace5 = {
        x: xData,
        y: derivatives.jounce,
        mode: 'lines',
        name: 'jounce'
    };


    // Other traces for acceleration, jerk, snap, crackle, pop...

    let layout = {
        title: 'Derivatives of Motion',
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Value'
        }
    };

    Plotly.newPlot('chart', [trace1, trace2, trace3, trace4, trace5], layout);
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
    let xData = Array.from({ length: positionData.length }, (_, i) => i);

    let update = {
        x: [xData, xData /*, other arrays for each trace... */],
        y: [positionData, derivatives.velocity /*, other arrays for each trace... */]
    };

    Plotly.update('chart', update);
}

createChart(generateRandomData());
// Run the function every 10 seconds
setInterval(updateChart, 1 * 1000);
