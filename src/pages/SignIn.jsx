import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";

import { useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "react-toastify";
import auth from "@/firebase/firebase.config";

const SignIn = () => {
  const [error, setError] = useState("");
  const { SignIn, setUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const location = useLocation();
  const navigate = useNavigate();
  const notify = () => toast.success("User Signed In successfully!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    SignIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        notify();
      })
      .catch((error) => {
        const errorMessage = error.message;

        setError("Invalid credential");
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => toast.error(`Error: ${err}`));
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-center md:w-3/4 mx-auto">
          <img src={signup} alt="" className="md:max-w-sm" />

          <div className="max-w-md mx-auto ">
            <h4 className="text-xl md:text-2xl text-center">
              Create Your Account
            </h4>
            <p className="text-center">
              Join us today and explore endless possibilities.
            </p>

            <div className="justify-self-center mt-4  w-full">
              <button
                onClick={signInWithGoogle}
                className="btn w-full bg-transparent text-primaryColor border-primaryColor hover:bg-gray-900 hover:text-white"
              >
                <FaGoogle />
                Sign In with Google
              </button>
            </div>
            <div className="divider">OR</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="justify-items-center"
            >
              <Stack gap="4" align="flex-start" maxW="sm" className="w-full">
                <Field label="Email" required>
                  <Input
                    type="email"
                    className="border border-primaryColor px-2"
                    {...register("email", { required: "Email is required" })}
                  />
                </Field>

                <Field
                  label="Password"
                  required
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <Input
                    className="border border-primaryColor px-2"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </Field>
                {error ? <p className="text-red-500">{error}</p> : " "}

                <Button
                  type="submit"
                  className="w-full bg-primaryColor text-white"
                >
                  Submit
                </Button>
              </Stack>
            </form>

            <p className="text-center">
              Don&apos;t Have an Account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
