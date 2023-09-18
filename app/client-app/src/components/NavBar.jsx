import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BrandLink = () => {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <Heading p={2} size="lg">
        {t("buttons.brand")}
      </Heading>
    </Link>
  );
};

export const NavBar = () => (
  <Flex
    px={4}
    boxShadow="section-h"
    zIndex={1000}
    bgGradient="radial(circle 400px at top left, cyan.600, blue.900)"
    color="white"
    justify="center"
  >
    <BrandLink />
  </Flex>
);
