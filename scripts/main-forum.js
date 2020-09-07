const token = localStorage.getItem("linkwomen:token");

$(document).ready(function () {
  listItems();
});

function listItems() {
  

  $.ajax({
    url: "https://link-women.azurewebsites.net/api/ForumIssue/All",
    method: "GET",
    headers: { Authorization: "Bearer " + token },
    success: (response) => {
      $("#forum-items").html("");
      response.forEach((element) => {
        $("#forum-items").append(createHtmlIssueItem(element));
      });
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

function createHtmlIssueItem(issue) {
  let html = `
    <a href="discussion.html" class="discussion">
        <div class="row justify-content-end mt-3">
            <div class="category-discussion col-md-2 text-center p-1 mx-4 font-size-small rounded shadow">
                <span class="fa fa-circle pt-1 mr-1 text-warning"></span>
                LGBTQ+
            </div>
        </div>
        <div class="shadow row rounded p-3">
            <div class="col-md-2">
                <img class="img-profile mx-auto d-block py-2" src="assets/images/mulheresemdestaque.png"
                    alt="Larissa Souza">
            </div>
            <div class="col-md-8">
                <h5 class="text-purple">${issue.title}</h3>
                    <span class="text-green">${issue.createdAt}</span>
                    <p class="text-green font-italic pt-2">
                        "${issue.content}"
                    </p>
            </div>
            <div class="col-md-2 text-green font-size-small p-0 pb-3 align-self-end">
                <span class="fa fa-comment pt-1 mr-1"></span>
                ${issue.comments.length} comentário${
    issue.comments.length != 1 ? `s` : ``
  }
            </div>
        </div>
    </a>`;

  return html;
}

function handleSubmitIssue() {
  let title = $("#title").val();
  let category = $("#category").val();
  let description = $("#description").val();

  if (!title || !description) {
    alert("Informe título e descrição");
    return;
  }

  let data = {
      title, 
      content: description
  }

  $.ajax({
    url: "https://link-women.azurewebsites.net/api/ForumIssue",
    contentType: "application/json",
    data: JSON.stringify(data),
    headers: { Authorization: "Bearer " + token },
    method: "POST",
    success: (response) => {
      $("#modal-discussion-created").modal('show'); 
      $("#modal-discussion").modal('hide'); 

      listItems(); 
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
