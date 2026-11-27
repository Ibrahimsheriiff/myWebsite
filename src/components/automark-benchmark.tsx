import { automarkBenchmark as benchmark } from '@/content/automark';
import { profile } from '@/content/portfolio';

export function AutoMarkBenchmark() {
  return (
    <figure className="automark-benchmark" id="benchmark" aria-labelledby="benchmark-title">
      <figcaption>
        <div>
          <span className="mono">END-TO-END TEST / 200 CONCURRENT SUBMISSIONS</span>
          <h3 id="benchmark-title">Accepted. Then graded.</h3>
        </div>
        <p>
          <strong>200 / 200</strong>
          <span>jobs accepted and graded</span>
        </p>
      </figcaption>
      <div className="benchmark-measures">
        <div className="intake-measure">
          <span className="mono">SUBMISSION ACCEPTANCE</span>
          <p className="benchmark-number">
            {benchmark.intakeSeconds}
            <span>s</span>
          </p>
          <p>
            All SVN commits accepted in <strong>18.17 seconds.</strong>
          </p>
          <p className="benchmark-explainer">
            This describes intake of the submissions, before considering when each grading job
            completed.
          </p>
        </div>
        <div className="completion-measures">
          <span className="mono">GRADING COMPLETION</span>
          <table>
            <caption className="sr-only">Reported grading completion percentiles</caption>
            <thead>
              <tr>
                <th scope="col">Percentile</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">P95</th>
                <td>
                  {benchmark.p95Seconds}
                  <span>s</span>
                </td>
              </tr>
              <tr>
                <th scope="row">P99</th>
                <td>
                  {benchmark.p99Seconds}
                  <span>s</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="benchmark-explainer">
            P95 and P99 mark the completion times below which approximately 95% and 99% of the
            measurements fell.
          </p>
        </div>
      </div>
      <p className="benchmark-reading">{benchmark.explanation}</p>
      <div className="benchmark-source">
        <span>{benchmark.source}</span>
        <a className="text-link" href={profile.resume}>
          Read the résumé
        </a>
      </div>
      <p className="benchmark-limit">{benchmark.limits}</p>
    </figure>
  );
}
