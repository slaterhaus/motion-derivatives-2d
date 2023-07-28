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

    let ctx = document.getElementById('myChart').getContext('2d');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: positionData.slice(1), // Use the positions as labels, ignoring the first position because we don't have velocity for it
            datasets: [{
                label: 'Velocity',
                data: derivatives.velocity,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true
            }, {
                label: 'Acceleration',
                data: derivatives.acceleration,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }, {
                label: 'Jerk',
                data: derivatives.jerk,
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false
            }, {
                label: 'Jounce',
                data: derivatives.jounce,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
            },
            animations: {
                tension: {
                    duration: 100,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Position'
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Derivatives'
                    }
                }
            },
        }
    });
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

    // Update the data in the chart
    myChart.data.labels = positionData;
    // myChart.data.datasets[0].data = positionData;
    myChart.data.datasets[0].data = derivatives.velocity;
    myChart.data.datasets[1].data = derivatives.acceleration;
    myChart.data.datasets[2].data = derivatives.jerk;
    myChart.data.datasets[3].data = derivatives.jounce;

    // Animate the transition to the new data
    myChart.update();
}

createChart(generateRandomData());
// Run the function every 10 seconds
setInterval(updateChart, 1 * 1000);
