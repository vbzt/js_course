const higherNum = (num1, num2) => (num1 > num2 ? num1 : num2);
console.log(higherNum(100, 200));

// -=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const ePaisagem = (width, heigth) =>
  width > heigth ? "Modo paisagem" : "Modo retrato";
console.log(ePaisagem(1920, 1080));

// -=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const fizzBuzz = (num) => {
  if (typeof num !== "number") return;
  if (num % 5 === 0 && num % 3 === 0) return "FizzBuzz";
  if (num % 5 === 0) return "Buzz";
  if (num % 3 === 0) return "Fizz";
  return num;
};

for (let i = 0; i <= 1; i++) {
  console.log(`${i} - ${fizzBuzz(i)}`);
}

// -=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
