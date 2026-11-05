import { useEffect, useRef } from 'react';

type SubmissionSuccessProps = {
  applicationId: string;
  onStartOver: () => void;
};

export const SubmissionSuccess = ({ applicationId, onStartOver }: SubmissionSuccessProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="success" role="status">
      <h2 ref={headingRef} tabIndex={-1}>
        Application submitted
      </h2>
      <p>
        Thank you for applying. Your reference number is <strong>{applicationId}</strong>.
      </p>
      <button type="button" onClick={onStartOver}>
        Submit another application
      </button>
    </section>
  );
};
