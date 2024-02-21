interface SubHeadingProp {
  label: string;
}

function SubHeading({ label }: SubHeadingProp) {
  return <div className="text-gray-400 m-1 text-center">{label}</div>;
}

export default SubHeading;
