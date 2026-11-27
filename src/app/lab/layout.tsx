import Link from 'next/link';
import { Navigation } from '@/components/site-controls';
import './lab.css';
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lab-environment" id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation homeLinks />
      <main id="main">{children}</main>
      <footer className="lab-signoff shell">
        <p className="serif">Pull up a chair. Change one thing.</p>
        <div>
          <span>Ibrahim Sharif / The Curious Engineer</span>
          <Link href="/#work">Back to the work</Link>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
