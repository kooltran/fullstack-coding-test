import Head from "next/head";
import DynamicText from "components/DynamicText";
import React, { useRef } from "react";
import { Container, Input } from "@chakra-ui/react";

type InputRef = {
  changeValue: (value: string) => void;
};

const Home = () => {
  const textRef = useRef<InputRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  return (
    <Container>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <DynamicText ref={textRef} />
        <Input onChange={onChange} />
      </div>
    </Container>
  );
};

export default Home;
