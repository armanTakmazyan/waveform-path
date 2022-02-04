import {
  CommonArgumentsOfDrawingFunctions,
  CommonDrawingFunctionsPathsProperties,
} from 'drawingFunctions/types';
import { WaveFormSamples } from 'mediaUtils';

export enum MainPolarPathDrawingFunctionPathType {
  A = 'A',
  C = 'C',
  L = 'L',
  Q = 'Q',
  Z = 'Z',
}

export interface MainPolarPathDrawingFunctionPath
  extends CommonDrawingFunctionsPathsProperties {
  d: MainPolarPathDrawingFunctionPathType;
  sdeg: number;
  edeg: number;
  deg: number;
  sr: number;
  er: number;
  r: number;
}

export type MainPolarPathDrawingFunctionPaths =
  MainPolarPathDrawingFunctionPath[];

export interface MainPolarPathDrawingFunctionArgs
  extends CommonArgumentsOfDrawingFunctions {
  paths?: MainPolarPathDrawingFunctionPaths;
  invertpath?: boolean;
  invertdeg?: boolean;
  distance?: number;
  startdeg?: number;
  length?: number;
  enddeg?: number;
}

export type MainPolarPathDrawingFunctionResult = string;

export type MainPolarPathDrawingFunction = (
  props: MainPolarPathDrawingFunctionArgs,
) => MainPolarPathDrawingFunctionResult;

export interface DrawPolarPathFromAudioBufferOptions
  extends MainPolarPathDrawingFunctionArgs {
  channel?: number;
  samples?: number;
  animation?: boolean;
  normalize?: boolean;
  animationframes?: number;
}

export interface DrawPolarPathFromAudioBufferArgs {
  audioBuffer: AudioBuffer;
  options?: DrawPolarPathFromAudioBufferOptions;
}

export interface DrawPolarPathFromAudioBufferResult {
  path: string;
  waveFormSamples: WaveFormSamples;
}

export type DrawPolarPathFromAudioBuffer = (
  props: DrawPolarPathFromAudioBufferArgs,
) => DrawPolarPathFromAudioBufferResult;
