import React from "react";
import { Container, SimpleGrid, Text, Box, Image } from "@chakra-ui/react";

import useFireStore from "../hooks/useFireStore";
import UploadForm from "../components/UploadForm";
import BlogItem from "../components/BlogItem";

const Blog = () => {
  const { docs } = useFireStore("blogs");

  return (
    <Container maxW="container.lg" marginTop="40px">
      <UploadForm />
      <SimpleGrid columns={3} spacing={10} marginTop="20px">
        {docs.length > 0 && docs.map((doc) => <BlogItem key={doc.id} item={doc} />)}
      </SimpleGrid>
    </Container>
  );
};

export default Blog;
