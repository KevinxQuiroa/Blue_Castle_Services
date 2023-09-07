document.addEventListener("DOMContentLoaded", function() {
  const adminPasswordInput = document.getElementById("adminPassword");
  const commentForms = document.querySelectorAll(".comment-form");

  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];

  function createCommentElement(comment, isAdmin, commentForm) {
    const newCommentElement = document.createElement("div");
    newCommentElement.textContent = comment.text;
    newCommentElement.classList.add("comment-box");

    if (isAdmin) {
      const editButton = createButton("Edit", "edit-button", () => editComment(comment, commentForm));
      const deleteButton = createButton("Delete", "delete-button", () => deleteComment(comment, commentForm));

      newCommentElement.appendChild(editButton);
      newCommentElement.appendChild(deleteButton);
    }

    commentForm.querySelector(".comments-list").appendChild(newCommentElement);
  }

  function editComment(comment, commentForm) {
    const newText = prompt("Edit the comment:", comment.text);
    if (newText !== null) {
      comment.text = newText;
      updateComments(commentForm);
    }
  }

  function deleteComment(comment, commentForm) {
    const confirmDelete = confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      savedComments = savedComments.filter(c => c !== comment);
      updateComments(commentForm);
    }
  }

  function updateComments(commentForm) {
    localStorage.setItem("comments", JSON.stringify(savedComments));
    const isAdmin = adminPasswordInput.value === adminPassword;
    const commentList = commentForm.querySelector(".comments-list");
    commentList.innerHTML = "";
    savedComments.forEach(comment => createCommentElement(comment, isAdmin, commentForm));
  }

  commentForms.forEach(commentForm => {
    const submitButton = commentForm.querySelector(".submit-button");
    const commentInput = commentForm.querySelector(".comment-input");

    submitButton.addEventListener("click", function() {
      const commentText = commentInput.value;
      const enteredPassword = adminPasswordInput.value;

      if (commentText !== "") {
        const newComment = { text: commentText };
        savedComments.push(newComment);
        updateComments(commentForm);
        commentInput.value = "";
      }
    });

    // Carga los comentarios almacenados cuando se inicia la página
    updateComments(commentForm);
  });
});

// Función auxiliar para crear botones
function createButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", clickHandler);
  return button;
}

// Define una contraseña de administrador (esto es solo para fines de demostración)
const adminPassword = "admin123";
