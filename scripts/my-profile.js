$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
});

function editBio() {
  $('#bio-profile').html('');
  $('#bio-profile').html(`
    <textarea class="form-control" rows="3" style="resize:none"
      placeholder="Digite uma pequena biografia sobre você"></textarea>
    <div style="text-align: end;">
    <button type="button" class="btn btn-sm btn-outline-primary mt-2 mr-1" onclick="cancelBio()">
      Cancelar
    </button>
    <button id="btn-save-bio" type="button" class="btn btn-sm btn-primary mt-2">
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
};
