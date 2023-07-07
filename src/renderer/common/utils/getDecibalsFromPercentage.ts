const getDecibalsFromPercentage = (input: number): number => {
  const minInput = 0;
  const maxInput = 100;
  const minOutput = -6;
  const maxOutput = 6;

  // Calculate the ratio of the input number between 0 and 1
  const ratio = (input - minInput) / (maxInput - minInput);

  // Scale the ratio to the output range and round to the nearest integer
  const transformedNumber = Math.round(
    minOutput + ratio * (maxOutput - minOutput)
  );

  return transformedNumber;
};

export default getDecibalsFromPercentage;
