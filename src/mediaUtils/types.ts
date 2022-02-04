export interface GetAudioBufferArgs {
  url: string;
}

export type GetAudioBufferResult = Promise<AudioBuffer>;

export type GetAudioBuffer = (
  props: GetAudioBufferArgs,
) => GetAudioBufferResult;

export interface GetFramesDataArgs {
  channel: number;
  animation: boolean;
  animationframes: number;
  audioBuffer: AudioBuffer;
}

export type GetFramesDataResult = Float32Array[];

export type GetFramesData = (props: GetFramesDataArgs) => GetFramesDataResult;

export interface GetFilterDataArgs {
  framesData: GetFramesDataResult;
  samples: number;
}

export type GetFilterDataResult = number[][];

export type GetFilterData = (props: GetFilterDataArgs) => GetFilterDataResult;

export type GetNormalizeDataArgs = GetFilterDataResult;

export type GetNormalizeDataResult = GetFilterDataResult;

export type GetNormalizeData = (
  props: GetNormalizeDataArgs,
) => GetNormalizeDataResult;

export type WaveFormSamples = GetNormalizeDataResult;

export interface GetWaveFormSamplesArgs extends GetFramesDataArgs {
  samples: number;
}

export type GetWaveFormSamplesResult = WaveFormSamples;

export type GetWaveFormSamples = (
  props: GetWaveFormSamplesArgs,
) => GetWaveFormSamplesResult;
