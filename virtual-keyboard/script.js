function renderKeys() {
  const arrayOfKeysEN = ['EN',
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']];
  const arrayOfKeysRU = ['RU',
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
    ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']];

  const arrayOfKeys = [arrayOfKeysEN, arrayOfKeysRU];

  for (let i = 0; i < arrayOfKeys.length; i += 1) {
    for (let j = 1; j < arrayOfKeys[i].length; j += 1) {
      const linekey = document.createElement('div');
      for (let k = 0; k < arrayOfKeys[i][j].length; k += 1) {
        const key = document.createElement('span');
        key.innerHTML = arrayOfKeys[i][j][k];
        linekey.append(key);
      }
      document.body.append(linekey);
    }
  }
}

renderKeys();
