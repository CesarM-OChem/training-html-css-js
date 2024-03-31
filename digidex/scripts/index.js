let listButton = document.getElementById('listButton');
let names = [];

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

    names.forEach(element => {
        let p = document.createElement('p');
        p.innerHTML = `
            <p>
                <button>${element.name}</button>
            </p>
        `;

        listButton.appendChild(p);
    });
    
}