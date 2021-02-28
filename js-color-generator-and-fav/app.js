const btnGen = document.querySelector(".btn-gen");
const btnFav = document.querySelector(".btn-fav");
const btnShow = document.querySelector(".btn-show");
const divColor = document.querySelector(".color");
const divColorSpec = document.querySelector(".colors-spec");
const divColorsContainer = document.querySelector(".colors-container");
const divBack = document.querySelector(".back");
const labelColor = document.querySelector(".color__details");
const labelClose = document.querySelector(".close-spec");

/*** FAV OBJECT */
const favColors = {
  colors: [],
  updateUI() {
    if (this.colors.length !== 0) {
      if (document.querySelector(".empty")) {
        document.querySelector(".empty").textContent = "";
      }
      /** Clear before insert */
      divColorsContainer.innerHTML = "";
      for (let [i, color] of this.colors.entries()) {
        const html = `
        <div class="spec">
          <div class="label-circle label-circle-${i}"></div>
          <label class="label" >rgb : </label>
          <input
          class="display"
          type="text"
          id = "input-${i}"
          value="${color}"
          readonly
          />
          <button class="btn-copy btn-copy-${i}">Copy</button>
        </div>
        `;
        divColorsContainer.insertAdjacentHTML("beforeend", html);
        document.querySelector(
          `.label-circle-${i}`
        ).style.backgroundColor = `rgb(${color})`;
      }
    } else {
      if (!document.querySelector(".empty")) {
        const para = document.createElement("p");
        para.textContent = "empty";
        para.classList.add("empty");
        divColorsContainer.appendChild(para);
      }
    }
  },
};

/**** POPUP Window */
const closePopUp = function () {
  divColorSpec.classList.add("hidden");
  divBack.classList.add("hidden");
};
/** PopUP */
btnShow.addEventListener("click", () => {
  favColors.updateUI();
  divBack.classList.remove("hidden");
  divColorSpec.classList.remove("hidden");
});

/*** close POP UP */
divBack.addEventListener("click", closePopUp);

labelClose.addEventListener("click", closePopUp);

/**** Color Generation */
const genColor = function () {
  return `${Math.floor(Math.random() * 255) + 1}, ${
    Math.floor(Math.random() * 255) + 1
  }, ${Math.floor(Math.random() * 255) + 1}`;
};

/*** GEN function */
btnGen.addEventListener("click", () => {
  let color = genColor();
  labelColor.textContent = `RGB: ${color}`;
  document.body.style.backgroundColor = `rgb(${color})`;
});

/****** FAV PART */
btnFav.addEventListener("click", () => {
  const color = labelColor.textContent.split(":")[1].trim();
  if (!favColors.colors.includes(color)) favColors.colors.push(color);
});

/*** Copy functionality using event delagation */
divColorsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-copy")) {
    const id = e.target.getAttribute("class").split(" ")[1].split("-")[2];
    document.getElementById(`input-${id}`).select();
    document.execCommand("Copy");
  }
});
