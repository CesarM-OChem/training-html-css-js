import { calculateGraphData, printAlphaGraph, printEffectiveCharge, charges } from "./alphaFunctions.js"

let composts = []
let compostList = document.getElementById('compost')
let chartAlpha = null
let chartCharge = null

window.getData = getData

async function getData(){
    let request = await fetch("https://raw.githubusercontent.com/CesarM-OChem/training-html-css-js/main/chemical-species-distribution/data.json")
    let response = await request.json()
    
    // Sort list based on the name of the composts
    response.sort(function(a, b) {
        return a.compost < b.compost ? -1: a.compost > b.compost ? 1 : 0
    })

    response.forEach(element => {
        composts.push(element)
        let option = document.createElement('option')
        option.innerHTML = `<option value="${element.compost}">${element.compost}</option>`
        compostList.appendChild(option)
    })
}
const selectCompost = document.getElementById('compost')
window.selectCompost = selectCompost

selectCompost.addEventListener('change', () => {
    const selectedCompost = selectCompost.value
    var properties = composts.filter(obj => {
        return obj.compost === selectedCompost
    })

    const pKa = properties[0].pKa
    const protons = properties[0].protonNumber
    const species = properties[0].species
    const higherCharge = properties[0].charges[0]
    const indexHigherCharge = charges.indexOf(higherCharge)
    
    // calculate the concentrations using pka
    const graphData = calculateGraphData(pKa, protons, indexHigherCharge)

    printAlphaGraph(graphData, protons, species)
    printEffectiveCharge(graphData)
})