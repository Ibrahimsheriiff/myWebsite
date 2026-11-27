import {
  resolutionScenarios,
  fictionalOrders,
  type ResolutionScenario,
} from '@/content/lab/resolution-fixtures';
import { evaluateDemoPolicy, type PolicyResult } from '@/lib/demo-policy';
import type { PolicyInput } from '@/content/policy-fixtures';
export type ResolutionStage =
  'ready' | 'interpreted' | 'waiting' | 'invalid' | 'lookup' | 'policy' | 'reply' | 'completed';
export type ResolutionOutput = { reference: string; decision: string; reply: string };
export type ResolutionState = {
  scenario: ResolutionScenario;
  stage: ResolutionStage;
  interpretation: { reference: unknown; intent: string } | null;
  order: PolicyInput | null;
  policy: PolicyResult | null;
  output: ResolutionOutput | null;
  events: { id: number; stage: ResolutionStage; note: string }[];
  error: string;
};
export type ResolutionAction =
  | { type: 'next' | 'repair' }
  | { type: 'provide'; reference: string }
  | { type: 'reset'; scenario?: ResolutionScenario };
export function createResolution(scenario: ResolutionScenario = 'complete'): ResolutionState {
  if (!resolutionScenarios.some((s) => s.id === scenario)) throw new RangeError('Unknown request');
  return {
    scenario,
    stage: 'ready',
    interpretation: null,
    order: null,
    policy: null,
    output: null,
    events: [],
    error: '',
  };
}
function move(
  s: ResolutionState,
  stage: ResolutionStage,
  note: string,
  patch: Partial<ResolutionState> = {},
): ResolutionState {
  return {
    ...s,
    ...patch,
    stage,
    error: '',
    events: [...s.events, { id: s.events.length, stage, note }],
  };
}
function lookup(s: ResolutionState, reference: string) {
  const found = fictionalOrders.find((o) => o.reference === reference);
  return move(s, 'lookup', found ? 'Fictional order record found.' : 'No fictional record found.', {
    order: found ? { ...found } : null,
  });
}
export function validResolution(
  output: ResolutionOutput | null,
  policy: PolicyResult | null,
): boolean {
  return (
    !!output &&
    !!policy &&
    typeof output.reference === 'string' &&
    output.reference.length > 0 &&
    output.decision === policy.code &&
    typeof output.reply === 'string' &&
    output.reply.trim().length > 0
  );
}
export function resolutionReducer(s: ResolutionState, a: ResolutionAction): ResolutionState {
  if (a.type === 'reset') return createResolution(a.scenario ?? s.scenario);
  if (a.type === 'repair')
    return s.stage === 'invalid'
      ? move(s, 'interpreted', 'A corrected prepared interpretation was loaded.', {
          interpretation: { reference: 'DEMO-42', intent: 'return' },
        })
      : s;
  if (a.type === 'provide') {
    if (s.stage !== 'waiting') return s;
    const ref = a.reference.trim();
    if (!fictionalOrders.some((o) => o.reference === ref))
      return { ...s, error: 'Use a listed fictional reference: DEMO-42 or DEMO-77.' };
    return lookup({ ...s, interpretation: { reference: ref, intent: 'return' } }, ref);
  }
  switch (s.stage) {
    case 'ready':
      return move(
        s,
        'interpreted',
        'Prepared interpretation loaded; no language model was called.',
        { interpretation: { ...resolutionScenarios.find((x) => x.id === s.scenario)!.prepared } },
      );
    case 'interpreted':
      if (typeof s.interpretation?.reference !== 'string')
        return move(s, 'invalid', 'Reference must be a string. Policy has not run.');
      if (!s.interpretation.reference.trim())
        return move(s, 'waiting', 'Reference missing. Ask for details before lookup or policy.');
      return lookup(s, s.interpretation.reference);
    case 'lookup':
      if (!s.order) return move(s, 'waiting', 'A fictional reference is required.');
      return move(s, 'policy', 'Deterministic fictional policy evaluated trusted fixture fields.', {
        policy: evaluateDemoPolicy(s.order),
      });
    case 'policy':
      return move(s, 'reply', 'A representative reply was prepared, without changing the policy.', {
        output: {
          reference: s.order!.reference,
          decision: s.policy!.code,
          reply: `${s.policy!.label}. This is a fictional workflow outcome; no real return is authorised.`,
        },
      });
    case 'reply':
      return validResolution(s.output, s.policy)
        ? move(s, 'completed', 'Public output shape and decision consistency checked.')
        : move(s, 'invalid', 'Final validation failed.');
    default:
      return s;
  }
}
