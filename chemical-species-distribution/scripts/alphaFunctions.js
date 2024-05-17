export const charges = [4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6]
const points = 141
const colorList = ['blue', 'red', 'green', 'yellow', 'purple', 'black', 'pink', 'gray']
let chartAlpha = null

export function calculateGraphData(pKa, protons, indexHigherCharge){
    let pHList = new Array(points)
    let alphaList = Array.from({length: (protons + 1)}, () => new Array(points))
    let effectiveCharges = new Array(points).fill(0)
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

    for(let i = 0; i < points; i++){
        for(let j = 0; j <= protons; j++){
            effectiveCharges[i] += (charges[j + indexHigherCharge] * alphaList[j][i])
        }
    }

    return {
        pHList,
        alphaList,
        effectiveCharges
    }
}

function sumExpTen(index, pH, pKa){
    let exp = index * pH
    for(let i = 0; i < index; i++){
        exp -= pKa[i]
    }

    return Math.pow(10, exp)
}

export function printAlphaGraph(graphData, protons, species){
    const canvas = document.getElementById('graphAlpha')

    if(window.chartAlpha){
        window.chartAlpha.destroy()
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

    window.chartAlpha = new Chart(canvas, {
        type: 'line',
        data: {
            labels: graphData.pHList,
            datasets: dataset
        },
        options: chartOptions
    })
}

export function printEffectiveCharge(graphData){
    const canvas = document.getElementById('graphCharge')
    
    if(window.chartCharge){
        window.chartCharge.destroy()
    }

    var chartOptions = {
        responsive: false
    }

    window.chartCharge = new Chart(canvas, {
        type: 'line',
        data:{
            labels: graphData.pHList,
            datasets:[{
                label: "Effective Charge",
                data: graphData.effectiveCharges,
                borderColor: "black",
                fill: false
            }]
        },
        options: chartOptions
    })
}