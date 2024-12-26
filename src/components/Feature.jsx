import { Link, useLoaderData } from "react-router-dom";
import { Card, Image, Text } from "@chakra-ui/react";
const Feature = () => {
  const services = useLoaderData();
  return (
    <div className="max-w-screen-xl mx-auto my-12 px-4 lg:px-0">
      <div className="flex flex-col items-center ">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Featured Services
        </h3>
        <p className="text-center text-base md:text-lg">
          Provide detailed information about your service to attract potential
          customers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
};

export default Feature;
