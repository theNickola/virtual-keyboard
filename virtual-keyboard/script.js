class Key {
  constructor(code, value, valueShift, type) {
    this.code = code;
    this.value = value;
    this.valueShift = valueShift;
    this.type = type;
  }
}

const JsonURLKeys = 'assets/keys.json';
const requestKeys = new XMLHttpRequest();
let keys;

(() => {
  requestKeys.open('get', JsonURLKeys, true);
  requestKeys.send();
})();

requestKeys.onload = () => {
  keys = JSON.parse(requestKeys.responseText);

  const main = document.createElement('main');
  main.classList.add('main');

  const textfield = document.createElement('textarea');
  textfield.classList.add('textfield');
  main.append(textfield);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  for (let i = 1; i < 6; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    const oneRowKeys = keys.filter((e) => e.row === i);
    for (let j = 0; j < oneRowKeys.length; j += 1) {
      const key = document.createElement('div');
      key.classList.add('keyboard__key');
      switch (oneRowKeys[j].size) {
        case 's': key.classList.add('keyboard__key_size_s'); break;
        case 'm': key.classList.add('keyboard__key_size_m'); break;
        case 'l': key.classList.add('keyboard__key_size_l'); break;
        case 'xl': key.classList.add('keyboard__key_size_xl'); break;
        case 'xxl': key.classList.add('keyboard__key_size_xxl'); break;
        default: break;
      }
      //TODO: implement to adding current language
      key.innerHTML = oneRowKeys[j].code;
      keyboardRow.append(key);
    }
    keyboard.append(keyboardRow);
  }

  main.append(keyboard);

  document.body.append(main);

  const zzz = document.createElement('span');
  zzz.classList.add('keyboard__key', 'keyboard__key_size_s');
  zzz.id = 'KeyZ';
  zzz.innerText = 'z';
  document.body.append(zzz);

  textfield.addEventListener('keydown', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    const currentBtn = document.getElementById(e.code);
    if (currentBtn) {
      currentBtn.classList.add('keyboard__key_active');
      textfield.setRangeText(e.key, textfield.selectionStart, textfield.selectionStart, 'end');
    }
  });
  document.addEventListener('keyup', (e) => {
    const currentBtn = document.getElementById(e.code);
    if (currentBtn) {
      currentBtn.classList.remove('keyboard__key_active');
    }
  });

  zzz.addEventListener('mousedown', (e) => {
    const currentBtn = e.target;
    currentBtn.classList.add('keyboard__key_active');
    textfield.setRangeText(
      currentBtn.innerText,
      textfield.selectionStart,
      textfield.selectionStart,
    );

    textfield.selectionStart += currentBtn.innerText.length;
    textfield.focus();
  });
  zzz.addEventListener('mouseup', (e) => {
    const currentBtn = e.target;
    currentBtn.classList.remove('keyboard__key_active');
  });
};

const arrayOfKeysEN = [
  [['Backquote', '`', '~', 'sym'], ['Digit1', '1', '!', 'dig'], ['Digit2', '2', '@', 'dig'], ['Digit3', '3', '#', 'dig'], ['Digit4', '4', '$', 'dig'], ['Digit5', '5', '%', 'dig'], ['Digit6', '6', '^', 'dig'], ['Digit7', '7', '&', 'dig'], ['Digit8', '8', '*', 'dig'], ['Digit9', '9', '(', 'dig'], ['Digit0', '0', ')', 'dig'], ['-', '_'], ['=', '+'], ['Backspace']],
  [['Tab'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', ''], ['u'], ['i'], ['o'], ['p'], ['['], [']'], ['\\'], ['Del']],
  [['Caps Lock'], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';'], ['\''], ['Enter']],
  [['Shift'], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [','], ['.'], ['/'], ['▲'], ['Shift']],
  [['Ctrl'], ['Win'], ['Alt'], ['Space'], ['Alt'], ['◄'], ['▼'], ['►'], ['Ctrl']]];

// const renderKeys = () => {
//   const arrayOfKeysRU = ['RU',
//     ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
//     ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
//     ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
//     ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
//     ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']];

//   const arrayOfKeys = [arrayOfKeysEN];

//   const keyboard = document.querySelector('keyboard');
//   for (let i = 0; i < arrayOfKeys.length; i += 1) {
//     for (let j = 1; j < arrayOfKeys[i].length; j += 1) {
//       const keyboardRow = document.createElement('div');
//       keyboardRow.classList.add('keyboard__row');
//       for (let k = 0; k < arrayOfKeys[i][j].length; k += 1) {
//         const key = document.createElement('div');
//         key.classList.add('keyboard__key', 'keyboard__key_size_s');
//         // key.innerHTML = arrayOfKeys[i][j][k];
//         keyboardRow.append(key);
//       }
//       keyboard.append(keyboardRow);
//     }
//   }
// };

// renderKeys();
