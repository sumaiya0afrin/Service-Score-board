import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import Navbar from "@/shared/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/shared/Footer";
import { FaGoogle } from "react-icons/fa";
import signup from "../assets/signup.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-12">
        <div className="flex flex-col lg:flex-row items-center justify-center md:w-3/4 mx-auto">
          <img src={signup} alt="" className="md:max-w-sm" />

          <div className="max-w-md mx-auto ">
            <h4 className="text-2xl text-center">Create Your Account</h4>
            <p className="text-center">
              Join us today and explore endless possibilities.
            </p>

            <div className="justify-self-center mt-4  w-full">
              <button className="btn w-full bg-transparent text-primaryColor border-primaryColor hover:bg-gray-900 hover:text-white">
                <FaGoogle />
                Sign Up with Goggle
              </button>
            </div>
            <div className="divider">OR</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="justify-items-center"
            >
              <Stack gap="4" align="flex-start" maxW="sm" className="w-full">
                <Field
                  label="Username"
                  required
                  invalid={!!errors.username}
                  errorText={errors.username?.message}
                >
                  <Input
                    type="text"
                    className="border border-primaryColor px-2"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                </Field>

                <Field label="Email" required>
                  <Input
                    type="email"
                    className="border border-primaryColor px-2"
                    {...register("email", { required: "Email is required" })}
                  />
                </Field>

                <Field label="PhotoURL" required>
                  <Input
                    type="text"
                    className="border border-primaryColor px-2"
                    {...register("photo", { required: "URL is required" })}
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

                <Button
                  type="submit"
                  className="w-full bg-primaryColor text-white"
                >
                  Submit
                </Button>
              </Stack>
            </form>

            <p className="text-center">
              Already Have an Account?{" "}
              <Link to="/signIn" className="underline">
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
