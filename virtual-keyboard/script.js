const renderLayout = () => {
  const main = document.createElement('main');
  main.classList.add('main');

  const textfield = document.createElement('textarea');
  textfield.classList.add('textfield');
  main.append(textfield);

  const keyboard = document.createElement('keyboard');
  keyboard.classList.add('keyboard');
  main.append(keyboard);

  document.body.append(main);
};
renderLayout();

class Key {
  constructor(lang, value, shiftValue, isServiceKey) {
    this.lang = lang;
    this.value = value;
    this.shiftValue = shiftValue;
    this.isServiceKey = isServiceKey;
  }
}

const renderKeys = () => {
  const arrayOfKeysEN = ['EN',
    [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace']],
    [['Tab'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', ''], ['u'], ['i'], ['o'], ['p'], ['['], [']'], ['\\'], ['Del']],
    [['Caps Lock'], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';'], ['\''], ['Enter']],
    [['Shift'], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [','], ['.'], ['/'], ['▲'], ['Shift']],
    [['Ctrl'], ['Win'], ['Alt'], ['Space'], ['Alt'], ['◄'], ['▼'], ['►'], ['Ctrl']]];

  const arrayOfKeysRU = ['RU',
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
    ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']];

  const arrayOfKeys = [arrayOfKeysEN];

  const keyboard = document.querySelector('keyboard');
  for (let i = 0; i < arrayOfKeys.length; i += 1) {
    for (let j = 1; j < arrayOfKeys[i].length; j += 1) {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard__row');
      for (let k = 0; k < arrayOfKeys[i][j].length; k += 1) {
        const key = document.createElement('div');
        key.classList.add('keyboard__key');
        // key.innerHTML = arrayOfKeys[i][j][k];
        keyboardRow.append(key);
      }
      keyboard.append(keyboardRow);
    }
  }
};

renderKeys();

const zzz = document.createElement('div');
zzz.classList.add('keyboard__key');
document.body.append(zzz);

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyZ') {
    zzz.classList.add('zzz');
    zzz.innerText = e.key;
    const textfield = document.querySelector('textarea');
    textfield.value += e.key;
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyZ') {
    zzz.classList.remove('zzz');
    zzz.innerText = '';
  }
});
