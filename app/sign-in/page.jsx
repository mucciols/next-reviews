import SignInForm from "@/components/SignInForm";
import Heading from "../../components/Heading";

export const metadata = { 
  title: "Sign in",
}

export default function SignInPage() {
  return (
    <>
      <Heading>About</Heading>
      <SignInForm />
    </>
  );
}