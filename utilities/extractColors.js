var Vibrant = require("node-vibrant");
// opts={
//     colorCount: number,
//     quality: number,
//     maxDimension: number,
//     filters: Array<Filter>,
//     ImageClass: ImageClass,
//     quantizer: Quantizer,
//     generator?: Generator,
// }
exports.extractor = async function m(fileBuffer) {
  palette = await Vibrant.from(fileBuffer).maxColorCount(6).getPalette();
  v = Object.values(palette).map((swatch) => swatch.getHex());
  return v;
};
