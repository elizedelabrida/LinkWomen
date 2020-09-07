// Definine carousel skip time
$("#carousel-events").carousel({
  interval: 2000,
});

// Define carousel cards quantity
$(".carousel .carousel-item").each(function () {
  let next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));
  if ($(window).innerWidth() >= 768) {
    for (let i = 0; i < 2; i++) {
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }

      next.children(":first-child").clone().appendTo($(this));
    }
  }
});

function handleLogout() {
  localStorage.removeItem("linkwomen:userId");
  localStorage.removeItem("linkwomen:token");
  localStorage.removeItem("linkwomen:discudiscussionIdssionId");

  location.href="login.html"; 
}
