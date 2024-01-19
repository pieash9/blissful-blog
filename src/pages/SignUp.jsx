import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mt-20 min-h-screen">
      <div className=" flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className=" flex-1">
          <Link to="/" className=" text-4xl  font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              BlissFul
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign up with your email & password or use Goggle log in.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@example.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
              Sign Up
            </Button>
          </form>
          <div className="mt-5 text-sm">
            <span className="mr-2 ">Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
