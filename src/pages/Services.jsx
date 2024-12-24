import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Card, Image, Text } from "@chakra-ui/react";

import { Link, useLoaderData } from "react-router-dom";

const Services = () => {
  const services = useLoaderData();

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0 mt-12">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            All Services
          </h3>
          <p className="text-center text-base md:text-lg">
            Explore our wide range of tailored services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <Card.Root
              key={service._id}
              maxW="sm"
              overflow="hidden"
              className="bg-gray-900"
            >
              <Image
                src={service.image}
                alt="Green double couch with wooden legs"
              />
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
      </div>

      <Footer />
    </div>
  );
};

export default Services;
