let listProjet = [];
let listCategories = [];

// récupérer dynamiquement les projets
fetch("http://localhost:5678/api/works")
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((data) => {
        // affichage des projets avec le create element sur le dom
        listProjet = data;
        displayProjects(listProjet);
        
    })
    .catch((error) => {
        alert("Une erreur est survenue! Veuillez contacter l'administrateur!")
    });
    
// récupérer dynamiquement les categories 
fetch("http://localhost:5678/api/categories")
.then((response) => {
    if (response.ok) return response.json();
})
.then((data) => {
   
    // affichage des categories avec le create element sur le dom
    addFilters(data);
    displayEdit();
})
.catch((error) => {
    alert("Une erreur est survenue! Veuillez contacter l'administrateur!")
});


// Ajouter toutes les cartes crées sur le dom 
function displayProjects(arrayProjects) {

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // boucler sur le tableau 
    arrayProjects.forEach(element => {
        //et appeler create project 
        const figure = createProject(element);
        // puis l'ajouter sur le dom dans la section gallery
        gallery.appendChild(figure);
    });
}

// créer une seule carte
function createProject(project) {

    const figure = document.createElement("figure");
    figure.setAttribute("id", project.id);
    //create an img element
    const image = document.createElement("img");
    image.setAttribute("src", project.imageUrl);
    image.setAttribute("alt", project.title);

    //create a figcaption element
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = project.title;
    figure.appendChild(image);
    figure.appendChild(figcaption);
    return figure;
}

//
function addFilters(data) { 
    const tous =  {
        id:-1,
        name: "Tous"
      }
    listCategories.push(tous);
    data.forEach(element => {
    listCategories.push(element);
    });

    // boucler sur cette liste et pour chaque element je vais créer un bouton 
    listCategories.forEach(element => {

        const button = document.createElement("button");
        button.setAttribute("class", "filterButton");
        button.textContent = element.name;
        button.addEventListener("click", function (event) {
            if (this.textContent == 'Tous') {
                displayProjects(listProjet);
            } else {
                let result = filterByCategory(this.textContent);
                displayProjects(result);
            }
        });
        document.querySelector(".filter").appendChild(button);
    });
    createSelectCategories(data);
}

// filtrer par catégorie
function filterByCategory(critere) {
    let result = listProjet.filter((element) => (element.category.name == critere));
    return result;
}

//supprimer tous les éléments du localStorage & recharge la page en cours depuis l'URL actuelle
function logout(){
    localStorage.clear();
    window.location.reload();
}

// Afficher/cacher les buttons modifier
function displayEdit(){
    if(localStorage.getItem("token") && localStorage.getItem("userId")){
        const login = document.querySelector(".login");
        login.style.display = "none";
        const allMybtn = document.querySelectorAll(".myBtn");
        allMybtn.forEach(element => {
            element.style.display = "block";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "block";
        const barre = document.querySelector(".blackBloc");
        barre.style.display = "flex";
        const filter = document.querySelector(".filter");
        filter.style.display = "none";
    }
    else{
        const login = document.querySelector(".login");
        login.style.display = "block";
        const allMybtn = document.querySelectorAll(".myBtn");
        allMybtn.forEach(element => {
            element.style.display = "none";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "none";
        const barre = document.querySelector(".blackBloc");
        barre.style.display = "none";
        const filter = document.querySelector(".filter");
        filter.style.display = "flex";
    }
}

//Afficher/cacher la barre filtre
function displayFilters(){
    if(localStorage.getItem("token") && localStorage.getItem("userId")){
        const login = document.querySelector(".login");
        login.style.display = "block";
        const allFilter = document.querySelectorAll(".filter");
        allFilter.forEach(element => {
            element.style.display = "none";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "none";
    }
    else{
        const login = document.querySelector(".login");
        login.style.display = "none";
        const allFilter = document.querySelectorAll(".filter");
        allFilter.forEach(element => {
            element.style.display = "block";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "block";
    }
}


// l'affichage de la barre noire 
function ShowBlackBar(){
    if(localStorage.getItem("token") && localStorage.getItem("userId")){
        const login = document.querySelector(".login");
        login.style.display = "none";
        const blackBloc = document.querySelectorAll(".blackBloc");
        blackBloc.forEach(element => {
            element.style.display = "block";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "block";
    }
    else{
        const login = document.querySelector(".login");
        login.style.display = "block";
        const blackBloc = document.querySelectorAll(".blackBloc");
        blackBloc.forEach(element => {
            element.style.display = "none";
        });
        const logout = document.querySelector(".logout");
        logout.style.display = "none";
    }
}

// création de la selection par catégorie
function createSelectCategories(categories){
    const select = document.getElementById("category");
    categories.forEach(element => {
        const option = document.createElement("option");
        option.value=element.id;
        option.text = element.name;
        select.appendChild(option);
    });
}