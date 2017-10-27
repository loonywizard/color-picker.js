import { getRandomInt } from './utils/random';
import { convertHsbToRgb } from './utils/convert';

/**
 * ColorManager manages color state in the color picker
 * It has get/set methods for colors,
 * You can subscribe any callback for color changes
 * */
export default function ColorManager() {
  const getRandomHue = () => getRandomInt(0, 360);
  const getRandomSaturation = () => getRandomInt(0, 100);
  const getRandomBrightness = () => getRandomInt(0, 100);

  const subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach(cb => { cb(); });
  };

  this.subscribe = (callback, values) => {
    subscribers.push(callback);
  };

  let hue = getRandomHue();
  let saturation = getRandomSaturation();
  let brightness = getRandomBrightness();
  let { red, green, blue } = convertHsbToRgb(hue, saturation, brightness);

  this.getColorHSB = () => ({ hue, saturation, brightness });
  this.getColorRGB = () => ({ red, green, blue });

  this.getHue = () => hue;
  this.getSaturation = () => saturation;
  this.getBrightness = () => brightness;

  this.getRed = () => red;
  this.getGreen = () => green;
  this.getBlue = () => blue;

  this.setColorHSB = (color) => {
    if (color.hue) {
      hue = color.hue;
    }
    if (color.saturation) {
      saturation = color.saturation;
    }
    if (color.brightness) {
      brightness = color.brightness;
    }

    notifySubscribers();

    let rgbColors = convertHsbToRgb(hue, saturation, brightness);
    red = rgbColors.red;
    blue = rgbColors.blue;
    green = rgbColors.green;
  };

  this.setHue = (hue) => {
    this.setColorHSB({ hue });
  };
  this.setSaturation = (saturation) => {
    this.setColorHSB({ saturation });
  };
  this.setBrightness = (brightness) => {
    this.setColorHSB({ brightness });
  };
}