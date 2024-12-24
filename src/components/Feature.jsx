import { useLoaderData } from "react-router-dom";
import { Button, Card, Image, Text } from "@chakra-ui/react";
const Feature = () => {
  const services = useLoaderData();
  return (
    <div className="max-w-screen-xl mx-auto my-12 px-4 md:px-0">
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Featured Services
        </h3>
        <p className="text-center text-base md:text-lg">
          Provide detailed information about your service to attract potential
          customers.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
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
              <Button variant="solid" className="border border-dashed w-full">
                See Details
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default Feature;
