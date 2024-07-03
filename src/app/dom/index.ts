const TEMP_WRAPPER_CLASS = 'temperature-scale-wrapper';

export function switchTemperature(scale: 'celsius' | 'fahrenheit') {
  const divs = document.getElementsByClassName(TEMP_WRAPPER_CLASS);
  const action = scale === 'celsius' ? 'remove' : 'add';
  for (const div of divs) div.classList[action]('show-f');
}
