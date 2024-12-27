import { Card, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Services = () => {
  const services = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories from services
  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  // Filter services based on selected category and search term
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.company &&
        service.company.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0 mt-12">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            All Services
          </h3>
          <p className="text-center text-base md:text-lg">
            Explore our wide range of tailored services.
          </p>
        </div>

        {/* Search bar and dropdown for selecting category */}
        <div className="flex mb-6 lg:w-96 justify-self-end">
          <input
            type="text"
            placeholder="Search services..."
            className="p-2 border rounded w-2/3 bg-gray-900 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded bg-gray-900 text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Display filtered services */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredServices.map((service) => (
            <Card.Root
              key={service._id}
              maxW="sm"
              overflow="hidden"
              className="bg-gray-900 text-white"
            >
              <Image src={service.image} alt={service.title} />
              <Card.Body gap="2">
                <Card.Title>{service.title}</Card.Title>
                <Card.Description>{service.desc}</Card.Description>
                <Text
                  textStyle="2xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  ${service.price}
                </Text>
                <p className="text-sm">Category: {service.category}</p>
                <p className="text-sm">Company: {service.company}</p>
              </Card.Body>
              <Card.Footer gap="2">
                <Link
                  to={`/service-details/${service._id}`}
                  variant="solid"
                  className="btn w-full bg-transparent border-primaryColor text-primaryColor border-dashed uppercase hover:bg-gray-900 hover:text-white"
                >
                  See Details
                </Link>
              </Card.Footer>
            </Card.Root>
          ))}
        </div>

        {/* Message if no services found */}
        {filteredServices.length === 0 && (
          <p className="text-center text-lg mt-6">
            No services found for this search or category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
