function handleLogin() {
  var username = $("#username").val();
  var password = $("#password").val();

  let data = {
    username: username,
    password: password,
  };

  if(!username || !password){
      alert("Informe usuário e senha"); 
      return;   
  }

  $.ajax({
    url: "https://link-women.azurewebsites.net/api/Session",
    contentType: "application/json",
    data: JSON.stringify(data),
    method: "POST",
    success: (response) => {
      const { user, token } = response;

      localStorage.setItem("linkwomen:token", token);
      localStorage.setItem("linkwomen:userId", user.id);

      location.href="main-login.html"; 
    },
    error: (response) => {

        if(response.status === 400){
            alert(response.responseText); 
        }
        else{
            alert("Erro inesperado, por favor tente novamente mais tarde.")
        }
    }
  });
}
