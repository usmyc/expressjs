async function getUser() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();

    document.getElementById("list").innerHTML = data.peoples.map(
      (people) => `
      <li>
        ${people.name}
        ${people.adress}
        <button class="border border-fuchsia-800 m-8" id="delete" onclick="deleteHandler(${people.id})">Delete</button>
      </li>
      `
    );
  } catch (err) {
    console.log(err);
  }
}

getUser();

const button = document.getElementById("button");

button.onclick = () => {
  const user = document.getElementById("username").value;
  const adress = document.getElementById("adress").value;
  const id = Math.floor(Math.random() * 1000);
  const data = { id: id, name: user, adress: adress };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("/", options);
};

const deleteHandler = (e) => {
  const data = { id: e };
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("/", options);
  window.location.reload();
};
