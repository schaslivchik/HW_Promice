"use stict";

//https://randomuser.me/api/

const options = {
  results: 5,
  page: 1,
  seed: "pe2021",
};

loadUsers(options);

function loadUsers(options) {
  fetch(
    `https://randomuser.me/api/?results=${options.results}&page=${options.page}&seed=${options.seed}`
  )
    .then((response) => response.json())
    .then(({ results }) => {
      renderUsers(results);
    })
    .catch((e) => {
      console.log("e :>> ", e);
    });
}

const [firstBtn, prevBtn, nextBtn] = document.querySelectorAll("button");
firstBtn.addEventListener("click", firstBtnHendler);
prevBtn.addEventListener("click", prevBtnHandler);
nextBtn.addEventListener("click", nextBtnHandler);

function firstBtnHendler() {
  options.page = 1;
  loadUsers(options);
  clearList();
}

function prevBtnHandler() {
  if (options.page > 1) {
    options.page -= 1;
    loadUsers(options);
    clearList();
  }
}

function nextBtnHandler() {
  options.page += 1;
  loadUsers(options);
  clearList();
}

function renderUsers(users) {
  const usersList = document.querySelector(".users-list");
  const usersListItems = users.map((u) => createUserItem(u));
  usersList.replaceChildren(...usersListItems);
  maleFemaleBg();
}

function createUserItem({
  name: { first: firstName, last: lastName },
  picture: { large: src },
  gender,
  dob: { age },
  email,
}) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("user-list-item");

  const userListItemInfoBlock = document.createElement("div");
  userListItemInfoBlock.append(
    createUserMainInfo(firstName, lastName),
    emailUser(email),
    genderUser(gender),
    ageUser(age)
  );

  userListItem.append(
    createUserImg(src, `${firstName} ${lastName}`),
    userListItemInfoBlock
  );

  userListItem.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    listActiveUsers();
  });

  return userListItem;
}

function createUserImg(src, alt) {
  const userImgEl = document.createElement("img");
  userImgEl.src = src;
  userImgEl.alt = alt;
  userImgEl.onerror = () => {
    userImgEl.src =
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
  };
  return userImgEl;
}

function createUserMainInfo(firstName, lastName) {
  const userMainInfoEl = document.createElement("p");
  userMainInfoEl.textContent = `${firstName} ${lastName}`;
  return userMainInfoEl;
}

function ageUser(age) {
  const userMainInfoElAge = document.createElement("p");
  userMainInfoElAge.textContent = `age: ${age}`;
  return userMainInfoElAge;
}

function emailUser(email) {
  const userMainInfoElEmail = document.createElement("a");
  userMainInfoElEmail.setAttribute("href", `mailto:${email}`);
  userMainInfoElEmail.textContent = email;
  return userMainInfoElEmail;
}

function genderUser(gender) {
  const userMainInfoElGender = document.createElement("p");
  userMainInfoElGender.textContent = gender;
  userMainInfoElGender.classList.add("gender");

  userMainInfoElGender.textContent === "male"
    ? userMainInfoElGender.setAttribute("data-gender", "male")
    : userMainInfoElGender.setAttribute("data-gender", "female");

  return userMainInfoElGender;
}

function maleFemaleBg() {
  const gender = document.querySelectorAll(".gender");

  gender.forEach((e) => {
    e.dataset.gender === "male"
      ? (e.closest(".user-list-item").style.backgroundColor = "#ebf4fb")
      : (e.closest(".user-list-item").style.backgroundColor = "#ebebfb");
  });
}

function listActiveUsers() {
  const listActiveUsers = document.querySelectorAll(".active");
  const activeUsers = document.querySelector(".active-users");
  let string = "";

  listActiveUsers.forEach((e) => {
    string += `${e.children[1].children[0].textContent.split(" ")[0]}, `;
  });

  activeUsers.textContent = string;
}

function clearList() {
  const activeUsers = document.querySelector(".active-users");
  activeUsers.textContent = "";
}
