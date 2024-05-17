import { calculateGraphData, printAlphaGraph, printEffectiveCharge, charges } from "./alphaFunctions.js"

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
        alert("Type a integer number between 1 and 7")
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

    let selectCharge = document.createElement('span')
    selectCharge.innerHTML = `
                                  <br>
                                  <label for="charge">Charge of the most protonated species</label>
                                  <select id="charge"></select>
                             `

    alphaField.appendChild(selectCharge)                        

    let optionList = document.getElementById('charge')
    for(let i = 0, length = charges.length; i < length; i++){
        let option = document.createElement('option')
        option.innerHTML = `<option value="${i}">${charges[i]}</option>`
        optionList.appendChild(option)
    }
    

    document.getElementById('pK1').focus()
    let newButton = document.createElement('span')
    newButton.innerHTML = '<button onclick="generateGraph()">Generate Graph</button><hr>'
    alphaField.appendChild(newButton)
}

function generateGraph(){
    let pKa = new Array(protons)
    if(!getEntries(pKa)){
        alert("All pKa's must be non-negative numbers")
        document.getElementById('pK1').focus()
        return
    }
    const higherCharge = Number(document.getElementById('charge').value)
    const indexHigherCharge = charges.indexOf(higherCharge)
    const species = ["α₀", "α₁", "α₂", "α₃", "α₄", "α₅", "α₆", "α₇"]

    const graphData = calculateGraphData(pKa, protons, indexHigherCharge)

    printAlphaGraph(graphData, protons, species)
    printEffectiveCharge(graphData)
}

function checkIfIsNumber(entry, type){
    if(type === "alpha"){
        if(!Number.isInteger(entry) || entry < 1 || entry > 7){
            return false
        }
    }else{
        if(Number.isNaN(entry) || entry < 0){
            return false
        }
    }
    

    return true
}

function getEntries(pKa){
    for(let i = 0; i < protons; i++){
        pKa[i] = parseFloat(document.getElementById('pK' + (i + 1)).value)
        if(!checkIfIsNumber(pKa[i], "pKa")){
            return false
        }
    }

    return true
}