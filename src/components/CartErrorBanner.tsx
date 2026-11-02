import { CheckoutMachineContext } from '../machines/CheckoutMachineContext';

export default function CartErrorBanner() {
  const error = CheckoutMachineContext.useSelector((state) => state.context.error);
  if (!error) return null;
  return <p className="alert error">{error}</p>;
}
