import React, { useState, useEffect } from "react";
import { ChakraProvider, SimpleGrid, Container, Box, Text, VStack, Spinner, Table, Thead, Tbody, Tr, Th, Td, Link as ChakraLink } from "@chakra-ui/react";
import getEnvironment from '../getenvironment';
import { Navigate, useNavigate } from 'react-router-dom';
const apiUrl = getEnvironment();

const AllocatedRolesPage = () => {
  const navigate = useNavigate();
  const [allocatedRoles, setAllocatedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    //we can use different url to fetch the current works
    const fetchAllocatedRoles = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/getuser`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch allocated roles");
        }

        const userdetails = await response.json();
        console.log('Fetched user details:', userdetails); // Log the fetched data
        const excludedRoles = ["Reviewer", "Author"];
        setAllocatedRoles(userdetails.user.role.filter(role => !excludedRoles.includes(role))); // Filter out empty roles
        setUser(userdetails.user);
      } catch (error) {
        console.error("Error fetching allocated roles:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllocatedRoles();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ChakraProvider>
    <Container maxW="container.lg">
      <Box p={4}>
        {isLoading ? (
          <Spinner />
        ) : (
          <VStack spacing={4} align="center">
            {user && (
              <>
                <Text fontSize="xl">Welcome, {user.email}!</Text>
                <Text fontSize="50px" color={"red"}>In this page we can post the tasks</Text>
                <Text fontSize="50px" color={"green"}>And make a common submission page</Text>
              </>
            )}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
              {allocatedRoles.map((role, index) => (
                <Box
                  key={index}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  bg="white"
                  w="100%"
                >
                  <Text fontSize="sm" color="gray.500">
                    S.No: {index + 1}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" mt={2}>
                    {role === "ITTC" && "Institute Time Table Coordinator"}
                    {role === "DTTI" && "Department Time Table Coordinator"}
                    {role === "CM" && "Event Certificate Manager"}
                    {role === "admin" && "XCEED Super User"}
                    {role === "EO" && "Event Organiser"}
                    {role === "editor" && "Paper Review Management"}
                    {role === "PRM" && "PRM"}
                    {role === "FACULTY" && "Faculty"}
                  </Text>
                  <ChakraLink
                    href={
                      role === "ITTC"
                        ? "/tt/admin"
                        : role === "DTTI"
                        ? "/tt/dashboard"
                        : role === "CM"
                        ? "/cm/dashboard"
                        : role === "admin"
                        ? "/superadmin"
                        : role === "EO"
                        ? "/cf/dashboard"
                        : role === "editor"
                        ? "/prm/dashboard"
                        : role === "FACULTY" || role === "PRM"
                        ? "/prm/home"
                        : "#"
                    }
                    color="teal.500"
                    mt={4}
                    display="block"
                  >
                    {role === "ITTC" && "Go to ITTC Admin Page"}
                    {role === "DTTI" && "Go to Time Table Dashboard"}
                    {role === "CM" && "Go to Certificate Management Dashboard"}
                    {role === "admin" && "Go to XCEED Admin Dashboard"}
                    {role === "EO" && "Go to Event Manager"}
                    {role === "editor" && "Go to Review Manager"}
                    {role === "FACULTY" && "Go to Faculty Page"}
                    {role === "PRM" && "Go to PRM Home"}
                  </ChakraLink>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </Box>
    </Container>
  </ChakraProvider>
  );
};

export default AllocatedRolesPage;
