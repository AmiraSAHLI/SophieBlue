
// recuperer le champs email et mot de passe depuis le formulaire  
const form = document.getElementById("form");
form.addEventListener("submit", function(event){
  event.preventDefault();
  const email =form.email.value;
  const pwd = form.motDePasse.value;
  // tester la conformité du login
  // voir les regEx
  // Si c'est pas bon afficher une alerte 
  // sinon envoi du formulaire 


let options =
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": email, //sophie.bluel@test.tld
    "password": pwd, // S0phie
  })
}


let response = fetch('http://localhost:5678/api/users/login', options).then(
  response => {
    console.log(response);
    if (response.ok) return response.json();
    if (response.status ==404) {
      alert("Veuillez verifier le login et / ou le mot de passe !!")
      return null;
    }
  }
).then(data => {
  if(data != null){
    console.log(data);
    // stoker le user id recuperer et le token dans le localStorage 
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("token", data.token);
    window.location.href = "./index.html"
  }

}).catch((error) => {
  console.log(error);
  alert("Une erreur est survenue! Veuillez contacter l'administrateur!")
});

});




