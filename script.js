const display = document.getElementById('display');

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];

numbers
  .map(num => document.getElementById(`btn-${num}`))
  .map(btn => btn.addEventListener('click', () => displayInput(btn.textContent)));

operators
  .map(function (op) {
    let id = '';
    if (op === '+') {
      id = 'plus';
    } else if (op === '-') {
      id = 'minus';
    } else if (op === '*') {
      id = 'multiply';
    } else if (op === '/') {
      id = 'divide';
    }
    return { op, id };
  })
  .map(({ op, id }) =>
    document.getElementById(`btn-${id}`).addEventListener('click', () => displayInput(` ${op} `))
  );

  // 초기화
document.getElementById('btn-clear').addEventListener('click', () => {
  display.value = '';
});

// = 계산
document.getElementById('btn-equals').addEventListener('click', () => {
  display.value = calculate(display.value);
});

function displayInput(value) {
  display.value += value;
}

// 더하기, 빼기 계산
function calculate(n) {
  let inputArray = n.split(' ').filter(Boolean);

  inputArray = mulDiv(inputArray);

  const result = inputArray.reduce(function (acc, cur, idx) {
    if (cur === '+') {
      return acc + parseFloat(inputArray[idx + 1]);
    } else if (cur === '-') {
      return acc - parseFloat(inputArray[idx + 1]);
    } else {
      return acc;
    }
  }, parseFloat(inputArray[0]));

  return result;
}

// 곱, 나누기 계산
function mulDiv(inputArray) {
  return inputArray.reduce(function (acc, cur, idx, arr) {
    if (cur === '*' || cur === '/') {
      const left = parseFloat(acc.pop());
      const right = parseFloat(arr[idx + 1]);
      let result = 0;

      if (cur === '*') {
        result = left * right;
      } else if (cur === '/') {
        result = left / right;
      }

      return [...acc, result.toString()];
    }

    if (idx > 0 && (arr[idx - 1] === '*' || arr[idx - 1] === '/')) {
      return acc;
    }
    return [...acc, cur];
  }, []);
}
