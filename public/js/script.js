//APlayer
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  const song = JSON.parse(aplayer.getAttribute("data-song"));
  const singer = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar,
      },
    ],
    autoplay: true,
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar");
  ap.on("play", () => {
    avatar.style.animationPlayState = "running";
  });
  ap.on("pause", () => {
    avatar.style.animationPlayState = "paused";
  });
}

// Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;

    fetch(link, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
// Favorite Song
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${idSong}`;
      fetch(link, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });
    });
  });
}
