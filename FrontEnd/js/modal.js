// Get the button that opens the modal
var btn = document.getElementById("editProject");
// Get the modal
const modal = document.getElementById("myModal");
// bouton add photo
const ajouterUnePhoto = document.querySelector(".ajouterUnePhoto");
const modalContentAjout = document.querySelector(".modalContentAjout");
const modalContentGallery = document.querySelector(".modalContentGallery");

const close = document.getElementsByClassName("close")[0];
const returnBtn = document.querySelector(".return");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  const content = afficherCard();
  const contentModal = document.querySelector(".contentModal");
  contentModal.innerHTML = "";
  contentModal.appendChild(content);
}

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
 /* if (event.target == modal) {
    modal.style.display = "none";
  }*/
}

// Ajouter toutes les cartes crées sur le dom 
function afficherCard() {

  const cards = document.createElement("div");
  cards.setAttribute("class", "galleryCards");

  //boucler sur le tableau
  listProjet.forEach((element) => {
    //et appeler create project 
    const card = createCard(element);
    // puis l'ajouter sur le dom dans la section gallery
    cards.appendChild(card);
  });

  return cards;
}

// créer une seule carte
function createCard(project) {

  const card = document.createElement("figure");
  card.setAttribute("class", "cardModal");
  card.setAttribute("data-id", project.id);
  //create an img element et l'icon
  const blocImg = document.createElement("div");
  blocImg.setAttribute("class", "blocImg");

  const image = document.createElement("img");
  image.setAttribute("src", project.imageUrl);
  image.setAttribute("alt", project.title);
  blocImg.appendChild(image);

  const divIcon = document.createElement("div");
  divIcon.setAttribute("class", "divIcon");
  divIcon.addEventListener("click", function(e){
    e.preventDefault();
    const confirmation = confirm("Etes vous sur de supprimer cet article?");
    if ( confirmation == true) {
      deleteWork(project.id);
    } 
    
  });
  const iconDelete = document.createElement("i");
  iconDelete.setAttribute("class", "deleteBtn fa-solid fa-trash-can");
  divIcon.appendChild(iconDelete);
  blocImg.appendChild(divIcon);

  //create a texte element
  const editer = document.createElement("div");
  editer.setAttribute("class", "editer");
  editer.textContent = "éditer";

  card.appendChild(blocImg);
  card.appendChild(editer);
  return card;
}


// When the user clicks on the button, open the modal
ajouterUnePhoto.onclick = function () {
  modalContentAjout.style.display = "flex";
  modalContentGallery.style.display = "none";
  returnBtn.style.visibility = "unset";
}

returnBtn.onclick = function () {
  modalContentAjout.style.display = "none";
  modalContentGallery.style.display = "flex";
  returnBtn.style.visibility = "hidden";
}

// add work
function previewImage(e){
  const imagePreview = document.getElementById("imgAjout");
  const removeImageButton = document.querySelector(".removeImageButton");

  const file = e.target.files[0]; // Vérifie si un fichier a été sélectionné
  if (file) {
      if (file.type.match("image.*")) {
          if (file.size <= 4194304) // verifier la taille de l'image
          {
              var reader = new FileReader();
              reader.onload = function (event) {
                  imagePreview.src = event.target.result;
                  imagePreview.style.display = "block";
                  document.querySelector(".fa-image").style.display = "none";
                  document.getElementById("buttonloadFile").style.display = "none";
                  document.getElementById("file").style.display = "none";
                  document.querySelector(".detailsImg").style.display = "none";
                  removeImageButton.style.display = "block";
              };
              reader.readAsDataURL(file);
          } else {
              alert("Le fichier dépasse la taille maximale autorisée de 4 Mo.");
              
      imagePreview.style.display = "none";
      document.querySelector(".fa-image").style.display = "block";
      document.getElementById("buttonloadFile").style.display = "block";
      document.getElementById("file").style.display = "block";
      document.querySelector(".detailsImg").style.display = "block";
      removeImageButton.style.display = "none";
          }
      } else {
          alert("Le fichier sélectionné n'est pas une image.");

          imagePreview.style.display = "none";
          document.querySelector(".fa-image").style.display = "block";
          document.getElementById("buttonloadFile").style.display = "block";
          document.getElementById("file").style.display = "block";
          document.querySelector(".detailsImg").style.display = "block";
          removeImageButton.style.display = "none";
      }
  } else {
      
    imagePreview.style.display = "none";
    document.querySelector(".fa-image").style.display = "block";
    document.getElementById("buttonloadFile").style.display = "block";
    document.getElementById("file").style.display = "block";
    document.querySelector(".detailsImg").style.display = "block";
    removeImageButton.style.display = "none";
  }

  removeImageButton.addEventListener("click", (e) => {
      e.preventDefault();
      imagePreview.style.display = "none";
      document.querySelector(".fa-image").style.display = "block";
      document.getElementById("buttonloadFile").style.display = "block";
      document.getElementById("file").style.display = "block";
      document.querySelector(".detailsImg").style.display = "block";
      removeImageButton.style.display = "none";
  });
}

  const form = document.getElementById('formAjout');
  form.addEventListener('submit', (Event) => {
    Event.preventDefault();
   // Event.stopPropagation();
    const image = document.getElementById('file');
    const titre = document.getElementById('title');
    const category = document.getElementById('category');

   
      const formData = new FormData();
      formData.append("title", titre.value);
      formData.append("category", category.value);
      formData.append("image", image.files[0]);

      const token = localStorage.getItem('token');

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response)=> {
        if(response.ok) return response.json();
      })
      .then((projet)=> {
        // Mise à jour du tableau globale 
        listProjet.push(projet);
        console.log(projet);
        // fermer la modale 
        modal.style.display = "none";
        returnBtn.click();
        // mise à jour de la liste gallery photo dans le dom 
        const gallery = document.querySelector(".gallery");
        //et appeler create project 
        const figure = createProject(projet);
        // puis l'ajouter sur le dom dans la section gallery
        gallery.appendChild(figure);
      })
      .catch((error) =>{
        console.log(error);
        alert("Une erreur est survenue! ");
      });
    });


// Delete project
function deleteWork(id) {

  const token = localStorage.getItem('token');

  // Envoie une requete DELETE pour supprimer
  fetch('http://localhost:5678/api/works/'+id, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${token}`,
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
  .then((response) => {
    if (response.status === 204) {
      alert("suppression faite avec succes!");
      // Supprimer encore l'element depuis le tableau globale 
      listProjet = listProjet.filter(element => element.id == id)
      // Supprimer l'element depuis la modale
      const listFigureModal = document.querySelectorAll(".cardModal");
      listFigureModal.forEach(element => {
        if(element.dataset.id == id )
        element.remove();
      });
      // Supprimer l'element depuis la galelry globale 
      document.getElementById(id).remove();
    } else {
      console.error("imposible de supprimer !");
    }
  })
    .catch((error) => {
      console.error("Error lors de l'envoi des données");
    });
  }

