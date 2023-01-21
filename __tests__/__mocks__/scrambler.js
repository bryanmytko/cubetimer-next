export const mockGenerate = jest.fn(
  () => "U L2 B2 U B' R' U R' U2 L D2 L' F2 R2 U2 F2 U2 F R' U' L'"
);

const mock = jest.fn().mockImplementation(() => ({ generate: mockGenerate }));

export default mock;
