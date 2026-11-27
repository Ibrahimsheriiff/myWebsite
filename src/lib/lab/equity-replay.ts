import { fictionalPrice, type ReplayScenario, type ReplayEvent } from '@/content/lab/equity-replay';
export type ReplayState = {
  scenario: ReplayScenario;
  status: 'ready' | 'running' | 'paused' | 'completed';
  events: ReplayEvent[];
};
export type ReplayAction =
  | { type: 'start' | 'pause' | 'resume' | 'step' | 'tick' }
  | { type: 'reset'; scenario?: ReplayScenario };
export function createReplay(scenario: ReplayScenario = 'success'): ReplayState {
  if (!['success', 'provider', 'invalid'].includes(scenario))
    throw new RangeError('Unknown replay scenario');
  return { scenario, status: 'ready', events: [] };
}
export function replayPlan(scenario: ReplayScenario): ReplayEvent[] {
  const request =
    scenario === 'invalid'
      ? {}
      : { ticker: 'FICT', user_query: 'Inspect the prepared fictional price record.' };
  const plan: Omit<ReplayEvent, 'index'>[] = [
    {
      stage: 'request',
      title: 'Request received',
      note: 'Prepared input for a fictional instrument. No live interpretation.',
      payload: request,
    },
  ];
  if (!validReplayRequest(request)) {
    plan.push({
      stage: 'validation',
      title: 'Required field missing',
      note: 'RiskRequest requires a string ticker. Stop before any tool call.',
      payload: { field: 'ticker', error: 'required' },
      outcome: 'failed',
    });
    return plan.map((e, index) => ({ ...e, index }));
  }
  plan.push(
    {
      stage: 'validation',
      title: 'Request shape accepted',
      note: 'Presence and type are not proof that an instrument exists.',
      payload: { ticker: 'string', user_query: 'string' },
      outcome: 'passed',
    },
    {
      stage: 'tool_use',
      title: 'Prepared tool call',
      note: 'The source loop dispatches tool_use blocks through its registry. This selection is authored, not model reasoning.',
      payload: { id: 'demo-call-1', name: 'get_price_data', input: { ticker: 'FICT' } },
    },
    {
      stage: 'tool_result',
      title: scenario === 'provider' ? 'Tool returned an error' : 'Synthetic tool result',
      note: 'get_price_data returns a dictionary. These numbers and provider behaviour are fixtures.',
      payload:
        scenario === 'provider'
          ? { error: 'Fictional provider unavailable' }
          : { ...fictionalPrice },
    },
  );
  if (scenario === 'provider')
    plan.push({
      stage: 'boundary',
      title: 'Stop for inspection',
      note: 'Educational extension: stop on an error instead of implying the original loop guarantees recovery. Source passes tool dictionaries back to the model.',
      payload: { status: 'demo_stopped', tool: 'get_price_data' },
      outcome: 'failed',
      extension: true,
    });
  else
    plan.push(
      {
        stage: 'observation',
        title: 'Result returned to the loop',
        note: 'A tool_result refers to the same call identifier. No private reasoning is displayed.',
        payload: {
          type: 'tool_result',
          tool_use_id: 'demo-call-1',
          content: { ...fictionalPrice },
        },
      },
      {
        stage: 'response',
        title: 'Prepared public response',
        note: 'Public fields mirror the source response boundary. Private trace content is omitted. This fixture is not a risk assessment.',
        payload: {
          ticker: 'FICT',
          risk_score: null,
          risk_label: 'demonstration only',
          explanation: 'Prepared output for a fictional instrument; no recommendation.',
          tools_called: ['get_price_data'],
        },
        outcome: 'passed',
      },
    );
  return plan.map((e, index) => ({
    ...e,
    index,
    ...(e.stage === 'response'
      ? { outcome: validPublicResponse(e.payload) ? ('passed' as const) : ('failed' as const) }
      : {}),
  }));
}
export function replayReducer(s: ReplayState, a: ReplayAction): ReplayState {
  if (a.type === 'reset') return createReplay(a.scenario ?? s.scenario);
  if (a.type === 'pause') return s.status === 'running' ? { ...s, status: 'paused' } : s;
  if (a.type === 'resume') return s.status === 'paused' ? { ...s, status: 'running' } : s;
  if (
    (a.type === 'start' && s.status !== 'ready') ||
    (a.type === 'step' && !['ready', 'paused'].includes(s.status)) ||
    (a.type === 'tick' && s.status !== 'running')
  )
    return s;
  const plan = replayPlan(s.scenario),
    next = plan[s.events.length];
  if (!next) return s;
  const events = [...s.events, next];
  return {
    ...s,
    events,
    status: events.length === plan.length ? 'completed' : a.type === 'step' ? 'paused' : 'running',
  };
}

export function validReplayRequest(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.ticker === 'string' &&
    (v.user_query === undefined || v.user_query === null || typeof v.user_query === 'string')
  );
}
export function validPublicResponse(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.ticker === 'string' &&
    (v.risk_score === null || Number.isInteger(v.risk_score)) &&
    typeof v.risk_label === 'string' &&
    typeof v.explanation === 'string' &&
    Array.isArray(v.tools_called) &&
    v.tools_called.every((x) => typeof x === 'string')
  );
}
