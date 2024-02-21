interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  return (
    <button className="w-full my-2 p-2 rounded-md bg-black text-white">
      {label}
    </button>
  );
}

export default Button;
