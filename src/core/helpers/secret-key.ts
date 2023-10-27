export const secretKey = (length: number = 4): number => {
  const randomNumbers: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    randomNumbers.push(randomNumber);
  }
  return parseInt(randomNumbers.join(''), 10);
};
