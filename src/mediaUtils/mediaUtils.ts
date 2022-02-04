import {
  GetFilterDataResult,
  GetWaveFormSamples,
  GetNormalizeData,
  GetAudioBuffer,
  GetFilterData,
  GetFramesData,
} from './types';

export const getAudioBuffer: GetAudioBuffer = async ({ url }) => {
  const audioContext = new AudioContext();
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const getFramesData: GetFramesData = ({
  animationframes,
  audioBuffer,
  animation,
  channel,
}) => {
  const rawData = audioBuffer.getChannelData(channel);

  const framesData = [];
  if (animation) {
    const frames = audioBuffer.sampleRate / animationframes;
    for (let index = 0; index < rawData.length; index += frames) {
      const partraw = rawData.slice(index, index + frames);
      framesData.push(partraw);
    }
  } else {
    framesData.push(rawData);
  }

  return framesData;
};

export const getFilterData: GetFilterData = ({ framesData, samples }) => {
  const filteredData: GetFilterDataResult = [];
  framesData.forEach(framesDataItem => {
    const blockSize = Math.floor(framesDataItem.length / samples); // the number of samples in each subdivision
    const filteredDataBlock = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(framesDataItem[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredDataBlock.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    filteredData.push(filteredDataBlock);
  });
  return filteredData;
};

export const getNormalizeData: GetNormalizeData = filteredData => {
  const multipliers: number[] = [];
  filteredData.forEach(filteredDataItem => {
    const multiplier = Math.max(...filteredDataItem);
    multipliers.push(multiplier);
  });

  const maxMultiplier = Math.pow(Math.max(...multipliers), -1);

  const normalizeData: GetFilterDataResult = [];
  filteredData.forEach(filteredDataItem => {
    const normalizeDataBlock = filteredDataItem.map(n => n * maxMultiplier);
    normalizeData.push(normalizeDataBlock);
  });

  return normalizeData;
};

export const getWaveformSamples: GetWaveFormSamples = ({ samples, ...rest }) =>
  getNormalizeData(
    getFilterData({
      framesData: getFramesData(rest),
      samples,
    }),
  );
