import { getFilterData, getFramesData, getNormalizeData } from 'mediaUtils';
import { mainPolarPathDrawingFunction } from './mainPolarPathDrawingFunction';
import { DrawPolarPathFromAudioBuffer } from './types';
import { DrawingType } from 'drawingFunctions/types';
import { defaultPolarPaths } from './constants';

export const drawPolarPathFromAudioBuffer: DrawPolarPathFromAudioBuffer = ({
  audioBuffer,
  options: {
    channel = 0,
    samples = audioBuffer.length,
    type = DrawingType.STEPS,
    paths = defaultPolarPaths,
    animationframes = 10,
    invertpath = false,
    invertdeg = false,
    animation = false,
    normalize = true,
    distance = 50,
    length = 100,
    startdeg = 0,
    enddeg = 360,
    left = 0,
    top = 0,
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

  const path = mainPolarPathDrawingFunction({
    normalizedData,
    invertpath,
    invertdeg,
    distance,
    startdeg,
    length,
    samples,
    enddeg,
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
