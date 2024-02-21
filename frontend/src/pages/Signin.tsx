import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

function Signin() {
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center bg-neutral-400">
      <div className="w-96 border-black rounded-lg p-3 bg-white">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />
        <InputBox type="email" label="Email" placeholder="john@gmail.com" />
        <InputBox type="password" label="Password" placeholder="123456" />
        <Button label="Sign in" />
        <ButtonWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
}

export default Signin;
