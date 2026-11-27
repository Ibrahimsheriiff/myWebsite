import type { PolicyInput } from '@/content/policy-fixtures';
export type ResolutionScenario = 'complete' | 'missing' | 'invalid' | 'human';
export const resolutionScenarios: {
  id: ResolutionScenario;
  label: string;
  request: string;
  prepared: { reference: unknown; intent: string };
}[] = [
  {
    id: 'complete',
    label: 'Complete request',
    request: 'I would like to return my sealed parcel. Reference DEMO-42.',
    prepared: { reference: 'DEMO-42', intent: 'return' },
  },
  {
    id: 'missing',
    label: 'Missing reference',
    request: 'I would like to return my parcel, but I have not included a reference.',
    prepared: { reference: '', intent: 'return' },
  },
  {
    id: 'invalid',
    label: 'Invalid prepared input',
    request: 'A prepared interpretation contains a number where a reference string belongs.',
    prepared: { reference: 17, intent: 'return' },
  },
  {
    id: 'human',
    label: 'Needs human review',
    request: 'I opened the parcel and would like someone to review it. Reference DEMO-77.',
    prepared: { reference: 'DEMO-77', intent: 'return' },
  },
];
export const fictionalOrders: readonly PolicyInput[] = [
  { reference: 'DEMO-42', days: '7', condition: 'sealed' },
  { reference: 'DEMO-77', days: '5', condition: 'opened' },
];
