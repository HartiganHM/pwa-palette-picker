let colorsArray = [
  { class: '.color-1', hexValue: '000000', locked: false },
  { class: '.color-2', hexValue: '000000', locked: false },
  { class: '.color-3', hexValue: '000000', locked: false },
  { class: '.color-4', hexValue: '000000', locked: false },
  { class: '.color-5', hexValue: '000000', locked: false }
];

const generateColors = (colorArray) => {
  const hexidecimalValues = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];

  const colorValues = colorsArray.map(color => {
    const hexValue = color.hexValue
      .split('')
      .map(element => {
        const randomValue = Math.floor(Math.random() * 16);
        return hexidecimalValues[randomValue];
      })
      .join('');

    color.value = `#${hexValue}`;
    return color;
  });

  applyColors(colorValues);
};

const applyColors = colorValues => {
  colorValues.forEach(color => {
    $(`${color.class}`).css('background-color', [color.value]);
    $(`${color.class}`).children()[1].innerText = `${color.value}`;
  });
};

const toggleLockIcon = event => {
  const element = event.target;

  if ($(element).hasClass('icon-lock-open')) {
    $(element)
      .removeClass('icon-lock-open')
      .addClass('icon-lock-closed');
  } else {
    $(element)
      .removeClass('icon-lock-closed')
      .addClass('icon-lock-open');
  }

  toggleColorLock(event, colorsArray)
};

const toggleColorLock = (event, colorArray) => {
  const parentColorClass = $(event.target).parent()[0].classList[1];
  console.log('boom')
}

$(document).ready(generateColors(colorsArray));
$('.generate-palette-button').click((colorsArray) => generateColors(colorsArray));
$('.lock').on('click', event => toggleLockIcon(event));
