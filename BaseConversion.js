var Alphabet = {
  BINARY: '01',
  OCTAL: '01234567',
  DECIMAL: '0123456789',
  HEXA_DECIMAL: '0123456789abcdef',
  ALPHA_LOWER: 'abcdefghijklmnopqrstuvwxyz',
  ALPHA_UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA_NUMERIC:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

function convert(input, source, target) {
  let baseIn = source.length;
  let baseOut = target.length;
  let result = [];
  let base10 = 0;
  let newInput = input.split('');
  let newTarget = target.split('');
  let n = newInput.length - 1;

  // Конвертирует в десятичную
  function convertTo10(arr) {
    if (baseIn === 10) {
      return (base10 = newInput);
    } else if (baseIn < 10) {
      for (let i = 0; i < newInput.length; i++) {
        let actualNumber = newInput[i] * baseIn ** (n - i);
        base10 += actualNumber;
      }
    } else {
      for (let j = 0; j < newInput.length; j++) {
        let newNum = source.indexOf(newInput[j]);
        let actualNumber = newNum * baseIn ** (n - j);
        base10 += actualNumber;
      }
    }
    return base10;
  }

  convertTo10(newInput);

  // Если финальная система не десятичная, то:
  if (baseOut != 10) {
    // Проверка на пустоту массива
    if (base10.length > 0) {
      base10 = base10.join('');
    }

    function whileLoop(base10, baseOut) {
      while (base10 > 0) {
        if (base10 % baseOut == 0) {
          result.unshift(newTarget[0]);
          base10 = Math.floor(base10 / baseOut);
        } else {
          result.unshift(newTarget[base10 % baseOut]);
          base10 = Math.floor(base10 / baseOut);
        }
      }

      return result.join('');
    }
    result = whileLoop(base10, baseOut);

    // Проверка на ноль в инпуте
    return result.length !== 0 ? result : newTarget[0];
  } else {
    base10.length > 1 ? (base10 = base10.join('')) : (base10 = String(base10));
    return base10;
  }
}

//console.log(convert('15', Alphabet.DECIMAL, Alphabet.OCTAL));
//console.log(convert('15', Alphabet.DECIMAL, Alphabet.BINARY));
//console.log(convert('1010', Alphabet.BINARY, Alphabet.DECIMAL));
//console.log(convert('1010', Alphabet.BINARY, Alphabet.HEXA_DECIMAL));
//console.log(convert('o', Alphabet.DECIMAL, Alphabet.ALPHA));
