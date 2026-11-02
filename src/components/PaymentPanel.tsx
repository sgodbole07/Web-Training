import { CheckoutMachineContext } from '../machines/CheckoutMachineContext';
import CartErrorBanner from './CartErrorBanner';

// The container subscribes to nothing; each leaf below picks its own slice of machine state.
function PaymentStatus() {
  const label = CheckoutMachineContext.useSelector((state) => {
    if (state.matches('submitting')) return 'Processing payment…';
    if (state.matches('success')) return 'Payment complete';
    return 'Ready to pay';
  });
  return <p className="status">{label}</p>;
}

function OrderConfirmation() {
  const order = CheckoutMachineContext.useSelector((state) => state.context.order);
  if (!order) return null;
  return <p className="alert success">Order #{order.id} placed.</p>;
}

function PaymentActions() {
  const actorRef = CheckoutMachineContext.useActorRef();
  const canSubmit = CheckoutMachineContext.useSelector((state) => state.can({ type: 'SUBMIT' }));
  const canCancel = CheckoutMachineContext.useSelector((state) => state.can({ type: 'CANCEL' }));
  const canReset = CheckoutMachineContext.useSelector((state) => state.can({ type: 'RESET' }));

  return (
    <div className="panel-actions">
      {canReset ? (
        <button className="btn" onClick={() => actorRef.send({ type: 'RESET' })}>
          Start New Order
        </button>
      ) : (
        <>
          <button
            className="btn"
            disabled={!canSubmit}
            onClick={() => actorRef.send({ type: 'SUBMIT' })}
          >
            Submit Payment
          </button>
          <button
            className="btn btn-secondary"
            disabled={!canCancel}
            onClick={() => actorRef.send({ type: 'CANCEL' })}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default function PaymentPanel() {
  return (
    <section className="payment-panel">
      <h2>Payment</h2>
      <PaymentStatus />
      <CartErrorBanner />
      <OrderConfirmation />
      <PaymentActions />
    </section>
  );
}
