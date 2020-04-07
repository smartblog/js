var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var interval = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

var primersCount = 20;
var primers = [];

var mainIndex = 1;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addPrimer(index) {
  var num1 = getRandomInt(10);
  var num2 = getRandomInt(10);

  var primer = [num1, num2, num1*num2];
  primers.push(primer);

  var ele = document.createElement("div");
  ele.id = `primer-${index}`;
  ele.className = "column is-3 flex"
  ele.innerHTML = `<h4>Пример ${index}</h4>
                    <p id="p-${index}">
                      <span>${num1}</span><span> * </span><span>${num2}</span><span> = </span>
                      <input id="answer-${index}" type="number">
                    </p>`;

  mainIndex += 1;
  document.getElementById("main").appendChild(ele);

  console.log(primer)
  console.log(primers)
  console.log(mainIndex)
}

function generatePrimers(count) {
  var i;

  for (i = 0; i < count; i++) {
    addPrimer(i + 1);
  }
}

generatePrimers(primersCount);

function checkPrimers() {
  clearInterval(interval);
  var answers = [];
  var answer;
  var j;

  var trues = 0;
  var falses = 0;

  for (j = 0; j < primersCount; j++) {
    answer = parseFloat(document.getElementById(`answer-${j+1}`).value);
    answers.push(answer);

    console.log(answer === primers[j][2]);

    if (answer === primers[j][2]) {
      var checkEle = document.createElement("span");
      checkEle.className = "green"
      checkEle.innerHTML = "Правильно";
      console.log(document.getElementById(`answer-${j+1}`));
      document.getElementById(`p-${j+1}`).appendChild(checkEle);
      trues += 1;
    } else {
      var checkEle = document.createElement("span");
      checkEle.className = "red"
      checkEle.innerHTML = "Ошибка";
      console.log(document.getElementById(`answer-${j+1}`));
      document.getElementById(`p-${j+1}`).appendChild(checkEle);
      falses += 1;
    }
  }

  var resultEle = document.createElement("div");
  resultEle.id = "result";
  resultEle.innerHTML = `<p>РЕЗУЛЬТАТ</p>
                          <p class="green">Правильно: ${trues}</p>
                          <p class="red">Ошибок: ${falses}</p>
                          <p>Время: ${totalSeconds} секунд</p>`

  document.getElementById("results").appendChild(resultEle);

  localStorage.setItem('player', totalSeconds);

  console.log(localStorage.getItem('player'))

  // primers.forEach(element => console.log(element));
  // answers.forEach(element => console.log(element));
}







