import { AuthContext } from "@/authProvider/AuthProvider";
import { Rating } from "@/components/ui/rating";

import { Card, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const reviews = useLoaderData();
  const [serviceMap, setServiceMap] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { control, reset } = useForm();
  // Fetch service titles
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://service-score-board-server.vercel.app/service"
        );
        const services = await res.json();
        const map = services.reduce((acc, service) => {
          acc[service._id] = service.title;
          return acc;
        }, {});
        setServiceMap(map);
      } catch (error) {
        console.error("Failed to fetch service titles:", error);
      }
    };

    fetchServices();
  }, []);

  const userReviews = reviews.filter(
    (review) => review.userMail === user.email
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00796B",
      cancelButtonColor: " #111827",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //send data to server
        fetch(`https://service-score-board-server.vercel.app/review/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Service has been deleted.",
                icon: "success",
                confirmButtonColor: "#00796B",
              });
            }
          })
          .catch((err) => {
            const notify = () => toast.error(`${err}`);
            notify();
          });
      }
    });
  };

  const handleUpdateClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true); // Open the modal
    reset({
      rating: review.rating,
      review: review.review,
    });
  };

  const handleUpdateSubmit = (data, e) => {
    e.preventDefault();

    const updatedReview = {
      ...selectedReview,
      review: data.review,
      rating: data.rating,
    };

    // Send updated review data
    fetch(
      `https://service-score-board-server.vercel.app/review/${selectedReview._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Review updated successfully") {
          Swal.fire({
            title: "Updated!",
            text: "Your service has been updated.",
            icon: "success",
          });
          setIsModalOpen(false); // Close modal
        }
      })
      .catch((err) => toast.error(`Error: ${err}`));
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-0">
        <h3 className="text-2xl md:text-3xl text-primaryColor font-semibold text-center mb-8">
          My Reviews
        </h3>
        <Card.Root className="bg-gray-900 justify-self-center max-w-2xl w-full">
          <Card.Body>
            {userReviews.length > 0 ? (
              userReviews.map((review) => (
                <Card.Root
                  className="bg-gray-900 justify-self-center text-white"
                  key={review._id}
                >
                  <Card.Body>
                    <HStack mb="6" gap="3">
                      <Stack gap="0">
                        <Text
                          fontWeight="semibold"
                          textStyle="sm"
                          className="capitalize"
                        >
                          Service title:{" "}
                          {serviceMap[review.id] || "Unknown Service"}
                        </Text>
                        <Rating
                          colorPalette="orange"
                          readOnly
                          size="xs"
                          value={review.rating}
                        />
                      </Stack>
                    </HStack>
                    <Card.Description color="gray">
                      {review.review}
                    </Card.Description>
                    <div className="flex flex-col md:flex-row md:space-x-2 justify-end mt-4 space-y-3 md:space-y-0">
                      <button
                        onClick={() => handleUpdateClick(review)}
                        className="btn bg-primaryColor text-white border-none hover:bg-gray-900 hover:text-white p-2 flex items-center justify-center "
                      >
                        <MdOutlineUpdate className="text-xl " />
                        <span className="ml-1">Update</span>
                      </button>
                      <button
                        onClick={() => handleDelete(`${review._id}`)}
                        className="btn bg-primaryColor text-white border-none hover:bg-gray-900 hover:text-white p-2 flex items-center justify-center"
                      >
                        <RiDeleteBin6Line className="text-xl" />
                        <span className="ml-1">Delete</span>
                      </button>
                    </div>
                  </Card.Body>
                  <div className="border"></div>
                </Card.Root>
              ))
            ) : (
              <Text color="white">No reviews yet.</Text>
            )}
          </Card.Body>
        </Card.Root>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <form
                onSubmit={handleSubmit(handleUpdateSubmit)}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-xl font-bold">Update Review</h2>

                {/* Service Title (Read-Only) */}
                <div className="my-4">
                  <label className="block mb-2">Service Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={serviceMap[selectedReview?.id] || "Unknown Service"}
                    readOnly
                  />
                </div>

                {/* Rating */}
                <div className="my-4">
                  <label className="block mb-2">Rating</label>
                  <Controller
                    name="rating"
                    control={control}
                    defaultValue={selectedReview?.rating || 0}
                    render={({ field }) => (
                      <Rating
                        {...field}
                        value={field.value || 0}
                        onChange={(event, value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>

                {/* Review Text */}
                <div className="my-4">
                  <label className="block mb-2">Review</label>
                  <Textarea
                    {...register("review", { required: true })}
                    defaultValue={selectedReview?.review || ""}
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                {/* Modal Actions */}
                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-primaryColor border-none"
                  >
                    Save
                  </button>
                  <button
                    className="btn bg-gray-900 border-none text-white"
                    onClick={() => setIsModalOpen(false)} // Close modal
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReview;
