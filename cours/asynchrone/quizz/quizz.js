function waitForAnswer(timeLimit) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Temps écoulé !");
    }, timeLimit);

    document.querySelector("#submit").onclick = () => {
      const answer = document.querySelector("#answer").value;
      resolve(answer);
    };
  });
}

waitForAnswer(5000)
  .then((answer) => {
    if (answer.trim().toLowerCase() === "paris") {
      document.querySelector("#result").textContent = "Bonne réponse !";
    } else {
      document.querySelector("#result").textContent = "Mauvaise réponse.";
    }
  })
  .catch((error) => {
    document.querySelector("#result").textContent = error;
  })
  .finally(() => {
    document.querySelector("input").disabled = true;
    document.querySelector("button").disabled = true;
  })