let composts = []
let compostList = document.getElementById('compost')
const points = 141
const colorList = ['blue', 'red', 'green', 'yellow', 'purple', 'black', 'pink', 'gray']

async function getData(){
    let request = await fetch("https://raw.githubusercontent.com/CesarM-OChem/training-html-css-js/main/chemical-species-distribution/data.json")
    let response = await request.json()
    response.forEach(element => {
        composts.push(element)
        let option = document.createElement('option')
        option.innerHTML = `<option value="${element.compost}">${element.compost}</option>`
        compostList.appendChild(option)
    })
}

const selectCompost = document.getElementById('compost')
const canvas = document.getElementById('grafico')
const ctx = canvas.getContext('2d')
let chart = null

selectCompost.addEventListener('change', () => {
    const selectedCompost = selectCompost.value
    var properties = composts.filter(obj => {
        return obj.compost === selectedCompost
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(chart){
        chart.destroy()
    }

    const pKa = properties[0].pKa
    const n = properties[0].protonNumber
    // calculate the concentrations using pka
    const graphData = calculateGraphData(pKa, n)

    // create graph with Chart.js
    var chartOptions = {
        responsive: false
    }

    var dataset = []
    for(let i = 0; i <= n; i++){
        dataObject = {
            label: properties[0].species[i],
            data: graphData.alphaList[i],
            borderColor: colorList[i],
            fill: false
        }
        dataset.push(dataObject)
    }

    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: graphData.pHList,
            datasets: dataset
        },
        options: chartOptions
    })
})

function calculateGraphData(pKa, n){
    pHList = new Array(points)
    alphaList = Array.from({length: (n + 1)}, () => new Array(points))
    pH = -0.1

    for (let i = 0; i < points; i++){
        pH += 0.1
        pHList[i] = pH.toFixed(1)

        // calculate alpha0
        sum = 0
        for(let index = 1; index <= n; index++){
            sum += sumExpTen(index, pH, pKa)
        }
        alphaList[0][i] = (1 / (1 + sum))

        // Calculate the other alphas
        for(let alpha = 1; alpha <= n; alpha++){
            alphaList[alpha][i] = (alphaList[0][i] * sumExpTen(alpha, pH, pKa))
        }
    }

    return {
        pHList,
        alphaList
    }
}

function sumExpTen(index, pH, pKa){
    exp = index * pH
    for(let i = 0; i < index; i++){
        exp -= pKa[i]
    }

    return Math.pow(10, exp)
}

//₂₃₄₅₆₇₈₉⁻⁺