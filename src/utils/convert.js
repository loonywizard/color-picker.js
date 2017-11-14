/**
 * That function converts HSB color to RGB model
 *
 * @param hue - [0, 360]
 * @param saturation - [0, 100]
 * @param brightness - [0, 100]
 * @returns {{red: number, green: number, blue: number}}
 */
export function convertHsbToRgb(hue, saturation, brightness) {
  saturation = saturation / 100;
  brightness = brightness / 100;

  const c = brightness * saturation;
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = brightness - c;

  let red;
  let green;
  let blue;

  if (hue < 60) {
    red = c; green = x; blue = 0;
  } else if (hue < 120) {
    red = x; green = c; blue = 0;
  } else if (hue < 180) {
    red = 0; green = c; blue = x;
  } else if (hue < 240) {
    red = 0; green = x; blue = c;
  } else if (hue < 300) {
    red = x; green = 0; blue = c;
  } else {
    red = c; green = 0; blue = x;
  }

  red = (red + m) * 255;
  green = (green + m) * 255;
  blue = (blue + m) * 255;

  return {
    red: Math.round(red),
    green: Math.round(green),
    blue: Math.round(blue),
  };
}

/**
 * That function converts three RGB colors to string
 * for example: 255 183 0 --> #ff00b7
 *
 * @param red - [0, 255]
 * @param green - [0, 255]
 * @param blue - [0, 255]
 * @returns string
 */
export function convertRgbToString(red, green, blue) {
  const hexRed = red >= 16 ? red.toString(16) : '0' + red.toString(16);
  const hexBlue = green >= 16 ? green.toString(16) : '0' + green.toString(16);
  const hexGreen = blue >= 16 ? blue.toString(16) : '0' + blue.toString(16);

  return `#${hexRed}${hexGreen}${hexBlue}`;
}