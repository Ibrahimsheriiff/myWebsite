import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="shell not-found">
      <p className="mono">404 / A LOOSE END</p>
      <h1>This page wandered off.</h1>
      <p>Let’s get you back to something useful.</p>
      <Link className="button button-dark" href="/">
        Back to the portfolio
      </Link>
    </main>
  );
}
