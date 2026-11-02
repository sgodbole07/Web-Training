import { CheckoutMachineContext } from '../machines/CheckoutMachineContext';

export default function CheckoutButton() {
  const actorRef = CheckoutMachineContext.useActorRef();
  // Enabled state comes from the machine (guard + current state), not from JSX rules.
  const canSubmit = CheckoutMachineContext.useSelector((state) => state.can({ type: 'SUBMIT' }));
  const submitting = CheckoutMachineContext.useSelector((state) => state.matches('submitting'));

  return (
    <button
      className="btn btn-primary"
      disabled={!canSubmit}
      onClick={() => actorRef.send({ type: 'SUBMIT' })}
    >
      {submitting ? 'Processing…' : 'Checkout'}
    </button>
  );
}
