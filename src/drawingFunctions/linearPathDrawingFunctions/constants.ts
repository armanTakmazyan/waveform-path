import {
  MainLinearPathDrawingFunctionPathType,
  MainLinearPathDrawingFunctionPaths,
} from './types';

export const defaultLinearPaths: MainLinearPathDrawingFunctionPaths = [
  {
    d: MainLinearPathDrawingFunctionPathType.V,
    sx: 0,
    sy: 0,
    x: 50,
    y: 100,
    ex: 100,
    ey: 100,
    rx: 10,
    ry: 10,
    arc: 1,
    sweep: 1,
    angle: 180,
    minshow: 0,
    maxshow: 1,
    normalize: false,
  },
];
