const composts = {
    'acetic acid': {
        pKa: 4.76,
        a0: 'HAc',
        a1: 'Ac-'
    },
    'formic acid': {
        pKa: 3.75,
        a0: 'HCO2H',
        a1: 'HCO2-'
    }
}

const selectCompost = document.getElementById('compost')
const canvas = document.getElementById('grafico')
const ctx = canvas.getContext('2d')
let chart = null

selectCompost.addEventListener('change', () => {
    const selectedCompost = selectCompost.value
    const pKa = composts[selectedCompost]['pKa']

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(chart){
        chart.destroy()
    }

    // calculate the concentrations using pka
    const graphData = calculateGraphData(selectedCompost, pKa)

    // create graph with Chart.js
    var chartOptions = {
        responsive: false
    }

    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: graphData.pHList,
            datasets: [
                {
                    label: replaceChar(composts[selectedCompost].a0),
                    data: graphData.alpha0List,
                    borderColor: 'blue',
                    fill: false
                },
                //New species datasets
                {
                    label: replaceChar(composts[selectedCompost].a1),
                    data: graphData.alpha1List,
                    borderColor: 'red',
                    fill: false
                }
            ]
        },
        options: chartOptions
    })
})

function calculateGraphData(compost, pKa){
    pHList = []
    alpha0List = []
    alpha1List = []
    pH = 0

    for (let i = 0; i < 140; i++){
        pHList.push(pH.toFixed(1))
        pH += 0.1

        alpha1 = (1 / (1 + Math.pow(10, pKa - pH))).toFixed(5)

        alpha1List.push(alpha1)
        alpha0List.push(1 - alpha1)
    }

    return {
        pHList,
        alpha0List,
        alpha1List
    }
}

function replaceChar(formula){
    return formula.replace(2, '₂').replace(3, '₃').replace(4, '₄').replace(5, '₅').replace(6, '₆').replace(7, '₇').replace(8, '₈').replace(9, '₉').replace(/\-/g, '⁻').replace(/\+/g, '⁺')
}