import { useState, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import type { ApplicationFormValues } from '../../../schemas/applicationForm';

type SummaryRowProps = {
  label: string;
  value: ReactNode;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <div className="summary-row">
    <dt>{label}</dt>
    <dd>{value === '' || value === undefined ? '—' : value}</dd>
  </div>
);

const ReviewSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="review-section">
    <h3>{title}</h3>
    <dl>{children}</dl>
  </section>
);

export const ReviewStep = () => {
  const { getValues } = useFormContext<ApplicationFormValues>();
  const [values] = useState(() => getValues());
  const { personal, education, experience, application } = values;

  return (
    <div className="review">
      <ReviewSection title="Personal details">
        <SummaryRow label="Full name" value={personal.fullName} />
        <SummaryRow label="Email" value={personal.email} />
        <SummaryRow label="Phone" value={personal.phone} />
        <SummaryRow label="Date of birth" value={personal.dateOfBirth} />
        <SummaryRow label="Current city" value={personal.currentCity} />
      </ReviewSection>

      <ReviewSection title="Education">
        {education.map((entry, index) => (
          <SummaryRow
            key={`${entry.degree}-${entry.institution}-${index}`}
            label={`${entry.degree}, ${entry.institution}`}
            value={`Passed ${entry.yearOfPassing} with ${entry.percentage}%`}
          />
        ))}
      </ReviewSection>

      <ReviewSection title="Experience">
        {experience.type === 'fresher' ? (
          <>
            <SummaryRow label="Candidate type" value="Fresher" />
            <SummaryRow label="Available to join from" value={experience.availableFrom} />
          </>
        ) : (
          <>
            <SummaryRow label="Candidate type" value="Experienced" />
            <SummaryRow label="Total experience" value={`${experience.totalExperienceYears} years`} />
            <SummaryRow label="Notice period" value={`${experience.noticePeriodDays} days`} />
            {experience.previousCompanies.map((company, index) => (
              <SummaryRow
                key={`${company.companyName}-${company.from}-${index}`}
                label={company.companyName}
                value={`${company.role}, ${company.from} to ${company.to}`}
              />
            ))}
          </>
        )}
      </ReviewSection>

      <ReviewSection title="Application">
        <SummaryRow label="Position" value={application.positionApplied} />
        <SummaryRow label="Expected joining date" value={application.expectedJoiningDate} />
        <SummaryRow label="Portfolio link" value={application.portfolioUrl} />
        <SummaryRow label="Cover note" value={application.coverNote} />
        <SummaryRow label="Terms accepted" value={application.acceptedTerms ? 'Yes' : 'No'} />
      </ReviewSection>
    </div>
  );
};
