var user;
var userId;
var token;

$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  userId = localStorage.getItem("linkwomen:userId");
  token = localStorage.getItem("linkwomen:token");
  $.ajax({
    url: `https://link-women.azurewebsites.net/api/User/${userId}`,
    contentType: "application/json",
    headers: { Authorization: "Bearer " + token },
    method: "GET",
    success: (response) => {
      user = {
        CPF: response.cpf,
        Name: response.name,
        Email: response.email,
        Occupation: response.occupation,
        Bio: response.bio,
        UserName: response.userName,
        GitHub: response.gitHub
      };

      $('#name').html(user.Name);
      $('#email').val(user.Email);
      $('#full-name').val(user.Name);
      $('#occupation').val(user.Occupation);
      $('#github').val(user.GitHub);
      $('#bio').val(user.Bio);
    },
    error: (response) => {
      if (response.status === 400) {
        alert(response.responseText);
      } else {
        alert("Erro inesperado, por favor tente novamente mais tarde.");
      }
    },
  });
});

function editBio() {
  $('#bio-profile').html('');
  $('#bio-profile').html(`
    <textarea id="bio" class="form-control" rows="3" style="resize:none"
      placeholder="Digite uma pequena biografia sobre você">${user.Bio ? user.Bio : ''}</textarea>
    <div style="text-align: end;">
    <button type="button" class="btn btn-sm btn-outline-primary mt-2 mr-1" onclick="cancelBio()">
      Cancelar
    </button>
    <button id="btn-save-bio" type="button" class="btn btn-sm btn-primary mt-2" onclick="saveBio()">
      Salvar
    </button>
    </div>
    `);
  $('#edit-bio-icon').addClass('d-none');
}

function cancelBio() {
  $('#edit-bio-icon').removeClass('d-none');
  $('#bio-profile').html('');
  $('#bio-profile').html(`<h5 class="text-green text-center px-2">Nos conte um pouco sobre você :)</h5>`);
  $('#bio').val(user.Bio);
};

function saveBio() {
  user.Bio = $('#bio').val();

  $.ajax({
    url: `https://link-women.azurewebsites.net/api/User/${userId}/UpdateBio`,
    contentType: "application/json",
    headers: { Authorization: "Bearer " + token },
    data: user.Bio,
    method: "PUT",
    success: (response) => {
      location.href;
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

function saveUser() {
  user.Email = $('#email').val();
  user.Name = $('#full-name').val();
  user.Occupation = $('#occupation').val();
  user.GitHub = $('#github').val();

  $.ajax({
    url: `https://link-women.azurewebsites.net/api/User/${userId}`,
    contentType: "application/json",
    headers: { Authorization: "Bearer " + token },
    data: JSON.stringify(user),
    method: "PUT",
    success: (response) => {
      location.href;
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
