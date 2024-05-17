import { calculateGraphData, printGraph } from "./alphaFunctions.js"

const points = 141
var protons = 0

window.generateField = generateField
window.generateGraph = generateGraph

function generateField(){
    if(window.chart){
        window.chart.destroy()
    }

    protons = Number(document.getElementById("protons").value)

    if(!checkIfIsNumber(protons, "alpha")){
        alert("Type a number between 1 and 7")
        document.getElementById('protons').focus()
        return
    }

    let alphaField = document.getElementById('alphaField')
    alphaField.innerText = ""

    for(let i = 0; i < protons; i++){
        let content = document.createElement('span')
        content.innerHTML = `
                      <label>pK${i + 1}</label>
                      <input type="text" id="pK${i + 1}"><span style="color: transparent">---</span>
                  `
        alphaField.appendChild(content)
    }

    document.getElementById('pK1').focus()
    let newButton = document.createElement('span')
    newButton.innerHTML = '<button onclick="generateGraph()">Generate Graph</button>'
    alphaField.appendChild(newButton)
}

function generateGraph(){
    let pKa = new Array(protons)
    if(!getEntries(pKa)){
        alert("All pKa's must be non-negative numbers")
        document.getElementById('pK1').focus()
        return
    }
    const species = ["α₀", "α₁", "α₂", "α₃", "α₄", "α₅", "α₆", "α₇"]

    const graphData = calculateGraphData(pKa, protons)

    printGraph(graphData, protons, species)
}

function checkIfIsNumber(entry, type){
    if(type === "alpha"){
        if(!Number.isInteger(entry) || entry < 1 || entry > 7){
            return false
        }
    }else{
        if(!Number.isInteger(entry) || entry < 0){
            return false
        }
    }
    

    return true
}

function getEntries(pKa){
    for(let i = 0; i < protons; i++){
        pKa[i] = Number(document.getElementById('pK' + (i + 1)).value)
        if(!checkIfIsNumber(pKa[i], "pKa")){
            return false
        }
    }

    return true
}