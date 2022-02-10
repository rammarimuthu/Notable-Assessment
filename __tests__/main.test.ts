import { transformText } from '../src/main';

describe('transformText', () => {
  // Assert if setTimeout was called properly
  it('works for provided example', () => {
    const text = `Patient presents today with several issues. Number one BMI has increased by 10% since their last visit. Number next patient reports experiencing dizziness several times in the last two weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks.`;
    const transformed = `Patient presents today with several issues.\n1. BMI has increased by 10% since their last visit.\n2. Patient reports experiencing dizziness several times in the last two weeks.\n3. Patient has a persistent cough that hasn’t improved for last 4 weeks.`;
    expect(transformText(text)).toBe(transformed);
  });

  it('properly capitalizes next word', () => {
    const text = `Number one hello`;
    const transformed = `1. Hello`;
    expect(transformText(text)).toBe(transformed);
  });

  it('works when numbered list starts at end of text', () => {
    const text = `Patient presents today with several issues. Number one BMI has increased by 10% since their last visit. Number next patient reports experiencing dizziness several times in the last two weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks. Number next`;
    const transformed = `Patient presents today with several issues.\n1. BMI has increased by 10% since their last visit.\n2. Patient reports experiencing dizziness several times in the last two weeks.\n3. Patient has a persistent cough that hasn’t improved for last 4 weeks.\n4.`;
    expect(transformText(text)).toBe(transformed);
  });

  it('does not needlessly transform', () => {
    const text = `Number number eight Number`;
    const transformed = `Number number eight Number`;
    expect(transformText(text)).toBe(transformed);
  });
});
