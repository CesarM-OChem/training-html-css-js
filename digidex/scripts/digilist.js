let listButton = document.getElementById('listButton');
let names = [];
listDigimons();

async function listDigimons(){
    let request = await fetch('https://digimon-api.vercel.app/api/digimon');
    let results = await request.json();
    
    results.forEach(element => {
        names.push(element.name);
    });
    
    names.sort();
    
    results.forEach((element, index) => {
        results_index = names.indexOf(results[index].name);
        names[results_index] = {name: element.name, img: element.img};
    });

    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    // Adicionar o contêiner da grade à página
    listButton.appendChild(gridContainer);

    names.forEach(element => {
        let p = document.createElement('p');
        
        p.innerHTML = `
            <p class="optionsBox">
                <a class="styleLink" href="./digiinfo.html?name=${element.name}">
                    <br>
                    <span>${element.name}</span>
                    <br>
                    <br>
                    <br>
                    <img class="imageBorder" src="${element.img}">
                    <br>
                </a>
            </p> 
        `;

        gridContainer.appendChild(p);
    });
}