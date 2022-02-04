import {
  DrawLinearPathFromWaveFormSamples,
  DrawLinearPathFromAudioBuffer,
  DrawLinearPathFromAudioUrl,
} from './types';

import {
  getNormalizeData,
  getAudioBuffer,
  getFilterData,
  getFramesData,
} from 'mediaUtils';

import { mainLinearPathDrawingFunction } from './mainLinearPathDrawingFunction';
import { DrawingType } from 'drawingFunctions/types';
import { defaultLinearPaths } from './constants';

export const drawLinearPathFromAudioBuffer: DrawLinearPathFromAudioBuffer = ({
  audioBuffer,
  options: {
    samples = audioBuffer.length,
    paths = defaultLinearPaths,
    type = DrawingType.MIRROR,
    animationframes = 10,
    animation = false,
    normalize = true,
    channel = 0,
    height = 100,
    width = 800,
    top = 20,
    left = 0,
  } = {},
}) => {
  const framesData = getFramesData({
    audioBuffer,
    channel,
    animation,
    animationframes,
  });
  const filteredData = getFilterData({ framesData, samples });
  const normalizedData = normalize
    ? getNormalizeData(filteredData)
    : filteredData;

  const path = mainLinearPathDrawingFunction({
    normalizedData,
    samples,
    height,
    width,
    paths,
    type,
    top,
    left,
  });

  return {
    path,
    waveFormSamples: normalizedData,
  };
};

export const drawLinearPathFromWaveFormSamples: DrawLinearPathFromWaveFormSamples =
  ({ waveFormSamples, ...rest }) => {
    return mainLinearPathDrawingFunction({
      ...rest,
      normalizedData: waveFormSamples,
    });
  };

export const drawLinearPathFromAudioUrl: DrawLinearPathFromAudioUrl = async ({
  url,
  options,
}) => {
  const audioBuffer = await getAudioBuffer({ url });
  return drawLinearPathFromAudioBuffer({ audioBuffer, options });
};
