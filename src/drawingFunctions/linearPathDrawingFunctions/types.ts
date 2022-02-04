import { WaveFormSamples } from 'mediaUtils';
import {
  CommonDrawingFunctionsPathsProperties,
  CommonArgumentsOfDrawingFunctions,
} from 'drawingFunctions/types';

export enum MainLinearPathDrawingFunctionPathType {
  A = 'A',
  C = 'C',
  H = 'H',
  L = 'L',
  Q = 'Q',
  V = 'V',
  Z = 'Z',
}

export interface MainLinearPathDrawingFunctionPath
  extends CommonDrawingFunctionsPathsProperties {
  d: MainLinearPathDrawingFunctionPathType;
  sx: number;
  x: number;
  ex: number;
  sy: number;
  y: number;
  ey: number;
}

export type MainLinearPathDrawingFunctionPaths =
  MainLinearPathDrawingFunctionPath[];

export interface MainLinearPathDrawingFunctionArgs
  extends CommonArgumentsOfDrawingFunctions {
  paths?: MainLinearPathDrawingFunctionPaths;
  width?: number;
  height?: number;
}

export type MainLinearPathDrawingFunctionResult = string;

export type MainLinearPathDrawingFunction = (
  props: MainLinearPathDrawingFunctionArgs,
) => MainLinearPathDrawingFunctionResult;

export interface DrawLinearPathFromWaveFormSamplesArgs
  extends MainLinearPathDrawingFunctionArgs {
  waveFormSamples: WaveFormSamples;
}

export type DrawLinearPathFromWaveFormSamplesResult = string;

export type DrawLinearPathFromWaveFormSamples = (
  props: DrawLinearPathFromWaveFormSamplesArgs,
) => DrawLinearPathFromWaveFormSamplesResult;

export interface DrawLinearPathFromAudioBufferOptions
  extends MainLinearPathDrawingFunctionArgs {
  channel?: number;
  samples?: number;
  animation?: boolean;
  normalize?: boolean;
  animationframes?: number;
}

export interface DrawLinearPathFromAudioBufferArgs {
  audioBuffer: AudioBuffer;
  options?: DrawLinearPathFromAudioBufferOptions;
}

export interface DrawLinearPathFromAudioBufferResult {
  path: string;
  waveFormSamples: WaveFormSamples;
}

export type DrawLinearPathFromAudioBuffer = (
  props: DrawLinearPathFromAudioBufferArgs,
) => DrawLinearPathFromAudioBufferResult;

export interface DrawLinearPathFromAudioUrlArgs {
  url: string;
  options?: DrawLinearPathFromAudioBufferOptions;
}

export type DrawLinearPathFromAudioUrlResult =
  Promise<DrawLinearPathFromAudioBufferResult>;

export type DrawLinearPathFromAudioUrl = (
  props: DrawLinearPathFromAudioUrlArgs,
) => DrawLinearPathFromAudioUrlResult;
