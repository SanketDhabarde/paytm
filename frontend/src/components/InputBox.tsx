interface InputBoxProps {
  label: string;
  placeholder: string;
  type: string;
}
function InputBox({ label, placeholder, type }: InputBoxProps) {
  return (
    <label className="m-1">
      <p className="font-bold">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 w-full p-1 rounded-md my-1"
      />
    </label>
  );
}

export default InputBox;
