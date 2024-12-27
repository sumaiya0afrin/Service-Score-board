import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import signup from "../assets/signup.png";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/firebase/firebase.config";

const Register = () => {
  const { createUser, setUser, updatedUserProfile } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = () => toast.success("User created successfully!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, photo, username } = data;

    const newUser = {
      Username: username,
      PhotoURL: photo,
    };

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updatedUserProfile({
          displayName: username,
          photoURL: photo,
        });

        navigate(location?.state ? location.state : "/");
        //send data to server
        fetch("https://service-score-board-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              notify();
            }
          });
      })
      .catch((err) => toast.error(`Error: ${err}`));
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate(location?.state ? location.state : "/");
        notify();
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
                onClick={signUpWithGoogle}
                className="btn w-full bg-transparent text-primaryColor border-primaryColor hover:bg-gray-900 hover:text-white"
              >
                <FaGoogle />
                Sign Up with Google
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
                      validate: {
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must have at least one uppercase letter",
                        hasLowercase: (value) =>
                          /[a-z]/.test(value) ||
                          "Password must have at least one lowercase letter",
                        minLength: (value) =>
                          value.length >= 6 ||
                          "Password must be at least 6 characters long",
                      },
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
    </div>
  );
};

export default Register;
