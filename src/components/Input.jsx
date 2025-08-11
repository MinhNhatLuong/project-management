export default function Input({ isTextArea, label, ...props }) {
  return (
    <p>
      <label htmlFor="">{label}</label>
      {isTextArea ? <textarea {...props} /> : <input {...props} />}
    </p>
  );
}
