import { WIZARD_STEPS } from '../../form/steps';

type StepperProps = {
  currentIndex: number;
};

export const Stepper = ({ currentIndex }: StepperProps) => (
  <ol className="stepper" aria-label="Application progress">
    {WIZARD_STEPS.map((step, index) => {
      const state = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming';
      return (
        <li key={step.title} className={`stepper-item ${state}`} aria-current={index === currentIndex ? 'step' : undefined}>
          <span className="stepper-number">{index + 1}</span>
          <span>{step.title}</span>
        </li>
      );
    })}
  </ol>
);
