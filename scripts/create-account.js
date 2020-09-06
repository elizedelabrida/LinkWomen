function handleSubmitAccount() {
  let data = {};

  $("form")
    .serializeArray()
    .map(function (obj) {
      return (data[obj.name] = obj.value);
    });

  if (!data.email || !data.password || !data.name) {
    alert("Informe todos os dados");
    return;
  }

  $.ajax({
    url: "http://link-women.azurewebsites.net/api/User",
    contentType: "application/json",
    data: JSON.stringify(data),
    method: "POST",
    success: (response) => {
        alert("Cadastro realizado com sucesso")
      location.href = "login.html";
    },
    error: (response) => {
      if (response.status === 400) {
        alert(response.responseText);
      } else {
        alert("Erro inesperado, por favor tente novamente mais tarde.");
      }
    },
  });
}
