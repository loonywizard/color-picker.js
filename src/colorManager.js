import { getRandomInt } from './utils/random';
import { convertHsbToRgb } from './utils/convert';
import { HUE_RANGE, SATURATION_RANGE, BRIGHTNESS_RANGE } from './consts';

/**
 * ColorManager manages color state in the color picker
 * It has get/set methods for colors,
 * You can subscribe any callback for color changes
 * */
export default function ColorManager() {
  const getRandomHue = () => getRandomInt(HUE_RANGE.MIN, HUE_RANGE.MAX);
  const getRandomSaturation = () => getRandomInt(SATURATION_RANGE.MIN, SATURATION_RANGE.MAX);
  const getRandomBrightness = () => getRandomInt(BRIGHTNESS_RANGE.MIN, BRIGHTNESS_RANGE.MAX);

  const subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach(cb => { cb(); });
  };

  this.subscribe = (callback) => {
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
    if (color.hue !== undefined) {
      hue = color.hue;
    }
    if (color.saturation !== undefined) {
      saturation = color.saturation;
    }
    if (color.brightness !== undefined) {
      brightness = color.brightness;
    }

    let rgbColors = convertHsbToRgb(hue, saturation, brightness);
    red = rgbColors.red;
    blue = rgbColors.blue;
    green = rgbColors.green;

    notifySubscribers();
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