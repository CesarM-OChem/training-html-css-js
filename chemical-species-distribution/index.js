const composts = {
    'acetic acid': 4.76,
    'formic acid': 3.75
}

const selectCompost = document.getElementById('compost')
const canvas = document.getElementById('grafico').getContext('2d')

selectCompost.addEventListener('change', () => {
    const selectedCompost = selectCompost.value
    const pka = composts[selectedCompost]

    // calculate the concentrations using pka
    const graphData = calculateGraphData(selectedCompost, pka)

    // create graph with Chart.js
    var chartOptions = {
        responsive: false
    }

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: graphData.pH,
            datasets: [
                {
                    label: 'Specie 1',
                    data: graphData.concentrationE1,
                    borderColor: 'blue',
                    fill: false
                },
                //New species datasets
                {
                    label: 'Specie 2',
                    data: graphData.concentrationE2,
                    borderColor: 'red',
                    fill: false
                }
            ]
        },
        options: chartOptions
    })
})

function calculateGraphData(compost, pka){
    return {
        pH: [0, 1, 2, 3],
        concentrationE1: [0.1, 0.2, 0.4, 0.7],
        concentrationE2: [0.9, 0.8, 0.6, 0.3]
    }
}