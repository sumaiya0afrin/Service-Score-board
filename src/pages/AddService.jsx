import {
  Button,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { createListCollection } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useContext, useState } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
const AddService = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { register, handleSubmit } = useForm();

  const frameworks = createListCollection({
    items: [
      { label: "Health & Wellness", value: "Health & Wellness" },
      { label: "Technology & IT", value: "Technology & IT" },
      { label: "Education & Learning", value: "Education & Learning" },
      { label: "Beauty & Grooming", value: "Beauty & Grooming" },
      { label: "Food & Catering", value: "Food & Catering" },
      { label: "Travel & Tourism", value: "Travel & Tourism" },
    ],
  });

  const handleAddService = (data) => {
    const submissionDate = new Date().toISOString();
    const { image, title, company, website, price, desc } = data;
    console.log(image, title, company, website, price, desc, selectedCategory);
    console.log(submissionDate, user);
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-0">
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-2xl md:text-3xl text-primaryColor font-semibold">
            Add Your Offering
          </h3>
          <p className="text-center">
            Provide detailed information about your service to attract potential
            customers.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleAddService)}
          className="max-w-2xl mx-auto"
        >
          <Stack gap="4" align="flex-start">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Service Image" required>
                <FileUploadRoot
                  className="border border-primaryColor px-2 rounded-md"
                  {...register("image")}
                >
                  <FileUploadTrigger asChild>
                    <Button variant="outline" className="bg-white">
                      <HiUpload /> Upload file
                    </Button>
                  </FileUploadTrigger>
                  <FileUploadList />
                </FileUploadRoot>
              </Field>

              <Field label="Service Title" required>
                <Input
                  type="text"
                  className="border border-primaryColor px-2"
                  {...register("title")}
                />
              </Field>

              <Field label="Company Name" required>
                <Input
                  type="text"
                  className="border border-primaryColor px-2"
                  {...register("company")}
                />
              </Field>

              <Field label=" Website" required>
                <Input
                  type="text"
                  className="border border-primaryColor px-2"
                  {...register("website")}
                />
              </Field>

              <Field label="Price" required>
                <Input
                  type="number"
                  className="border border-primaryColor px-2"
                  {...register("price")}
                />
              </Field>

              <SelectRoot
                required
                collection={frameworks}
                onValueChange={(value) => {
                  setSelectedCategory(value); // Update state with the selected value
                }}
              >
                <SelectLabel>Category</SelectLabel>
                <SelectTrigger className="border border-primaryColor px-2">
                  <SelectValueText placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {frameworks.items.map((movie) => (
                    <SelectItem
                      item={movie}
                      key={movie.value}
                      className="hover:bg-primaryColor hover:text-white"
                      value={movie.value}
                    >
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>

              <Field label=" Description" className="md:col-span-3">
                <Textarea
                  className="border border-primaryColor px-2"
                  size="xs"
                  {...register("desc")}
                />
              </Field>
            </div>

            <Button type="submit" className="w-full bg-primaryColor text-white">
              Add Service
            </Button>
          </Stack>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddService;
