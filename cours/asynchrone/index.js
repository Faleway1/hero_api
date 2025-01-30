async function loadData() {
  const res = await fetch("https://yesno.wtf/api");
  const data = await res.json();
  console.log(data);
}

fetch("https://yesno.wtf/api")
.then((res) => res.json())
.then((data) => console.log(data));

// EQUIVALENT !!!!!

loadData();

// ...
// ...
// ...
// ...
// ...

const res = await fetch("https://yesno.wtf/api");
const data = await res.json();
console.log(data);
