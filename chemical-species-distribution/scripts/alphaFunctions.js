
const points = 141
const colorList = ['blue', 'red', 'green', 'yellow', 'purple', 'black', 'pink', 'gray']
let chart = null

export function calculateGraphData(pKa, protons){
    let pHList = new Array(points)
    let alphaList = Array.from({length: (protons + 1)}, () => new Array(points))
    let pH = -0.1

    for (let i = 0; i < points; i++){
        pH += 0.1
        pHList[i] = pH.toFixed(1)

        // calculate alpha0
        let sum = 0
        for(let index = 1; index <= protons; index++){
            sum += sumExpTen(index, pH, pKa)
        }
        alphaList[0][i] = 1 / (1 + sum)

        // Calculate the other alphas
        for(let alpha = 1; alpha <= protons; alpha++){
            alphaList[alpha][i] = alphaList[0][i] * sumExpTen(alpha, pH, pKa)
        }
    }

    return {
        pHList,
        alphaList
    }
}

function sumExpTen(index, pH, pKa){
    let exp = index * pH
    for(let i = 0; i < index; i++){
        exp -= pKa[i]
    }

    return Math.pow(10, exp)
}

export function printGraph(graphData, protons, species){
    const canvas = document.getElementById('grafico')
    const ctx = canvas.getContext('2d')

    if(window.chart){
        window.chart.destroy()
    }

    // create graph with Chart.js
    var chartOptions = {
        responsive: false
    }

    var dataset = []
    
    for(let i = 0; i <= protons; i++){
        let dataObject = {
            label: species[i],
            data: graphData.alphaList[i],
            borderColor: colorList[i],
            fill: false
        }
        dataset.push(dataObject)
    }

    window.chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: graphData.pHList,
            datasets: dataset
        },
        options: chartOptions
    })
}