import { AuthContext } from "@/authProvider/AuthProvider";
import { InputGroup } from "@/components/ui/input-group";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
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
    console.log(id);
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
        fetch(`http://localhost:5000/service/${id}`, {
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
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg mx-auto space-y-5 mt-12">
        <HStack gap="10" width="sm" className=" justify-self-end">
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
          <Table.Root size="sm" variant="outline">
            <Table.Header className="bg-gray-900">
              <Table.Row>
                <Table.ColumnHeader>Service Title</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader>Added Date</Table.ColumnHeader>
                <Table.ColumnHeader>Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <Table.Row key={service._id}>
                    <Table.Cell>{service.title}</Table.Cell>
                    <Table.Cell>{service.category}</Table.Cell>
                    <Table.Cell>
                      {formatDate(service.submissionDate)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="join">
                        <button className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white">
                          <MdOutlineUpdate className="text-2xl" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(`${service._id}`)}
                          className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
                        >
                          <RiDeleteBin6Line className="text-2xl" />
                          Delete
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="4" className="text-center">
                    No services found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Stack>
      </div>

      <Footer />
    </div>
  );
};

export default MyServices;
