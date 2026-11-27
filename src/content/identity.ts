// Public identity and notebook copy only; no internal evidence records.
export const profile = {
  name: 'Ibrahim Sharif',
  fullName: 'Mohammad Ibrahim Sharif',
  email: 'mohammedibrahimsharif@gmail.com',
  github: 'https://github.com/Ibrahimsheriiff',
  linkedin: 'https://www.linkedin.com/in/ibrahim-sharif-au',
  resume: '/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf',
  education: {
    institution: 'Western Sydney University',
    degree: 'Bachelor of Computer Science',
    period: 'March 2023–January 2026',
  },
};
export const stages = [
  {
    id: 'understand',
    name: 'Understand',
    label: 'Find the actual problem.',
    text: 'Ask questions. Listen to the people involved. Work out what matters before deciding what to build.',
    note: 'Start with the question.',
  },
  {
    id: 'design',
    name: 'Design',
    label: 'Make complexity manageable.',
    text: 'Break the problem into smaller parts. Explore the trade-offs, then choose the simplest approach that fits.',
    note: 'Keep complexity intentional.',
  },
  {
    id: 'build',
    name: 'Build',
    label: 'Turn an idea into a system.',
    text: 'Build the pieces, connect them carefully, and keep checking that they solve the problem we started with.',
    note: 'The connections matter, too.',
  },
  {
    id: 'verify',
    name: 'Verify',
    label: 'Look beyond the happy path.',
    text: 'Test what should happen, what might fail, and what I may have overlooked. Learn from the result and improve it.',
    note: 'Verify rather than assume.',
  },
] as const;
