import {
  MainPolarPathDrawingFunctionPathType,
  MainPolarPathDrawingFunctionPaths,
} from './types';

export const defaultPolarPaths: MainPolarPathDrawingFunctionPaths = [
  {
    d: MainPolarPathDrawingFunctionPathType.Q,
    sdeg: 0,
    sr: 0,
    deg: 50,
    r: 100,
    edeg: 100,
    er: 0,
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
