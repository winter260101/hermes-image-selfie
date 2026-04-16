const MIRROR_KEYWORDS = [
  'outfit', 'wearing', 'clothes', 'dress', 'suit',
  'fashion', 'full-body', 'full body', 'mirror',
];

const detectMode = (prompt) => {
  const lower = prompt.toLowerCase();
  return MIRROR_KEYWORDS.some((kw) => lower.includes(kw)) ? 'mirror' : 'direct';
};

const buildApiPrompt = (userPrompt, mode) => {
  if (mode === 'mirror') {
    return `make a pic of this person, but ${userPrompt}. the person is taking a mirror selfie, showing full body, casual pose`;
  }
  return `a close-up selfie taken by herself, ${userPrompt}, direct eye contact with camera, natural lighting, candid feel`;
};

export const parsePrompt = (userPrompt) => {
  const mode = detectMode(userPrompt);
  const apiPrompt = buildApiPrompt(userPrompt, mode);
  return { mode, apiPrompt };
};
