import { Badge, Box, Card, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import { Avatar } from "@/components/ui/avatar";

import { Rating } from "@/components/ui/rating";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";

const formSchema = z.object({
  rating: z.number({ required_error: "Rating is required" }).min(1).max(5),
  review: z.string().optional(),
});

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const service = useLoaderData();
  const [reviews, setReviews] = useState([]);

  const notify = () => toast.success("Review Added successfully!");
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    fetch(`http://localhost:5000/review`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);
  const id = service._id;
  const userName = user.displayName;
  const userPhoto = user.photoURL;

  const filteredReviews = reviews.filter((review) => review.id === id);

  // Helper function to format the date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddReview = (data) => {
    const submissionDate = new Date().toISOString();
    const { rating, review } = data;
    const id = service._id;
    const userMail = user.email;

    const newReview = {
      rating,
      review,
      submissionDate,
      id,
      userMail,
      userName,
      userPhoto,
    };
    console.log(
      "Form Data:",
      data.rating,
      data.review,
      id,
      userMail,
      userName,
      userPhoto
    );

    //send data to server
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          notify();
        }
      })
      .catch((err) => {
        const notify = () => toast.success(`${err}`);
        notify();
      });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto space-y-3 mt-8 px-4 md:px-0">
        <Card.Root
          overflow="hidden"
          className="bg-gray-900 justify-self-center max-w-2xl flex-col md:flex-row"
        >
          <Image
            objectFit="cover"
            src={service.image}
            alt={service.title}
            className="md:max-w-[200px]"
          />
          <Box>
            <Card.Body>
              <Card.Title mb="2">{service.title}</Card.Title>
              <Card.Description>{service.desc}</Card.Description>
              <HStack mt="4">
                <Badge>{service.category}</Badge>
              </HStack>
            </Card.Body>
          </Box>
        </Card.Root>

        <Card.Root className=" bg-gray-900 justify-self-center max-w-2xl">
          <Card.Body>
            <form onSubmit={handleSubmit(handleAddReview)}>
              <HStack gap="10" width="full" className="!flex-col md:!flex-row">
                <Field
                  required
                  label="Rating"
                  invalid={!!errors.rating}
                  errorText={errors.rating?.message}
                >
                  <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <Rating
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                      />
                    )}
                  />
                </Field>
                <Field label="Review" required>
                  <Textarea
                    placeholder="Start typing..."
                    variant="outline"
                    className="border border-white p-2"
                    {...register("review")}
                  />
                </Field>
              </HStack>
              <Button
                size="sm"
                type="submit"
                className="border border-dashed w-full mt-4"
              >
                Submit
              </Button>
            </form>

            <h2 className="mt-4">Total Reviews: {filteredReviews.length}</h2>

            {reviews.length > 0 ? (
              reviews
                .filter((review) => review.id === id) // Filter reviews by serviceId
                .map((review) => (
                  <Card.Root
                    className="bg-gray-900 justify-self-center"
                    key={review._id}
                  >
                    <Card.Body>
                      <HStack mb="6" gap="3">
                        <Avatar
                          src={review.userPhoto}
                          name={review.userMail} // Assuming userMail is the reviewer name
                        />
                        <Stack gap="0">
                          <Text
                            fontWeight="semibold"
                            textStyle="sm"
                            className="capitalize"
                          >
                            {review.userName}
                          </Text>
                          <Rating
                            colorPalette="orange"
                            readOnly
                            size="xs"
                            value={review.rating}
                          />
                          <Text color="gray" textStyle="xs">
                            {formatDate(review.submissionDate)}
                          </Text>
                        </Stack>
                      </HStack>
                      <Card.Description>{review.review}</Card.Description>
                    </Card.Body>
                  </Card.Root>
                ))
            ) : (
              <Text>No reviews yet.</Text>
            )}
          </Card.Body>
        </Card.Root>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
