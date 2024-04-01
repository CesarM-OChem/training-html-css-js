let boxInfo = document.getElementById('boxInfo');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const stringValue = urlParams.get('name');

printInfo(stringValue);

async function printInfo(string){
    let url = 'https://digi-api.com/api/v1/digimon/' + string;
    let request = await fetch(url);
    
    request = await request.json();
    if (request.error == 1){
        return badRequest();
    }
    
    let span = document.createElement('p');
    span.innerHTML = `
        <h1>${string}</h1>
        <hr>
        <p class="optionsBoxPrincipal">
            <img class="imageBorderPrincipal" src="${request.images[0].href}">
        </p>
    `;

    boxInfo.appendChild(span);

    printAttributes(request.attributes);
    printDescription(request.descriptions);
    printFields(request.fields);
    printLevel(request.levels);
    printPrior(request.priorEvolutions);
    printNext(request.nextEvolutions);
    printSkills(request.skills);
    printType(request.types);
}

function badRequest(){
    let span = document.createElement('span');
    span.innerHTML = `
        <h1>O-oh.. It seems that I cound't find your digimon</h1>
        <hr>
        <img src="https://digimon-api.com/images/site/404.png">
        <hr>
    `;
    boxInfo.appendChild(span);
}

function printAttributes(attributes){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Attributes:</h1>
    `;
    boxInfo.appendChild(span);
    
    attributes.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="infoParagraph">
                ${element.attribute}
            </p>
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printDescription(description){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Description:</h1>
    `;
    boxInfo.appendChild(span);
    
    let desc = description[0].description;

    if (description[1].language == "en_us"){
        desc = description[1].description;
    }

    let newSpan = document.createElement('span');
    newSpan.innerHTML = `
        <p class="infoParagraph">
            ${desc}
        </p>
    `;

    boxInfo.appendChild(newSpan);
}

function printFields(fields){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Fields:</h1>
    `;
    boxInfo.appendChild(span);
    
    fields.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="infoParagraph">
                <img width="70px" src="${element.image}">
                <br>
                ${element.field}
            </p>  
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printLevel(levels){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Levels:</h1>
    `;
    boxInfo.appendChild(span);
    
    levels.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="infoParagraph">
                ${element.level}
            </p>  
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printPrior(prior){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Prior Evolutions:</h1>
    `;
    boxInfo.appendChild(span);
    
    prior.forEach(element => {
        if (element.digimon != "Digitama"){
            image = element.image;
        }else{
            image = "https://static.wikia.nocookie.net/digimonwikiabr/images/3/3d/Digitama.jpg/revision/latest?cb=20200520233143&path-prefix=pt-br";
        }

        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="optionsBoxMinor">
                <a class="styleLink" href="./digiinfo.html?name=${element.digimon}">
                    <br>
                    <span>${element.digimon}</span>
                    <br>
                    <br>
                    <br>
                    <img class="imageBorder" src="${image}">
                </a>
            </p>
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printNext(next){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Next Evolutions:</h1>
    `;
    boxInfo.appendChild(span);
    
    next.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="optionsBoxMinor">
                <a class="styleLink" href="./digiinfo.html?name=${element.digimon}">
                    <br>
                    <span>${element.digimon}</span>
                    <br>
                    <br>
                    <br>
                    <img class="imageBorder" src="${element.image}">
                </a>
            </p>
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printSkills(skills){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Skills:</h1>
    `;
    boxInfo.appendChild(span);
    
    skills.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="infoSkill">
                <em><strong>${element.skill}</strong></em> ---> ${element.description}
            </p>  
        `;

        boxInfo.appendChild(newSpan);
    });
}

function printType(type){
    let span = document.createElement('span');
    span.innerHTML = `
        <hr>
        <h1>Types:</h1>
    `;
    boxInfo.appendChild(span);
    
    type.forEach(element => {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = `
            <p class="infoParagraph">
                ${element.type}
            </p>  
        `;

        boxInfo.appendChild(newSpan);
    });
}

