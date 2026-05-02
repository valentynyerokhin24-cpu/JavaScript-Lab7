document.getElementById('loadCatalog').addEventListener('click', () => {
    fetch('data/categories.json')
        .then(response => response.json())
        .then(data => {
            let html = '<h2>Каталог категорій</h2><ul>';
            data.forEach(cat => {
                html += `<li><a href="#" onclick="loadCategory('${cat.shortname}')">${cat.name}</a></li>`;
            });
            html += `<li><a href="#" onclick="loadRandomCategory()" class="text-danger">Specials</a></li></ul>`;
            document.getElementById('content').innerHTML = html;
        });
});

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(response => response.json())
        .then(data => {
            let html = `<h2>${data.categoryName}</h2><div class="row">`;
            data.items.forEach(item => {
                html += `
                <div class="col-md-3">
                    <img src="https://placehold.co/200x200" alt="${item.name}">
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                    <p><b>Ціна: ${item.price}</b></p>
                </div>`;
            });
            html += `</div>`;
            document.getElementById('content').innerHTML = html;
        });
}

function loadRandomCategory() {
    fetch('data/categories.json')
        .then(r => r.json())
        .then(data => {
            const random = data[Math.floor(Math.random() * data.length)]; //
            loadCategory(random.shortname);
        });
}