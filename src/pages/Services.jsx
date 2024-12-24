import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Button, Card, Image, Text } from "@chakra-ui/react";

import { useLoaderData } from "react-router-dom";

const Services = () => {
  const services = useLoaderData();

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
        <h2>{services.length}</h2>

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
                <Button variant="solid" className="border border-dashed w-full">
                  See Details
                </Button>
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
