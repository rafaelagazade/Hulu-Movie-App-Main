const filmList = document.querySelector(".body");

const search = document.querySelector(".left .search");
const searchBar = document.querySelector(".search-bar");
const closeBar = document.querySelector(".close-button");
const searchP = document.querySelector(".left ul .search p");
const clear = document.querySelector(".delete-input");
const searchInput = document.querySelector(".search-input");
const search2 = document.querySelector(".search2");

const nav = document.querySelector(".nav-bar");

const homeBtn = document.querySelector(".home");
const trendingBtn = document.querySelector(".trending");
const verifiedBtn = document.querySelector(".verified");
const collectionBtn = document.querySelector(".collection");
const searchBtn = document.querySelector(".search");
const BASE_URL = "https://image.tmdb.org/t/p/original";
const profileBtn = document.querySelector(".profile");
const BASE_URL1 = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL1 +
  "/discover/movie?77b75897bd6de248789745dbd1270fe7&&language=en-US&sort_by=popularity.desc";
profileBtn.addEventListener("click", async () => {
  try {
    // Remove local session data
    localStorage.removeItem("signData");

    // Clear session data from API (overwrites session bin with an empty array)
    const response = await fetch("https://api.jsonbin.io/v3/b/679f1129e41b4d34e482a903", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2"
      },
      body: JSON.stringify({ sessions: [] }) // Clear all session data
    });

    if (response.ok) {
      console.log("User logged out. Session data cleared.");
    } else {
      console.error("Failed to clear session data.");
    }
  } catch (error) {
    console.error("Error clearing session:", error);
  }

  // Redirect to login page after logout
  window.location.href = "https://hulu-movie-app-log.vercel.app/";
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// Step 1: Define the getSessionData function
async function getSessionData() {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/679f1129e41b4d34e482a903", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2",  // Replace with your actual Master Key
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session data.");
    }

    const data = await response.json();
    return data.record.sessions; // Adjust based on how your JSONBin structure looks
  } catch (error) {
    console.error("Error fetching session data:", error);
    return null;
  }
}

// Step 2: Define the getUserData function
async function getUserData() {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/679ef92dad19ca34f8f85e47", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$4iItJb8RzVJsw8nIJCh3B.eRCXyjjXxJC2zxmhmaRVZsaHxuw8TO2",  // Replace with your actual Master Key
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const data = await response.json();
    return data.record.users;  // Adjust based on the structure of your user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Step 3: Main page load logic
window.addEventListener("load", async () => {
  try {
    // Fetch session data and user data
    const sessionData = await getSessionData();
    const usersList = await getUserData();

    if (!sessionData || sessionData.length === 0) {
      console.log("No active session found.");
      // Optionally redirect to the login page if no session
       window.location.href = "https://hulu-movie-app-log.vercel.app/";
      return;
    }

    if (!usersList || usersList.length === 0) {
      console.error("No users found in the database.");
       window.location.href = "https://hulu-movie-app-log.vercel.app/"; // Redirect if no users
      return;
    }

    // Extract session emails
    const sessionEmails = sessionData.map(session => session.email);

    // Check if any session email exists in the users list
    const validSession = usersList.some(user => sessionEmails.includes(user.email));

    if (validSession) {
      console.log("User session verified. Staying on the main page.");
    } else {
      console.log("Session does not match any user. Redirecting to login...");
       window.location.href = "https://hulu-movie-app-log.vercel.app/";
    }
  } catch (error) {
    console.error("Error during page load:", error);
     window.location.href = "https://hulu-movie-app-log.vercel.app/"; // Redirect on error
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

const xs = window.matchMedia("(max-width: 320px)");
const x = window.matchMedia("(max-width: 375px)");
const M = window.matchMedia("(max-width: 425px)");
const L = window.matchMedia("(max-width: 768px)");
const XL = window.matchMedia("(max-width: 1024px)");

search.onclick = () => {
  search.classList.add("active");
  setTimeout(() => {
    search.style.display = "none";
    search2.style.display = "block";
  }, 300);
  setTimeout(() => {
    searchBar.classList.add("active");
  }, 300);
  setTimeout(() => {
    closeBar.classList.add("active");
  }, 300);
  setTimeout(() => {
    clear.style.display = "block";
  }, 300);
  searchP.style.display = "none";
  if (xs.matches) {
    nav.style.margin = "310px 0 0 22px ";
    filmList.style.margin = "400px 0 0 2px";
  } else if (x.matches) {
    nav.style.margin = "310px 0 0 22px ";
    filmList.style.margin = "400px 0 0 2px";
  } else if (M.matches) {
    nav.style.margin = "330px 0 0 60px ";
    filmList.style.margin = "420px 0 0 2px";
  } else if (L.matches) {
    nav.style.margin = "290px 0 0 60px ";
  } else if (XL.matches) {
    nav.style.margin = "290px 0 0 60px ";
  }
};

closeBar.addEventListener("click", () => {
  searchBar.classList.remove("active");
  closeBar.classList.remove("active");
  setTimeout(() => {
    search.classList.remove("active");
  }, 10);
  search2.style.display = "none";
  searchP.style.display = "flex";
  search.style.display = "block";
  clear.style.display = "none";
  if (xs.matches) {
    nav.style.margin = "250px 0 0 22px ";
    filmList.style.margin = "400px 0 0 2px";
  } else if (x.matches) {
    nav.style.margin = "250px 0 0 22px ";
    filmList.style.margin = "400px 0 0 2px";
  } else if (M.matches) {
    nav.style.margin = "250px 0 0 60px ";
    filmList.style.margin = "350px 0 0 2px";
  } else if (L.matches) {
    nav.style.margin = "250px 0 0 60px ";
  } else if (XL.matches) {
    nav.style.margin = "250px 0 0 60px ";
  }
});

clear.onclick = () => {
  searchInput.value = "";
};

search2.addEventListener("click", () => {
  let searchInputTxt = document.querySelector(".search-input").value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=${searchInputTxt}`
  )
    .then((res) => res.json())
    .then((data) => {
      filmList.innerHTML = "";
      let containers = "";
      if (data.results) {
        data.results.forEach((film) => {
          containers += ` <div class="box">
                <div class="box-front">
                    <div class="movie-image">
                        <img src="${
                          film.backdrop_path
                            ? BASE_URL + film.poster_path
                            : "https://media.istockphoto.com/id/1302499179/vector/realistic-3d-film-strip-cinema-on-blue-background-with-place-for-text-modern-3d-isometric.jpg?s=170667a&w=0&k=20&c=CGZ5GHaIc6fZhZbE0Fp9hXQUNhBMh4YLlqmw-aQTURY="
                        }" alt="">
                    </div>
                    <div class="movie-name">
                        <p>${film.original_title}</p>
                    </div>
                </div>
                <div class="box-back">
                    <div class="movie-name">
                        <p>${film.title}</p>
                    </div>
                    <div class="movie-info">
                        ${film.overview}
                    </div>
                    <div class="view-date">

                        <div class="movie-view">
                            <i class="fa-solid fa-eye"></i>
                            <p class="view-number">${film.popularity}</p>
                        </div>

                        <div class="movie-date">
                            Date/<p class="date-value">${film.release_date}</p> 
                        </div>

                    </div>
                    <div class="watch-now">
                        <div class="button">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </div> `;
        });
      } else {
        containers = "Sorry , we didn't findy any  !";
      }
      filmList.innerHTML = containers;

      const box = document.querySelectorAll(".box");

      let i = true;
      box.forEach((item) => {
        item.addEventListener("click", () => {
          console.log(item.children);
          const boxFront = item.children[0];
          const boxBack = item.children[1];

          boxFront.classList.toggle("box-flipped");
          boxBack.classList.toggle("box-flipped3");
        });
      });
    });
});

//----------------------------//

const navBar = document.querySelectorAll(".nav-bar div");

navBar.forEach((item) => {
  item.addEventListener("click", () => {
    navBar.forEach((item2) => {
      item2.classList.remove("active");
    });
    item.classList.add("active");
  });
});

const allLi = document.querySelectorAll(".left ul li");

allLi.forEach((item) => {
  let i = true;
  item.addEventListener("click", () => {
    allLi.forEach((item2) => {
      item2.children[2].classList.remove("active");
      // searchBar.classList.remove("active");
      // clear.style.display = "none";
      // closeBar.classList.remove("active");
      // search2.style.display = "none";
      // search.style.display = "block";
    });
    item.children[2].classList.add("active");
    item.children[0].addEventListener("click", () => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=all`
      )
        .then((res) => res.json())
        .then((data) => {
          filmList.innerHTML = "";
          let containers = "";
          if (data.results) {
            data.results.forEach((film) => {
              containers += ` <div class="box">
                <div class="box-front">
                    <div class="movie-image">
                        <img src="${
                          film.backdrop_path
                            ? BASE_URL + film.poster_path
                            : "https://media.istockphoto.com/id/1302499179/vector/realistic-3d-film-strip-cinema-on-blue-background-with-place-for-text-modern-3d-isometric.jpg?s=170667a&w=0&k=20&c=CGZ5GHaIc6fZhZbE0Fp9hXQUNhBMh4YLlqmw-aQTURY="
                        }" alt="">
                    </div>
                    <div class="movie-name">
                        <p>${film.original_title}</p>
                    </div>
                </div>
                <div class="box-back">
                    <div class="movie-name">
                        <p>${film.title ? film.title : "not found"}</p>
                    </div>
                    <div class="movie-info">
                        ${film.overview}
                    </div>
                    <div class="view-date">

                        <div class="movie-view">
                            <i class="fa-solid fa-eye"></i>
                            <p class="view-number">${film.popularity}</p>
                        </div>
                        <div class="movie-date">
                            <pre>Date </pre>/<pre class="date-value"> ${
                              film.release_date
                            }</pre> 
                        </div>

                    </div>
                    <div class="watch-now">
                        <div class="button">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </div> `;
            });
          } else {
            containers = "Sorry , we didn't findy any  !";
          }
          filmList.innerHTML = containers;

          const box = document.querySelectorAll(".box");

          let i = true;
          box.forEach((item) => {
            item.addEventListener("click", () => {
              console.log(item.children);
              const boxFront = item.children[0];
              const boxBack = item.children[1];

              boxFront.classList.toggle("box-flipped");
              boxBack.classList.toggle("box-flipped3");
            });
          });
        });
    });
    item.children[1].addEventListener("click", () => {});
    item.children[2].addEventListener("click", () => {});
    item.children[3].addEventListener("click", () => {});
    //
    //
    //
    // let containers = "";
    // filmList.innerHTML = "";
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=${navValue}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.results) {
    //       data.results.forEach((film) => {
    //         containers += ` <div class="box">
    //             <div class="box-front">
    //                 <div class="movie-image">
    //                     <img src="${
    //                       film.backdrop_path
    //                         ? BASE_URL + film.poster_path
    //                         : "https://media.istockphoto.com/id/1302499179/vector/realistic-3d-film-strip-cinema-on-blue-background-with-place-for-text-modern-3d-isometric.jpg?s=170667a&w=0&k=20&c=CGZ5GHaIc6fZhZbE0Fp9hXQUNhBMh4YLlqmw-aQTURY="
    //                     }" alt="">
    //                 </div>
    //                 <div class="movie-name">
    //                     <p>${film.original_title}</p>
    //                 </div>
    //             </div>
    //             <div class="box-back">
    //                 <div class="movie-name">
    //                     <p>${film.title}</p>
    //                 </div>
    //                 <div class="movie-info">
    //                     ${film.overview}
    //                 </div>
    //                 <div class="view-date">

    //                     <div class="movie-view">
    //                         <i class="fa-solid fa-eye"></i>
    //                         <p class="view-number">${film.popularity}</p>
    //                     </div>

    //                     <div class="movie-date">
    //                         <pre>Date </pre>/<pre class="date-value"> ${
    //                           film.release_date
    //                         }</pre>
    //                     </div>

    //                 </div>
    //                 <div class="watch-now">
    //                     <div class="button">
    //                         <i class="fa-solid fa-play"></i>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div> `;
    //       });
    //     } else {
    //       containers = "Sorry , we didn't findy any  !";
    //     }
    //     filmList.innerHTML = containers;

    //     const box = document.querySelectorAll(".box");

    //     let i = true;
    //     box.forEach((item) => {
    //       item.addEventListener("click", () => {
    //         console.log(item.children);
    //         const boxFront = item.children[0];
    //         const boxBack = item.children[1];

    //         boxFront.classList.toggle("box-flipped");
    //         boxBack.classList.toggle("box-flipped3");
    //       });
    //     });
    //   });
  });
});

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
//api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
https: navBar.forEach((item3) => {
  item3.addEventListener("click", () => {
    const Value = item3.getAttribute("id");
    let containers = "";
    filmList.innerHTML = "";
    fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8&with_genres=${Value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          data.results.forEach((film) => {
            containers += ` <div class="box">
                <div class="box-front">
                    <div class="movie-image">
                        <img src="${
                          film.backdrop_path
                            ? BASE_URL + film.poster_path
                            : "https://media.istockphoto.com/id/1302499179/vector/realistic-3d-film-strip-cinema-on-blue-background-with-place-for-text-modern-3d-isometric.jpg?s=170667a&w=0&k=20&c=CGZ5GHaIc6fZhZbE0Fp9hXQUNhBMh4YLlqmw-aQTURY="
                        }" alt="">
                    </div>
                    <div class="movie-name">
                        <p>${film.original_title}</p>
                    </div>
                </div>
                <div class="box-back">
                    <div class="movie-name">
                        <p>${film.title}</p>
                    </div>
                    <div class="movie-info">
                        ${film.overview}
                    </div>
                    <div class="view-date">

                        <div class="movie-view">
                            <i class="fa-solid fa-eye"></i>
                            <p class="view-number">${film.popularity}</p>
                        </div>

                        <div class="movie-date">
                            <pre>Date </pre>/<pre class="date-value"> ${
                              film.release_date
                            }</pre> 
                        </div>

                    </div>
                    <div class="watch-now">
                        <div class="button">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </div> `;
          });
        } else {
          containers = "Sorry , we didn't findy any  !";
        }
        filmList.innerHTML = containers;

        const box = document.querySelectorAll(".box");

        let i = true;
        box.forEach((item) => {
          item.addEventListener("click", () => {
            console.log(item.children);
            const boxFront = item.children[0];
            const boxBack = item.children[1];

            boxFront.classList.toggle("box-flipped");
            boxBack.classList.toggle("box-flipped3");
          });
        });
      });
  });
});

//----------------------------//

window.addEventListener("load", () => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=77b75897bd6de248789745dbd1270fe7&query=all`
  )
    .then((res) => res.json())
    .then((data) => {
      filmList.innerHTML = "";
      let containers = "";
      if (data.results) {
        data.results.forEach((film) => {
          containers += ` <div class="box">
                <div class="box-front">
                    <div class="movie-image">
                        <img src="${
                          film.backdrop_path
                            ? BASE_URL + film.poster_path
                            : "https://media.istockphoto.com/id/1302499179/vector/realistic-3d-film-strip-cinema-on-blue-background-with-place-for-text-modern-3d-isometric.jpg?s=170667a&w=0&k=20&c=CGZ5GHaIc6fZhZbE0Fp9hXQUNhBMh4YLlqmw-aQTURY="
                        }" alt="">
                    </div>
                    <div class="movie-name">
                        <p>${film.original_title}</p>
                    </div>
                </div>
                <div class="box-back">
                    <div class="movie-name">
                        <p>${film.title ? film.title : "not found"}</p>
                    </div>
                    <div class="movie-info">
                        ${film.overview}
                    </div>
                    <div class="view-date">

                        <div class="movie-view">
                            <i class="fa-solid fa-eye"></i>
                            <p class="view-number">${film.popularity}</p>
                        </div>
                        <div class="movie-date">
                            <pre>Date </pre>/<pre class="date-value"> ${
                              film.release_date
                            }</pre> 
                        </div>

                    </div>
                    <div class="watch-now">
                        <div class="button">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </div> `;
        });
      } else {
        containers = "Sorry , we didn't findy any  !";
      }
      filmList.innerHTML = containers;

      const box = document.querySelectorAll(".box");

      let i = true;
      box.forEach((item) => {
        item.addEventListener("click", () => {
          console.log(item.children);
          const boxFront = item.children[0];
          const boxBack = item.children[1];

          boxFront.classList.toggle("box-flipped");
          boxBack.classList.toggle("box-flipped3");
        });
      });
    });
});
