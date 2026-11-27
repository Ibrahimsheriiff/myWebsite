# AutoMark Workload Simulator — model contract

This is a newly authored teaching model inspired by verified logical responsibilities, not AutoMark source, deployment or performance reproduction. Public fixtures contain no student code, customer data or internal provenance. It runs in the browser without services or external requests.

## Boundaries and configuration

- Integer jobs: 0–36. UI presets: 0, 6, 12, 24, 36.
- Integer workers: 1–6. UI presets: 1, 2, 3, 4, 6.
- Scenario: steady, mixed or one timeout. Invalid engine configuration throws RangeError.
- Three arrivals per virtual second, starting at t=0. Each job is received at its arrival and spends one second in intake before it can queue.
- Steady durations repeat 6/8/10 virtual seconds. Mixed durations repeat 3/12/5/9/4/16. Normal execution limit is 20 seconds.
- Timeout scenario: fifth job (or last if fewer than five) requires 14 seconds but has an 8-second limit. It fails at the limit, without retry. A duration exactly equal to the limit succeeds.
- No parameter reproduces the real project's 18.17s / 155s / 157s observations.

## State and ordering

Run: ready → running ⇄ paused → completed. Step from ready starts at t=0 and leaves the run paused; subsequent paused steps advance one virtual second. Start is ignored outside ready; tick is ignored outside running; resume is ignored outside paused. Reset from any state returns to ready and clears jobs/events/metrics for the selected configuration. An empty workload completes at t=0 with submitted/finished events.

Job: pending → received → queued → running → completed **or** failed. Terminal jobs never re-enter the queue. Each job receives one assignment and starts once. Queued jobs dispatched in the same tick can have zero waiting time while still producing queued/assigned/started events.

At each integer time boundary:

1. Finish or time out executions whose effective duration has elapsed.
2. Move jobs that finished one-second intake to the queue.
3. Receive arrivals for this time.
4. Dispatch FIFO waiting jobs to available workers in ascending worker-number order.
5. Sample remaining waiting queue depth; finish the workload only when all jobs are terminal.

FIFO order uses queue-entry time, arrival and identifier as deterministic tie-breaks. Completion order may differ. No random numbers, wall time or animation state affect scheduling. The reducer clones state/records before mutation and generates events with stable increasing identifiers and virtual timestamps.

## Metrics

Accepted = all non-pending jobs; received is the subset still in intake. State counts partition the total configured jobs. Current queue/running/completed/failed counts come from job records. Acceptance time is the last received timestamp once all jobs have arrived. Workload completion is the terminal virtual time.

Busy worker-seconds = the sum of each started job’s time between start and current time or terminal time. Utilisation = busy worker-seconds / (configured workers × elapsed virtual seconds), including intake time. At t=0 it is defined as 0%, avoiding division by zero. UI rounds to whole percent. Peak queue counts only jobs still waiting **after dispatch**, sampled at whole-second boundaries; it does not count running work or transient pre-dispatch queue length.

Example derived by the same engine: six steady jobs are all received by t=1. One worker finishes at 49s, peak queue 5, busy time 48 worker-seconds, utilisation 48/49. Three workers finish at 21s, peak queue 3, utilisation 48/63. These are synthetic model outputs, not measured AutoMark behaviour.

## Presentation and playback

Public types/fixtures, engine, metric derivation, hook and presentation are separate modules. The Lab layout, breadcrumb, logical landing sketch and boundary notice provide a small shared foundation without dictating future experiment layouts.

Playback owns one setInterval: 1× = one virtual second per viewing second, 2× and 4× scale viewing pace. Browser throttling may slow display; it does not change results. Speed changes replace the interval; pause, completion and route exit clear it; tab hiding pauses. Rapid actions are guarded by the reducer. CSS entry/progress transitions represent real record changes and do not schedule them. Reduced motion removes those transitions without changing the model.

The DOM retains native labelled controls, explicit state words, progress values, all job records and chronological events. Recent events are bounded and filterable; complete history is a native disclosure. Every failure stays visible alongside the latest four completions. There is no automatic timeline scrolling or individual-event announcement stream. The live status announces phase changes and terminal totals. Without JavaScript the controls remain disabled and a server-computed representative example explains the same learning objective.

## Limits

No actual SVN commits, queue durability, worker process, Docker sandbox, grades, network delay, autoscaling, delivery semantics, retries, persistence, crashes or arbitrary code execution. One homogeneous worker pool; integer durations; a tiny bounded workload. The model illustrates concurrency and waiting but cannot prove production capacity or security. Future models need explicit new rules and tests rather than implying those behaviours through animation.

## Phase 3B — completed-run comparison

The engine contract above is unchanged. A separate UI feature can retain a copied completed-run summary while the experiment remains mounted. Reset still clears the current run, while the explicitly retained reference survives. Clear removes it; route exit discards it. No storage service or localStorage.

Comparison includes configuration, acceptance/completion, peak waiting, terminal counts and utilisation. A worker-count interpretation is isolated only when jobs and scenario match. Multiple changed settings are named with a non-causal qualification. Current-run worker activity comes from matched start/completion/timeout events. Failed outcomes remain visible. Completed playback controls return to normal flow so they cannot cover the comparison; active controls retain their existing behaviour.
