import { Grid, GridItem } from "@chakra-ui/react";
import {
  MdCardTravel,
  MdCastForEducation,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { SiGooglemarketingplatform, SiStyledcomponents } from "react-icons/si";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BiWebcam } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
const Category = () => {
  return (
    <div className="mb-28 px-4 lg:px-0">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-center">
        <em>Explore Our Categories</em>
      </h2>

      <div className="max-w-4xl mx-auto">
        <Grid
          className="!block md:!grid"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={3} colSpan={1}>
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <MdOutlineHealthAndSafety className="text-2xl" />
              <h4 className="text-center">Health & Wellness</h4>
            </div>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2}>
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <GrTechnology className="text-2xl" />
              <h4 className="text-center">Technology & IT</h4>
            </div>
          </GridItem>
          <GridItem colSpan={4} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <SiGooglemarketingplatform className="text-2xl" />
              <h4 className="text-center">Marketing</h4>
            </div>
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <HiOutlinePhotograph className="text-2xl" />
              <h4 className="text-center">Photography</h4>
            </div>
          </GridItem>
          <GridItem colSpan={3} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <BiWebcam className="text-2xl" />
              <h4 className="text-center">Hosting Services</h4>
            </div>
          </GridItem>

          <GridItem colSpan={2} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <IoHomeOutline className="text-2xl" />
              <h4 className="text-center">Home Services</h4>
            </div>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <MdCastForEducation className="text-2xl" />
              <h4 className="text-center">Education & Learning</h4>
            </div>
          </GridItem>
          <GridItem rowSpan={2} colSpan={3} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <SiStyledcomponents className="text-4xl" />
              <h4 className="text-center">Beauty & Grooming</h4>
            </div>
          </GridItem>
          <GridItem colSpan={4} className="border">
            <div className="justify-items-center border border-gray-900 h-full p-3 ">
              <MdCardTravel className="text-2xl" />
              <h4 className="text-center">Travel & Tourism</h4>
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default Category;
