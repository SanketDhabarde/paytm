interface HeadingProp {
  label: string;
}

function Heading({ label }: HeadingProp) {
  return <h1 className="text-3xl font-bold text-center">{label}</h1>;
}

export default Heading;
