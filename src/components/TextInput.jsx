// React 19: `ref` is a normal prop for function components, so no forwardRef().
export default function TextInput({ label, error, ref, ...inputProps }) {
  return (
    <label>
      {label}
      <input ref={ref} aria-invalid={Boolean(error)} {...inputProps} />
      {error && (
        <span className="error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
