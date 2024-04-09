"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "@/app/components/ui/logo";
import { LinkItems } from "@/app/components/composite/nav/linkItems";
import { NavItem } from "@/app/components/composite/nav/navItems";
import Navigate from "@/app/components/ui/navigate";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) onClose();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center" gap="4">
          <Logo size="" />
          <Text fontSize="lg" fontWeight="bold">
            ...
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction="column" gap="2">
        {LinkItems.map((link) => (
          <Navigate key={link.name} href={link.href}>
            <NavItem
              bg={pathname === link.href ? "brand.primary" : ""}
              color={pathname === link.href ? "white" : ""}
              _hover={{ bg: "brand.primary", color: "white" }}
              icon={link.icon}
            >
              {link.name}
            </NavItem>
          </Navigate>
        ))}
      </Flex>
    </Box>
  );
};
