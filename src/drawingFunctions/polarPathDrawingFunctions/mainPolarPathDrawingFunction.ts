import { DrawingType } from 'drawingFunctions/types';
import { defaultPolarPaths } from './constants';
import { MainPolarPathDrawingFunction } from './types';

export const mainPolarPathDrawingFunction: MainPolarPathDrawingFunction = ({
  top = 0,
  left = 0,
  startdeg = 0,
  length = 100,
  enddeg = 360,
  distance = 50,
  invertdeg = false,
  invertpath = false,
  normalizedData = [],
  type = DrawingType.STEPS,
  paths = defaultPolarPaths,
  samples = normalizedData.length,
}) => {
  let path = ``;
  const fixenddeg = enddeg < startdeg ? enddeg + 360 : enddeg;
  const deg = !invertdeg
    ? (fixenddeg - startdeg) / samples
    : (startdeg - fixenddeg) / samples;
  const fixOrientation = !invertdeg ? 90 + startdeg : 90 + startdeg + 180;
  const invert = !invertpath ? 1 : -1;
  const pathslength = paths.length;
  const fixpathslength = type == 'mirror' ? pathslength * 2 : pathslength;
  const pi180 = Math.PI / 180;

  const normalizeDataLength = normalizedData.length;

  for (let f = 0; f < normalizeDataLength; f++) {
    if (f > 0) {
      const pathlength = path.length;
      const lastvalue = path.charAt(pathlength - 1);
      if (lastvalue == ';' || pathlength === 0) {
        path += ' M 0 0 ;';
      } else {
        path += ';';
      }
    }

    let last_pos_x = -9999;
    let last_pos_y = -9999;

    for (let i = 0; i < samples; i++) {
      const positive = type != 'bars' ? (i % 2 ? 1 : -1) : 1;
      let mirror = 1;
      for (let j = 0; j < fixpathslength; j++) {
        let k = j;
        if (j >= pathslength) {
          k = j - pathslength;
          mirror = -1;
        }
        paths[k].minshow = paths[k].minshow ?? 0;
        paths[k].maxshow = paths[k].maxshow ?? 1;
        paths[k].normalize = paths[k].normalize ?? false;
        const normalizeDataValue = paths[k].normalize
          ? 1
          : normalizedData[f][i];
        if (
          paths[k].minshow <= normalizedData[f][i] &&
          paths[k].maxshow >= normalizedData[f][i]
        ) {
          switch (paths[k].d) {
            // LineTo Commands
            case 'L': {
              const angleStart =
                (deg * (i + paths[k].sdeg / 100) - fixOrientation) * pi180;
              const angleEnd =
                (deg * (i + paths[k].edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleStart);
              const pos_y =
                top +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleStart);

              const end_pos_x =
                left +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `L ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Cubic Bézier Curve Commands
            case 'C': {
              const angleStart =
                (deg * (i + paths[k].sdeg / 100) - fixOrientation) * pi180;
              const angle =
                (deg * (i + paths[k].deg / 100) - fixOrientation) * pi180;
              const angleEnd =
                (deg * (i + paths[k].edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleStart);
              const pos_y =
                top +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleStart);

              const center_pos_x =
                left +
                (length *
                  (paths[k].r / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angle);
              const center_pos_y =
                top +
                (length *
                  (paths[k].r / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angle);

              const end_pos_x =
                left +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Quadratic Bézier Curve Commands
            case 'Q': {
              const angleStart =
                (deg * (i + paths[k].sdeg / 100) - fixOrientation) * pi180;
              const angle =
                (deg * (i + paths[k].deg / 100) - fixOrientation) * pi180;
              const angleEnd =
                (deg * (i + paths[k].edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleStart);
              const pos_y =
                top +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleStart);

              const center_pos_x =
                left +
                (length *
                  (paths[k].r / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angle);
              const center_pos_y =
                top +
                (length *
                  (paths[k].r / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angle);

              const end_pos_x =
                left +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Elliptical Arc Curve Commands
            case 'A': {
              const angleStart =
                (deg * (i + paths[k].sdeg / 100) - fixOrientation) * pi180;
              const angleEnd =
                (deg * (i + paths[k].edeg / 100) - fixOrientation) * pi180;

              const pos_x =
                left +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleStart);
              const pos_y =
                top +
                (length *
                  (paths[k].sr / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleStart);

              const end_pos_x =
                left +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.cos(angleEnd);
              const end_pos_y =
                top +
                (length *
                  (paths[k].er / 100) *
                  normalizeDataValue *
                  positive *
                  mirror *
                  invert +
                  distance) *
                  Math.sin(angleEnd);

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              const angle = (deg * i * paths[k].angle) / 100;
              const rx = (paths[k].rx * deg) / 100;
              const ry = (paths[k].ry * deg) / 100;

              let sweep = paths[k].sweep;
              if (positive == -1) {
                if (sweep == 1) {
                  sweep = 0;
                } else {
                  sweep = 1;
                }
              }
              if (mirror == -1) {
                if (sweep == 1) {
                  sweep = 0;
                } else {
                  sweep = 1;
                }
              }
              path += `A ${rx} ${ry} ${angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // ClosePath Commands
            case 'Z':
              path += 'Z ';
              break;

            default:
              break;
          }
        }
      }
    }
  }
  return path;
};
