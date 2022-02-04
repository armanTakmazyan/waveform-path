import { WaveFormSamples } from 'mediaUtils';

export enum DrawingType {
  MIRROR = 'mirror',
  STEPS = 'steps',
  BARS = 'bars',
}

export interface CommonArgumentsOfDrawingFunctions {
  top?: number;
  left?: number;
  samples?: number;
  type?: DrawingType;
  normalizedData?: WaveFormSamples;
}

export interface CommonDrawingFunctionsPathsProperties {
  rx: number;
  ry: number;
  arc: number;
  angle: number;
  sweep: number;
  minshow: number; // Values 0 to 1 - Default 0
  maxshow: number; // Values 0 to 1 - Default 1
  normalize: boolean; // Normalize value y to 1. - Default false
}
