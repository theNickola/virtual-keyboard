class Key {
  constructor(domElement, code, isService, value, valueShift, isLetter) {
    this.domElement = domElement;
    this.code = code;
    this.value = value;
    this.valueShift = valueShift;
    this.isLetter = isLetter;
    this.isService = isService;
  }
}
const arrayKeys = [];

if (!localStorage.lang) localStorage.lang = 'EN-en';

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

  const title = document.createElement('h1');
  title.innerText = 'RSS Виртуальная клавиатура';
  title.classList.add('title');
  main.append(title);

  const textfield = document.createElement('textarea');
  textfield.classList.add('textfield');
  main.append(textfield);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  for (let i = 1; i < 6; i += 1) {
    const keyboardRow = document.createElement('p');
    keyboardRow.classList.add('keyboard__row');
    const oneRowKeys = keys.filter((e) => e.row === i);
    for (let j = 0; j < oneRowKeys.length; j += 1) {
      const key = document.createElement('span');
      key.classList.add('keyboard__key');
      const { code, size, isService } = oneRowKeys[j];
      key.id = code;
      if (isService) key.classList.add('keyboard__key_type_service');
      switch (size) {
        case 's': key.classList.add('keyboard__key_size_s'); break;
        case 'm': key.classList.add('keyboard__key_size_m'); break;
        case 'l': key.classList.add('keyboard__key_size_l'); break;
        case 'xl': key.classList.add('keyboard__key_size_xl'); break;
        case 'xxl': key.classList.add('keyboard__key_size_xxl'); break;
        default: break;
      }
      arrayKeys.push(new Key(key, code, isService));
      keyboardRow.append(key);
    }
    keyboard.append(keyboardRow);
  }

  main.append(keyboard);

  const description = document.createElement('p');
  description.innerText = 'Клавиатура создана в операционной системе Windows';
  description.classList.add('description');
  main.append(description);

  const descriptionLang = document.createElement('p');
  descriptionLang.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
  descriptionLang.classList.add('description-lang');
  main.append(descriptionLang);

  document.body.append(main);
  textfield.focus();
};

const requestLang = new XMLHttpRequest();
const requestSwitchLang = new XMLHttpRequest();
let lang;
let isCaps = false;
let isShiftLeft = false;
let isShiftRight = false;
const pressed = new Set();
const codesForSwitchLang = ['ControlLeft', 'AltLeft'];

const switchLanguage = () => {
  requestSwitchLang.open('get', `assets/${localStorage.lang}.json`, true);
  requestSwitchLang.send();
};
requestSwitchLang.onload = () => {
  lang = JSON.parse(requestSwitchLang.responseText);

  let j = 0;
  for (let i = 0; i < arrayKeys.length; i += 1) {
    if (lang[j]) {
      const {
        code,
        value,
        valueShift,
        isLetter,
      } = lang[j];

      if (code === arrayKeys[i].code) {
        arrayKeys[i].value = value;
        arrayKeys[i].valueShift = valueShift;
        arrayKeys[i].isLetter = isLetter;
        j += 1;
      }
    }
  }

  for (let i = 0; i < arrayKeys.length; i += 1) {
    arrayKeys[i].domElement.innerText = arrayKeys[i].value;
  }
};

const loadLanguage = () => {
  requestLang.open('get', `assets/${localStorage.lang}.json`, true);
  requestLang.send();
};

requestLang.onload = () => {
  lang = JSON.parse(requestLang.responseText);

  let j = 0;
  for (let i = 0; i < arrayKeys.length; i += 1) {
    if (lang[j]) {
      const {
        code,
        value,
        valueShift,
        isLetter,
      } = lang[j];

      if (code === arrayKeys[i].code) {
        arrayKeys[i].value = value;
        arrayKeys[i].valueShift = valueShift;
        arrayKeys[i].isLetter = isLetter;
        j += 1;
      }
    }
  }

  for (let i = 0; i < arrayKeys.length; i += 1) {
    arrayKeys[i].domElement.innerText = arrayKeys[i].value;
  }

  const textfield = document.querySelector('textarea');
  textfield.addEventListener('keydown', (e) => e.preventDefault());

  const downShift = () => {
    for (let i = 0; i < arrayKeys.length; i += 1) {
      if (arrayKeys[i].isLetter) {
        if (!isCaps) {
          const shiftValue = arrayKeys[i].domElement.innerText.toUpperCase();
          arrayKeys[i].domElement.innerText = shiftValue;
        } else {
          arrayKeys[i].domElement.innerText = arrayKeys[i].value;
        }
      } else
      if (!arrayKeys[i].isService) {
        arrayKeys[i].domElement.innerText = arrayKeys[i].valueShift;
      }
    }
  };

  document.addEventListener('keydown', (e) => {
    const currentBtn = document.getElementById(e.code);
    pressed.add(e.code);
    let countKeysForSwitchLang = 0;
    for (let i = 0; i < codesForSwitchLang.length; i += 1) {
      if (pressed.has(codesForSwitchLang[i])) {
        countKeysForSwitchLang += 1;
      }
    }
    if (countKeysForSwitchLang === 2 && pressed.size === 2) {
      localStorage.lang = localStorage.lang === 'EN-en' ? 'RU-ru' : 'EN-en';
      switchLanguage();
    }
    if (currentBtn) {
      currentBtn.classList.add('keyboard__key_active');
      const isServiceCurrentBtn = keys.filter((el) => el.code === e.code)[0].isService;
      if (!isServiceCurrentBtn) {
        textfield.setRangeText(currentBtn.innerText, textfield.selectionStart, textfield.selectionStart, 'end');
      } else {
        switch (currentBtn.id) {
          case 'Tab':
            textfield.setRangeText('\t', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'Backspace':
            if (textfield.selectionStart > 0) textfield.setRangeText('', textfield.selectionStart - 1, textfield.selectionStart, 'end');
            break;
          case 'Delete':
            textfield.setRangeText('', textfield.selectionStart, textfield.selectionStart + 1, 'end');
            break;
          case 'Space':
            textfield.setRangeText(' ', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'ArrowRight':
            textfield.setRangeText('►', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'ArrowLeft':
            textfield.setRangeText('◄', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'ArrowUp':
            textfield.setRangeText('▲', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'ArrowDown':
            textfield.setRangeText('▼', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'Enter':
            textfield.setRangeText('\n', textfield.selectionStart, textfield.selectionStart, 'end');
            break;
          case 'ShiftRight':
            downShift();
            isShiftRight = true;
            break;
          case 'ShiftLeft':
            downShift();
            isShiftLeft = true;
            break;
          case 'CapsLock':
            if (isCaps) {
              for (let i = 0; i < arrayKeys.length; i += 1) {
                if (arrayKeys[i].isLetter) {
                  arrayKeys[i].domElement.innerText = arrayKeys[i].value;
                }
              }
              currentBtn.classList.remove('keyboard__key_active');
            } else {
              for (let i = 0; i < arrayKeys.length; i += 1) {
                if (arrayKeys[i].isLetter) {
                  const shiftValue = arrayKeys[i].domElement.innerText.toUpperCase();
                  arrayKeys[i].domElement.innerText = shiftValue;
                }
              }
            }
            isCaps = !isCaps;
            break;
          case 'AltLeft': e.preventDefault(); break;
          case 'AltRight': e.preventDefault(); break;
          default: break;
        }
      }
    }
  });

  const keyUp = (currentBtn) => {
    if (!currentBtn) return;
    if (isShiftLeft && currentBtn.id === 'ShiftRight') {
      document.getElementById('ShiftLeft').classList.remove('keyboard__key_active');
      isShiftLeft = false;
    }
    if (isShiftRight && currentBtn.id === 'ShiftLeft') {
      document.getElementById('ShiftRight').classList.remove('keyboard__key_active');
      isShiftRight = false;
    }
    textfield.focus();
    if (currentBtn && currentBtn.id !== 'CapsLock') {
      currentBtn.classList.remove('keyboard__key_active');
    }
    if (currentBtn.id === 'ShiftLeft' || currentBtn.id === 'ShiftRight') {
      for (let i = 0; i < arrayKeys.length; i += 1) {
        if (arrayKeys[i].isLetter) {
          if (!isCaps) {
            arrayKeys[i].domElement.innerText = arrayKeys[i].value;
          } else {
            arrayKeys[i].domElement.innerText = arrayKeys[i].value.toUpperCase();
          }
        } else
        if (!arrayKeys[i].isService && !arrayKeys[i].isLetter) {
          arrayKeys[i].domElement.innerText = arrayKeys[i].value;
        }
      }
    }
  };

  document.addEventListener('keyup', (e) => {
    const currentBtn = document.getElementById(e.code);
    keyUp(currentBtn);
    pressed.delete(e.code);
  });

  let mouseClickBtn;
  document.body.addEventListener('mousedown', (e) => {
    const currentBtn = e.target;
    if (mouseClickBtn && mouseClickBtn.id !== 'CapsLock') {
      mouseClickBtn.classList.remove('keyboard__key_active');
      if (mouseClickBtn.id.includes('Shift')) {
        if (document.getElementById('KeyQ').innerText === 'Q') {
          for (let i = 0; i < arrayKeys.length; i += 1) {
            if (arrayKeys[i].isLetter) {
              arrayKeys[i].domElement.innerText = arrayKeys[i].value;
            } else
            if (!arrayKeys[i].isService) {
              arrayKeys[i].domElement.innerText = arrayKeys[i].value;
            }
          }
        } else {
          for (let i = 0; i < arrayKeys.length; i += 1) {
            if (arrayKeys[i].isLetter) {
              const shiftValue = arrayKeys[i].domElement.innerText.toUpperCase();
              arrayKeys[i].domElement.innerText = shiftValue;
            } else
            if (!arrayKeys[i].isService) {
              arrayKeys[i].domElement.innerText = arrayKeys[i].value;
            }
          }
        }
      }
    }
    mouseClickBtn = currentBtn;
    if (currentBtn.classList.contains('keyboard__key')) {
      currentBtn.classList.add('keyboard__key_active');
      if (!currentBtn.classList.contains('keyboard__key_type_service') || currentBtn.id.includes('Arrow')) {
        const symbol = currentBtn.innerText;
        textfield.selectionEnd = textfield.selectionStart;
        textfield.setRangeText(
          symbol,
          textfield.selectionStart,
          textfield.selectionStart,
        );
        textfield.selectionStart += 1;
        textfield.focus();
      } else {
        switch (currentBtn.id) {
          case 'Tab':
            textfield.setRangeText('\t', textfield.selectionStart, textfield.selectionStart, 'end');
            textfield.selectionStart += 1;
            textfield.focus();
            break;
          case 'Backspace':
            if (textfield.selectionStart > 0) textfield.setRangeText('', textfield.selectionStart - 1, textfield.selectionStart, 'end');
            textfield.focus();
            break;
          case 'Delete':
            textfield.setRangeText('', textfield.selectionStart, textfield.selectionStart + 1, 'end');
            textfield.focus();
            break;
          case 'Space':
            textfield.setRangeText(' ', textfield.selectionStart, textfield.selectionStart, 'end');
            textfield.selectionStart += 1;
            textfield.focus();
            break;
          case 'Enter':
            textfield.setRangeText('\n', textfield.selectionStart, textfield.selectionStart, 'end');
            textfield.selectionStart += 1;
            textfield.focus();
            break;
          case 'ShiftRight':
            downShift();
            isShiftRight = true;
            break;
          case 'ShiftLeft':
            downShift();
            isShiftLeft = true;
            break;
          case 'CapsLock':
            if (isCaps) {
              for (let i = 0; i < arrayKeys.length; i += 1) {
                if (arrayKeys[i].isLetter) {
                  arrayKeys[i].domElement.innerText = arrayKeys[i].value;
                }
              }
              currentBtn.classList.remove('keyboard__key_active');
            } else {
              for (let i = 0; i < arrayKeys.length; i += 1) {
                if (arrayKeys[i].isLetter) {
                  const shiftValue = arrayKeys[i].domElement.innerText.toUpperCase();
                  arrayKeys[i].domElement.innerText = shiftValue;
                }
              }
            }
            isCaps = !isCaps;
            break;
          case 'AltLeft': e.preventDefault(); break;
          case 'AltRight': e.preventDefault(); break;
          default: break;
        }
      }
    }
  });

  document.body.addEventListener('mouseup', () => {
    keyUp(mouseClickBtn);
  });
};

loadLanguage();
