import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signup() {
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center bg-neutral-400">
      <div className="w-96 border-black rounded-lg p-3 bg-white">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox type="text" label="First Name" placeholder="John" />
        <InputBox type="text" label="Last Name" placeholder="Doe" />
        <InputBox type="email" label="Email" placeholder="john@gmail.com" />
        <InputBox type="password" label="Password" placeholder="123456" />
        <Button label="Sign up" />
        <ButtonWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}

export default Signup;
