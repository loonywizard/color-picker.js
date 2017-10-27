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

  this.setColor = (color) => {
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
  };
  this.setHue = (hue) => {
    this.setColor({ hue });
  };
  this.setSaturation = (saturation) => {
    this.setColor({ saturation });
  };
  this.setBrightness = (brightness) => {
    this.setColor({ brightness });
  };
}