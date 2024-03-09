function createCalculator() {
  return {
    display: document.querySelector("#display"),
    validInput: true,

    iniciate() {
      this.btnClick();
      this.keyPress();
    },

    keyPress() {
      this.display.addEventListener("keydown", (e) => {
        if (e.keyCode === 8) {
          e.preventDefault();
          this.deleteOne();
        } else if (e.keyCode === 13) {
          this.evaluate();
        }
      });
    },

    evaluate() {
      try {
        const conta = eval(this.display.value);
        if (!conta) {
          this.display.value = "Invalid expression";
          return;
        }

        this.display.value = String(conta);
      } catch (e) {
        this.display.value = "Invalid expression";
        this.validInput = false;
        return;
      }
    },

    clearDisplay() {
      this.display.value = "";
      this.validInput = true;
    },

    deleteOne() {
      this.display.value = this.display.value.slice(0, -1);
    },

    btnClick() {
      document.addEventListener("click", (e) => {
        const el = e.target;

        if (el.classList.contains("btn-num") && this.validInput == true) {
          this.display.value += el.innerText;
        }
        if (el.classList.contains("btn-num") && this.validInput == false) {
          this.clearDisplay();
          this.display.value += el.innerText;
        }

        if (el.classList.contains("btn-clear")) {
          this.clearDisplay();
        }

        if (el.classList.contains("btn-del")) {
          this.deleteOne();
        }

        if (el.classList.contains("btn-eql")) {
          this.evaluate();
        }

        this.display.focus();
      });
    },
  };
}

const calculator = createCalculator();
calculator.iniciate();
