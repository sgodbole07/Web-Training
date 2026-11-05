import { useEffect, useRef, useState, type FormEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import {
  ApplicationValidationError,
  submitApplication,
} from '../../api/applicationApi';
import { createDefaultValues } from '../../form/defaults';
import { collectFieldPaths } from '../../form/fieldPaths';
import { REVIEW_STEP_INDEX, WIZARD_STEPS, stepIndexForSection } from '../../form/steps';
import { applicationFormSchema, type ApplicationFormValues } from '../../schemas/applicationForm';
import { ApplicationDetailsStep } from './steps/ApplicationDetailsStep';
import { EducationStep } from './steps/EducationStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { PersonalDetailsStep } from './steps/PersonalDetailsStep';
import { ReviewStep } from './steps/ReviewStep';
import { Stepper } from './Stepper';
import { SubmissionSuccess } from './SubmissionSuccess';

type FormPath = FieldPath<ApplicationFormValues>;

type SubmissionState =
  | { kind: 'editing' }
  | { kind: 'submitting' }
  | { kind: 'server-error' }
  | { kind: 'submitted'; applicationId: string };

type FocusRequest = {
  path?: FormPath;
};

const ALL_SECTIONS = WIZARD_STEPS.flatMap((step) => step.sections);

const SUBMIT_GUARD_MS = 500;

const renderStep = (index: number) => {
  switch (index) {
    case 0:
      return <PersonalDetailsStep />;
    case 1:
      return <EducationStep />;
    case 2:
      return <ExperienceStep />;
    case 3:
      return <ApplicationDetailsStep />;
    default:
      return <ReviewStep />;
  }
};

export const ApplicationWizard = () => {
  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: createDefaultValues(),
    mode: 'onTouched',
  });
  const { trigger, handleSubmit, setError, setFocus, getFieldState, getValues, reset } = methods;

  const [stepIndex, setStepIndex] = useState(0);
  const [submission, setSubmission] = useState<SubmissionState>({ kind: 'editing' });
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!focusRequest) {
      return;
    }
    if (focusRequest.path) {
      setFocus(focusRequest.path);
    } else {
      headingRef.current?.focus();
    }
  }, [focusRequest, setFocus]);

  const findFirstInvalidPath = (sections: readonly string[]): FormPath | undefined =>
    collectFieldPaths(getValues(), sections).find((path) => getFieldState(path).invalid);

  const lastStepChangeAt = useRef(0);

  const moveToStep = (index: number) => {
    lastStepChangeAt.current = Date.now();
    setStepIndex(index);
    setFocusRequest({});
  };

  const focusField = (path: FormPath) => {
    const sectionName = path.split('.')[0] ?? '';
    setStepIndex(Math.max(stepIndexForSection(sectionName), 0));
    setFocusRequest({ path });
  };

  const moveToNextStep = async () => {
    lastStepChangeAt.current = Date.now();
    const sections = WIZARD_STEPS[stepIndex]?.sections ?? [];
    const isStepValid = await trigger(sections);
    if (isStepValid) {
      moveToStep(stepIndex + 1);
      return;
    }
    setFocusRequest({ path: findFirstInvalidPath(sections) });
  };

  const moveToPreviousStep = () => {
    moveToStep(Math.max(stepIndex - 1, 0));
  };

  const handleValidSubmit = async (values: ApplicationFormValues) => {
    setSubmission({ kind: 'submitting' });
    try {
      const result = await submitApplication(values);
      setSubmission({ kind: 'submitted', applicationId: result.applicationId });
    } catch (error) {
      if (error instanceof ApplicationValidationError) {
        error.fieldErrors.forEach(({ field, message }) => {
          setError(field as FormPath, { type: 'server', message });
        });
        setSubmission({ kind: 'editing' });
        const firstField = error.fieldErrors[0];
        if (firstField) {
          focusField(firstField.field as FormPath);
        }
        return;
      }
      setSubmission({ kind: 'server-error' });
    }
  };

  const handleInvalidSubmit = () => {
    const path = findFirstInvalidPath(ALL_SECTIONS);
    if (path) {
      focusField(path);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (stepIndex < REVIEW_STEP_INDEX) {
      event.preventDefault();
      void moveToNextStep();
      return;
    }
    if (Date.now() - lastStepChangeAt.current < SUBMIT_GUARD_MS) {
      event.preventDefault();
      return;
    }
    void handleSubmit(handleValidSubmit, handleInvalidSubmit)(event);
  };

  const startOver = () => {
    reset(createDefaultValues());
    setSubmission({ kind: 'editing' });
    moveToStep(0);
  };

  if (submission.kind === 'submitted') {
    return <SubmissionSuccess applicationId={submission.applicationId} onStartOver={startOver} />;
  }

  const isSubmitting = submission.kind === 'submitting';
  const currentStep = WIZARD_STEPS[stepIndex];

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleFormSubmit} aria-busy={isSubmitting}>
        <Stepper currentIndex={stepIndex} />
        <h2 ref={headingRef} tabIndex={-1} className="step-heading">
          {currentStep?.title}
        </h2>
        <p className="step-count">
          Step {stepIndex + 1} of {WIZARD_STEPS.length}
        </p>

        {renderStep(stepIndex)}

        {submission.kind === 'server-error' && (
          <p role="alert" className="form-alert">
            Something went wrong on our side. Your answers are still here, so please try submitting again.
          </p>
        )}

        <div className="actions">
          {stepIndex > 0 && (
            <button type="button" className="secondary" onClick={moveToPreviousStep} disabled={isSubmitting}>
              Back
            </button>
          )}
          {stepIndex < REVIEW_STEP_INDEX ? (
            <button type="button" onClick={() => void moveToNextStep()}>
              Next
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit application'}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
