import { Flex, HStack, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BrandLink = () => {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <HStack>
        <Image
          h="71px"
          src="/assets/eq_logo.jpg"
          alt="Equine Castration logo"
        />
        <Heading p={2} size="md">
          {t("buttons.brand")}
        </Heading>
      </HStack>
    </Link>
  );
};

export const NavBar = () => (
  <Flex
    px={4}
    boxShadow="section-h"
    zIndex={1000}
    bgGradient="radial(circle 1200px at top left, #32afb5, blue.900)"
    color="white"
  >
    <BrandLink />
  </Flex>
);
