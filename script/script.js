class Calculator {
  constructor() {
    this.upperValue = document.querySelector("#upper-number");
    this.resultValue = document.querySelector("#result-number");
    this.reset = 0;
  }

  clearValues() {
    this.upperValue.textContent = 0;
    this.resultValue.textContent = 0;
  }

  checkLastDigit(input, upperValue, reg) {
    if (
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    ) {
      return true;
    } else {
      return false;
    }
  }

  // metodo de soma
  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
  }

  // metodo de subtracao
  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
  }

  // metodo de multiplicacao
  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2);
  }

  // metodo de divisao
  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2);
  }

  // atualiza valores
  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }

  // resolve a operacao
  resolution() {
    // explode uma string em um array
    let upperValueArray = this.upperValue.textContent.split(" ");
    // resultado da operacao
    let result = 0;

    for (let i = 0; i <= upperValueArray.length; i++) {
      let operation = 0;
      let actualItem = upperValueArray[i];

      // faz a multiplicacao
      if (actualItem == "x") {
        result = calc.multiplication(
          upperValueArray[i - 1],
          upperValueArray[i + 1]
        );
        operation = 1;
        // faz a divisao
      } else if (actualItem == "/") {
        result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
        // checa se o array tem multiplicacao e divisao a ser feita
      } else if (
        !upperValueArray.includes("x") &&
        !upperValueArray.includes("/")
      ) {
        // soma subtracao
        if (actualItem == "+") {
          result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
          operation = 1;
        } else if (actualItem == "-") {
          result = calc.subtraction(
            upperValueArray[i - 1],
            upperValueArray[i + 1]
          );
          operation = 1;
        }
      }

      // atualiza valores do array para proxima iteracao
      if (operation) {
        // indice anterior no resultado da operacao
        upperValueArray[i - 1] = result;
        // remove os itens ja utilizados para a operacao
        upperValueArray.splice(i, 2);
        // atualizar o valor do indice
        i = 0;
      }
    }

    if (result) {
      calc.reset = 1;
    }

    // atualizar os totais
    calc.refreshValues(result);
  }

  btnPress() {
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;
    // verificar se tem so numeros
    var reg = new RegExp("^\\d+$");

    // se precisar resetar limpa o display
    if (calc.reset && reg.test(input)) {
      upperValue = "0";
    }

    // limpa a prop de reset
    calc.reset = 0;

    // ativa metodo de limpar o display
    if (input == "AC") {
      calc.clearValues();
    } else if (input == "=") {
      calc.resolution();
    } else {
      // checa se precis adicionar ou nao
      if (calc.checkLastDigit(input, upperValue, reg)) {
        return false;
      }

      // adiciona espacos aos operadores
      if (!reg.test(input)) {
        input = ` ${input} `;
      }

      if (upperValue == "0") {
        if (reg.test(input)) {
          calc.upperValue.textContent = input;
        }
      } else {
        calc.upperValue.textContent += input;
      }
    }
  }
}

// start obj
let calc = new Calculator();

// start btns
let buttons = document.querySelectorAll(".btn");

// map all buttons
for (let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener("click", calc.btnPress);
}
