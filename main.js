let members = [
  {
    id: 1,
    name: "가",
  },
  {
    id: 2,
    name: "나",
  },
  {
    id: 3,
    name: "다",
  },
  {
    id: 4,
    name: "라",
  },
  {
    id: 5,
    name: "마",
  },
  {
    id: 6,
    name: "바",
  },
  {
    id: 7,
    name: "사",
  },
  {
    id: 8,
    name: "아",
  },
  {
    id: 9,
    name: "자",
  },
  {
    id: 10,
    name: "차",
  },
  {
    id: 11,
    name: "카",
  },
];

let withoutHost = [...members];

const developers = document.querySelector(".developers");
const hosts = document.querySelectorAll(".host");

let twoHosts = new Array(hosts.length).fill(null);

//* DIV > IMG (SELECT)
for (let i = 0; i < members.length; i++) {
  let elDiv = document.createElement("div");
  let elImg = document.createElement("img");

  elDiv.classList.add("developer", `developer${[i]}`, "list");
  elImg.setAttribute("src", `./images/hero${members[i].id}.png`);
  elImg.setAttribute("alt", `${members[i].name}`);

  developers.appendChild(elDiv);
  elDiv.appendChild(elImg);

  document
    .querySelector(`.developer${i}`)
    .addEventListener("click", (e) => onClickHandler(e));
}

//* DIV & IMG onClick EVENT Handler / add Img
function onClickHandler(e) {
  if (
    twoHosts.findIndex((el) => el !== null && el.name === e.target.alt) !==
      -1 ||
    twoHosts.every((el) => el !== null)
  )
    return;

  let elImg = document.createElement("img");

  if (e.target.src) {
    elImg.setAttribute("src", e.target.src);
    elImg.setAttribute("alt", e.target.alt);
    e.target.parentNode.classList.add("picked");
  } else if (e.target.classList[2] === "list") {
    elImg.setAttribute("src", e.target.children[0].src);
    elImg.setAttribute("alt", e.target.children[0].alt);
    e.target.classList.add("picked");
  }

  let index = withoutHost.findIndex((el) => el.name === elImg.alt);
  if (index === -1) return;

  for (let i = 0; i < hosts.length; i++) {
    if (hosts[i].children.length === 0) {
      elImg.addEventListener("click", (e) => deleteHandler(e));
      hosts[i].classList.add("on");
      twoHosts.splice(i, 1, withoutHost.splice(index, 1)[0]);
      return hosts[i].appendChild(elImg);
    }
  }

  return;
}

//* DIV & IMG onClick EVENT Handler / Delete Img

function deleteHandler(e) {
  const picked = document.querySelectorAll(".picked");
  console.log(picked);
  if (e.target.classList[1] === "delete") {
    for (let i = hosts.length - 1; i >= 0; i--) {
      if (hosts[i].children.length !== 0) {
        for (let el of picked) {
          if (el.children[0].alt === hosts[i].firstChild.alt) {
            el.classList.remove("picked");
          }
        }
        withoutHost.push(twoHosts.splice(i, 1, null)[0]);

        hosts[i].classList.remove("on");
        hosts[i].removeChild(hosts[i].firstChild);
        break;
      }
    }
  } else if (e.target.src) {
    for (let el of picked) {
      if (el.children[0].alt === e.target.alt) {
        el.classList.remove("picked");
      }
    }
    let removed = twoHosts.findIndex(
      (el) => el !== null && el.name === e.target.alt
    );

    withoutHost.push(twoHosts.splice(removed, 1, null)[0]);
    e.target.parentNode.classList.remove("on");
    e.target.parentNode.removeChild(e.target);
  }
}

const deleteDiv = document.createElement("div");
deleteDiv.classList.add("developer", "delete");
developers.appendChild(deleteDiv);
deleteDiv.addEventListener("click", (e) => deleteHandler(e));

//* MAKING TEAM-MEMBERS TAG

const team1Member = document.querySelector(".team1-members");
const team2Member = document.querySelector(".team2-members");
let membersWithoutHost = members.length - hosts.length;

for (let i = 0; i < membersWithoutHost; i++) {
  const elDiv = document.createElement("div");
  if (i < Math.ceil(membersWithoutHost / 2)) {
    elDiv.classList.add("developer", "team1-member", `members${i}`);
    team1Member.appendChild(elDiv);
  } else {
    elDiv.classList.add(
      "developer",
      "team2-member",
      `members${i - Math.ceil(membersWithoutHost / 2)}`
    );
    team2Member.appendChild(elDiv);
  }
}

//* GET TEAM MEMBER

//* BUTTON ONCLICK
const goButton = document.querySelector(".select-btn");
const buttonBack = document.querySelector(".btn-back");
const lists = document.querySelectorAll(".list");

goButton.addEventListener("click", () => buttonClickHandler());

function removeClass(count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lists[count].style.backgroundColor = "#555";
    }, 200);
  });
}

function startSelecting(deleteChild) {
  return new Promise((resolve, reject) => {
    deleteChild.style.transition = `opacity ${1.5}s`;
    deleteChild.style.opacity = 0;
    let count = 0;
    let interval = setInterval(() => {
      if (count === lists.length * 5) {
        lists[lists.length - 1].style.backgroundColor = "#555";
        developers.removeChild(deleteChild);
        clearInterval(interval);
        resolve(true);
      } else {
        lists[count % lists.length].style.backgroundColor = "#fff";
        lists[count % lists.length].style.border = "3px solid #555";
        lists[count % lists.length].style.transition = "0.08s";
      }

      if (count > 0) {
        if (count % lists.length === 0) {
          lists[lists.length - 1].style.backgroundColor = "#555";
        } else {
          lists[(count % lists.length) - 1].style.backgroundColor = "#555";
        }
      }
      count = count + 1;
    }, 100);
  });
}

function popDeleteDiv() {
  return new Promise((resolve, reject) => {
    goButton.style.transition = `opacity ${0.5}s ease-out`;
    goButton.style.opacity = 0;
    buttonBack.classList.add("trans");
    let count = 1;
    let interval = setInterval(() => {
      if (count === 6) {
        //* DIVIDE
        withoutHost = withoutHost.sort(() => Math.random() - Math.random());
        console.log(withoutHost);
        clearInterval(interval);
        resolve(true);
      }
      if (count % 2 === 1) {
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.backgroundColor = "#f5df4d";
        }
      } else {
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.backgroundColor = "#555";
        }
      }
      count++;
    }, 500);
  });
}

const team1MemberList = document.querySelectorAll(".team1-member");
const team2MemberList = document.querySelectorAll(".team2-member");

function joinTeam() {
  return new Promise((resolve, reject) => {
    // let interval = setInterval(() => {
    //   if (count === withoutHost.length) {
    //     clearInterval(interval)
    //     resolve(true)
    //   }

    let i = 0;

    let interval = setInterval(() => {
      let member = withoutHost[i];
      const elImg = document.createElement("img");
      const elImg2 = document.createElement("img");
      for (let j = 0; j < lists.length; j++) {
        if (buttonBack.children.length !== 0) {
          buttonBack.removeChild(buttonBack.children[0]);
        }
        if (member.name === lists[j].children[0].alt) {
          let selection = lists[j].children[0];
          elImg.setAttribute("src", selection.src);
          elImg.setAttribute("alt", selection.alt);
          elImg2.setAttribute("src", selection.src);
          elImg2.setAttribute("alt", selection.alt);
          let copied = elImg;
          if (i % 2 === 0) {
            lists[j].style.backgroundColor = "red";
            buttonBack.style.backgroundColor = "red";
            buttonBack.style.transition = "none";
            team1MemberList[i / 2].style.backgroundColor = "red";
            team1MemberList[i / 2].style.transform = "none";
            buttonBack.appendChild(elImg2);
            team1MemberList[i / 2].appendChild(elImg);
            break;
          } else if (i % 2 === 1) {
            lists[j].style.backgroundColor = "blue";
            buttonBack.style.backgroundColor = "blue";
            buttonBack.style.transition = "none";
            buttonBack.appendChild(elImg2);
            team2MemberList[parseInt((i + 1) / 2) - 1].style.backgroundColor =
              "blue";
            team2MemberList[parseInt((i + 1) / 2) - 1].style.transform = "none";
            team2MemberList[parseInt((i + 1) / 2) - 1].appendChild(elImg);
            break;
          }
        }
        if (i === withoutHost.length - hosts.length + 1) {
          clearInterval(interval);
          resolve(true);
        }
      }
      i++;
    }, 500);
  });
}

function disapper() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      developers.style.transition = `opacity ${0.5}s ease-in`;
      developers.style.opacity = 0;
      buttonBack.style.transition = `opacity ${0.5}s ease-in`;
      buttonBack.style.opacity = 0;
      resolve(true);
    }, 500);
  });
}

function transformation(selectWrapper) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      selectWrapper.style.transform = `translate(${0}, -${20}rem)`;
      selectWrapper.style.transition = `all ${1.3}s ease-in-out`;
    }, 800);
  });
}

async function buttonClickHandler() {
  if (members.length - withoutHost.length === 0) {
    return alert("HOST를 뽑아주세요!");
  } else if (members.length - withoutHost.length === 1) {
    return alert("HOST를 두 명 뽑아주셔야 해요!");
  }
  const deleteChild = document.querySelector(".delete");
  const selectWrapper = document.querySelector(".select-wrapper");
  await startSelecting(deleteChild);
  await popDeleteDiv();
  await joinTeam();
  await disapper();
  await transformation(selectWrapper);
}
