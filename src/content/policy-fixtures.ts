// Fictional portfolio rules. These do not reproduce the assessment policy.
export type DemoCondition = 'sealed' | 'opened' | 'damaged';
export type PolicyInput = { reference: string; days: string; condition: DemoCondition };
export const initialPolicyInput: PolicyInput = {
  reference: 'DEMO-42',
  days: '7',
  condition: 'sealed',
};
export const demoPolicyRules = [
  ['V', 'Validate', 'Delivery age must be a whole number from 0 to 365.'],
  ['A', 'Request details', 'A reference is needed before proceeding.'],
  ['B', 'Ask a person', 'A damaged item goes to a person, regardless of age.'],
  ['C', 'Check the window', 'More than 21 days is outside this fictional window.'],
  ['D', 'Inspect opened items', 'An opened item within the window needs a person.'],
  ['E', 'Offer a return path', 'A sealed item within 21 days can follow this demo’s return path.'],
] as const;
