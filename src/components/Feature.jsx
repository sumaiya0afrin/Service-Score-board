import { Link, useLoaderData } from "react-router-dom";
import { Card, Image, Text } from "@chakra-ui/react";
const Feature = () => {
  const services = useLoaderData();
  return (
    <div className="max-w-screen-xl mx-auto pb-14 md:pb-20 lg:pb-24 px-4 lg:px-0">
      <div className="flex flex-col items-center ">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          Featured Services
        </h3>
        <p className="text-center text-base md:text-lg">
          Provide detailed information about your service to attract potential
          customers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {services.map((service) => (
          <Card.Root
            key={service._id}
            maxW="sm"
            overflow="hidden"
            className="bg-gray-900 text-white flex flex-col h-full"
          >
            <Image src={service.image} alt={service.title} className="w-full" />
            <Card.Body className="flex flex-col flex-grow gap-2">
              <Card.Title className="text-lg font-semibold">
                {service.title}
              </Card.Title>
              <Card.Description className="text-gray-400 flex-grow">
                {service.desc}
              </Card.Description>
              <Text
                textStyle="2xl"
                fontWeight="medium"
                letterSpacing="tight"
                className="mt-auto"
              >
                ${service.price}
              </Text>
            </Card.Body>
            <Card.Footer className="mt-auto">
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
