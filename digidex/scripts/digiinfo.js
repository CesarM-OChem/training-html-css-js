let boxInfo = document.getElementById('boxInfo');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const stringValue = urlParams.get('name');

printInfo(stringValue);

async function printInfo(string){
    let url = 'https://digi-api.com/api/v1/digimon/' + string;
    let request = await fetch(url);
    request = await request.json();

    printAttributes(request.attributes);
    printDescription(request.descriptions);
    printFields(request.fields);
    printLevel(request.levels);
    printPrior(request.priorEvolutions);
    printNext(request.nextEvolutions);
    printSkills(request.skills);
    printType(request.types);
}

function printAttributes(array){
    array.forEach(element => {
        console.log(element.attribute);
    });
}

function printDescription(description){console.log(description);}

function printFields(fields){console.log(fields);}

function printLevel(levels){console.log(levels);}

function printPrior(prior){console.log(prior);}

function printNext(next){console.log(next);}

function printSkills(skills){console.log(skills);}

function printType(type){console.log(type);}

