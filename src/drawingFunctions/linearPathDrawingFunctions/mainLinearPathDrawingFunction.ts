import { MainLinearPathDrawingFunction } from './types';
import { DrawingType } from 'drawingFunctions/types';
import { defaultLinearPaths } from './constants';

export const mainLinearPathDrawingFunction: MainLinearPathDrawingFunction = ({
  top = 20,
  left = 0,
  width = 800,
  height = 100,
  normalizedData = [],
  paths = defaultLinearPaths,
  type = DrawingType.MIRROR,
  samples = normalizedData.length,
}) => {
  let path = ``;

  const fixHeight = type != 'bars' ? (height + top * 2) / 2 : height + top;
  const fixWidth = width / samples;
  const pathslength = paths.length;
  const fixpathslength = type == 'mirror' ? pathslength * 2 : pathslength;

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
              const pos_x =
                i * fixWidth + (fixWidth * paths[k].sx) / 100 + left;
              const pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].sy) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
              const end_pos_x =
                i * fixWidth + (fixWidth * paths[k].ex) / 100 + left;
              const end_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].ey) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `L ${end_pos_x} ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            case 'H': {
              const pos_x =
                i * fixWidth + (fixWidth * paths[k].sx) / 100 + left;
              const pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].y) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
              const end_pos_x =
                i * fixWidth + (fixWidth * paths[k].ex) / 100 + left;
              const end_pos_y = pos_y;

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `H ${end_pos_x} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            case 'V': {
              const pos_x = i * fixWidth + (fixWidth * paths[k].x) / 100 + left;
              const pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].sy) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              const end_pos_x = pos_x;
              const end_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].ey) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }

              path += `V ${end_pos_y} `;

              last_pos_x = end_pos_x;
              last_pos_y = end_pos_y;
              break;
            }

            // Cubic Bézier Curve Commands
            case 'C': {
              const pos_x =
                i * fixWidth + (fixWidth * paths[k].sx) / 100 + left;
              const pos_y =
                fixHeight - ((fixHeight * paths[k].sy) / 100) * positive;

              const center_pos_x =
                i * fixWidth + (fixWidth * paths[k].x) / 100 + left;
              const center_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].y) / 100) *
                  (type != 'bars' ? height : height * 2) *
                  -positive *
                  mirror;

              //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
              const end_pos_x =
                i * fixWidth + (fixWidth * paths[k].ex) / 100 + left;
              const end_pos_y =
                fixHeight - ((fixHeight * paths[k].ey) / 100) * positive;

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
              const pos_x =
                i * fixWidth + (fixWidth * paths[k].sx) / 100 + left;
              const pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].sy) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              const center_pos_x =
                i * fixWidth + (fixWidth * paths[k].x) / 100 + left;
              const center_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].y) / 100) *
                  (type != 'bars' ? height : height * 2) *
                  -positive *
                  mirror;

              //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
              const end_pos_x =
                i * fixWidth + (fixWidth * paths[k].ex) / 100 + left;
              const end_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].ey) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

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
              const pos_x =
                i * fixWidth + (fixWidth * paths[k].sx) / 100 + left;
              const pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].sy) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
              const end_pos_x =
                i * fixWidth + (fixWidth * paths[k].ex) / 100 + left;
              const end_pos_y =
                fixHeight +
                ((normalizeDataValue * paths[k].ey) / 100) *
                  (type != 'bars' ? height / 2 : height) *
                  -positive *
                  mirror;

              if (pos_x !== last_pos_x || pos_y !== last_pos_y) {
                path += `M ${pos_x} ${pos_y} `;
              }
              const rx = (paths[k].rx * fixWidth) / 100;
              const ry = (paths[k].ry * fixWidth) / 100;
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
              path += `A ${rx} ${ry} ${paths[k].angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `;

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
