const token = localStorage.getItem("linkwomen:token");
const issueId = localStorage.getItem("linkwomen:discussionId"); 

$(document).ready(function(){
    getIssue(issueId); 
}); 

function getIssue(id){
    $.ajax({
        url: `https://link-women.azurewebsites.net/api/ForumIssue/${id}`,
        contentType: "application/json",
        headers: { Authorization: "Bearer " + token },
        method: "GET",
        success: (response) => {

            $("#issue-title").html(response.title); 
            $("#comment-items").append(createHtmlComment(response)); 

            response.comments.forEach(element => {
                $("#comment-items").append(createHtmlComment(element)); 
            });
          console.log(response); 
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

function createHtmlComment(comment){
    let html = `
    <div class="comment">
        <div class="shadow row rounded p-3">
            <div class="col-md-2">
                <img class="img-profile mx-auto d-block py-2" src="assets/images/mulheresemdestaque.png"
                    alt="Larissa Souza">
            </div>
            <div class="col-md-8">
                <p class="pt-2">
                    ${comment.content}
                </p>
                <span class="text-purple">${comment.createdAt}</span>
            </div>
            <div class="col-md-2 d-flex justify-content-end">
                <a href="#" role="button" id="btn-edit" class="fa fa-pencil text-green btn-lg"></a>
            </div>
        </div>
    </div>`; 

    return html;    
}

function handleSubmitComment(){
    let comment = $("#comment").val(); 

    $.ajax({
        url: `https://link-women.azurewebsites.net/api/ForumIssue/${issueId}/Comment`,
        contentType: "application/json",
        data: JSON.stringify(comment), 
        headers: { Authorization: "Bearer " + token },
        method: "POST",
        success: (response) => {
            $("#comment-items").append(createHtmlComment(response)); 
            $("#comment").val(""); 
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