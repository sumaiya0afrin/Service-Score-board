import { AuthContext } from "@/authProvider/AuthProvider";
import { InputGroup } from "@/components/ui/input-group";

import { HStack, Input, Stack, Table } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { LuSearch } from "react-icons/lu";
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyServices = () => {
  const services = useLoaderData();
  const { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [updatedService, setUpdatedService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync initial state with services
  useEffect(() => {
    setUpdatedService(services);
  }, [services]);

  const mail = user.email;
  const myServices = updatedService.filter(
    (service) => service.userMail === mail
  );

  const filteredServices = myServices.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
        fetch(`https://service-score-board-server.vercel.app/service/${id}`, {
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

              setUpdatedService((prevServices) =>
                prevServices.filter((service) => service._id !== id)
              );
            }
          })
          .catch((err) => {
            const notify = () => toast.error(`${err}`);
            notify();
          });
      }
    });
  };
  const handleUpdateClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the backend
    fetch(
      `https://service-score-board-server.vercel.app/service/${selectedService._id}`,
      {
        method: "PUT", // or "PATCH" depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedService), // Send the updated service data
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your service has been updated.",
            icon: "success",
            confirmButtonColor: "#00796B",
            confirmButtonText: "OK",
          });

          // Update the local state with the updated service
          setUpdatedService((prevServices) =>
            prevServices.map((service) =>
              service._id === selectedService._id
                ? { ...service, ...selectedService }
                : service
            )
          );

          setIsModalOpen(false); // Close the modal after the update
        }
      })
      .catch((err) => {
        const notify = () => toast.error(`${err}`);
        notify();
      });
  };

  return (
    <div>
      <div className="max-w-screen-lg mx-auto space-y-5 mt-12 px-4 lg:px-0">
        <HStack gap="10" className=" justify-self-end md:max-w-sm">
          <InputGroup
            flex="1"
            startElement={<LuSearch />}
            className="border border-gray-900"
          >
            <Input
              placeholder="Search services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </HStack>

        <Stack gap="10">
          <div className="overflow-x-auto">
            <Table.Root variant="outline" className="w-full">
              <Table.Header className="bg-gray-900 text-white">
                <Table.Row>
                  <Table.ColumnHeader className="p-3 text-left text-sm !text-white">
                    Service Title
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="p-3 text-left text-sm !text-white">
                    Category
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="p-3 text-left text-sm !text-white">
                    Added Date
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="p-3 text-left text-sm !text-white">
                    Action
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <Table.Row key={service._id} className="hover:bg-gray-100">
                      <Table.Cell className="p-3 break-words">
                        {service.title}
                      </Table.Cell>
                      <Table.Cell className="p-3 break-words">
                        {service.category}
                      </Table.Cell>
                      <Table.Cell className="p-3 break-words">
                        {formatDate(service.submissionDate)}
                      </Table.Cell>
                      <Table.Cell className="p-3">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                          <button
                            onClick={() => handleUpdateClick(service)}
                            className="btn bg-primaryColor text-white border-none hover:bg-gray-900 hover:text-white p-2 flex items-center justify-center"
                          >
                            <MdOutlineUpdate className="text-xl hidden md:block" />
                            <span className="ml-1">Update</span>
                          </button>
                          <button
                            onClick={() => handleDelete(`${service._id}`)}
                            className="btn bg-primaryColor text-white border-none hover:bg-gray-900 hover:text-white p-2 flex items-center justify-center"
                          >
                            <RiDeleteBin6Line className="text-xl hidden md:block" />
                            <span className="ml-1">Delete</span>
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="4" className="p-3 text-center text-sm">
                      No services found
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </div>
        </Stack>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <form className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold">Update Service</h2>
                <div className="my-4">
                  <label className="block mb-2">Service Image</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.image || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <label className="block mb-2">Service Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.title || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <label className="block mb-2">Company Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.company || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <label className="block mb-2">Website</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.website || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        website: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-4">
                  <label className="block mb-2">Price</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.price || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        price: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="my-4">
                  <label className="block mb-2">Category</label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedService?.category || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Technology & IT">Technology & IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Hosting Services">Hosting Services</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Education & Learning">
                      Education & Learning
                    </option>
                    <option value="Beauty & Grooming">Beauty & Grooming</option>
                  </select>
                </div>

                <div className="my-4">
                  <label className="block mb-2">Description</label>
                  <textarea
                    type="text"
                    className="input input-bordered w-full"
                    value={selectedService?.desc || ""}
                    onChange={(e) =>
                      setSelectedService({
                        ...selectedService,
                        desc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-action">
                  <button
                    className="btn bg-primaryColor border-none"
                    onClick={handleUpdateSubmit}
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

export default MyServices;
