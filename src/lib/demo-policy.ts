import type { PolicyInput } from '@/content/policy-fixtures';
export type PolicyResult = {
  code: 'CHECK_INPUT' | 'REQUEST_DETAILS' | 'HUMAN_REVIEW' | 'OUTSIDE_DEMO_WINDOW' | 'RETURN_PATH';
  label: string;
  rule: 'V' | 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
};
export function evaluateDemoPolicy(input: PolicyInput): PolicyResult {
  const raw = input.days.trim();
  const age = Number(raw);
  if (
    !/^\d+$/.test(raw) ||
    !Number.isSafeInteger(age) ||
    age > 365 ||
    !['sealed', 'opened', 'damaged'].includes(input.condition)
  )
    return {
      code: 'CHECK_INPUT',
      label: 'Check the input',
      rule: 'V',
      explanation: 'Use a whole delivery age from 0 to 365 and a recognised item condition.',
    };
  if (!input.reference.trim())
    return {
      code: 'REQUEST_DETAILS',
      label: 'Request a reference',
      rule: 'A',
      explanation: 'The reference is missing. This illustration pauses before a policy decision.',
    };
  if (input.condition === 'damaged')
    return {
      code: 'HUMAN_REVIEW',
      label: 'A person should review',
      rule: 'B',
      explanation:
        'The fictional damage rule routes this request to a person, even outside the demo window.',
    };
  if (age > 21)
    return {
      code: 'OUTSIDE_DEMO_WINDOW',
      label: 'Outside the demo window',
      rule: 'C',
      explanation: `${age} days exceeds the fictional 21-day window. This is not a statement of customer rights.`,
    };
  if (input.condition === 'opened')
    return {
      code: 'HUMAN_REVIEW',
      label: 'A person should review',
      rule: 'D',
      explanation:
        'An opened item within this demo’s window needs inspection rather than an automatic return path.',
    };
  return {
    code: 'RETURN_PATH',
    label: 'Return path available',
    rule: 'E',
    explanation: `${age} days is within the fictional window and the item is sealed. No real return is authorised.`,
  };
}
