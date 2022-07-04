export default (image, w, h, map) => {
  const indices = {};
  Array.from(map).forEach((ch, i) => {
    indices[ch] = i;
  });
  const sheetWidth = image.width / w;
  const draw = (context, text, x, y) => {
    Array.from(text).forEach((ch, i) => {
      const index = indices[ch] || 0;
      const sy = Math.floor(index / sheetWidth);
      const sx = index % sheetWidth;
      context.drawImage(
        image,
        sx * w, sy * h,
        w, h,
        x + i * w, y,
        w, h,
      );
    });
  };
  window.font = {
    indices,
    image,
    w, h
  };
  return { draw };
};