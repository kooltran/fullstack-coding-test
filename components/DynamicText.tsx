import React, { useState, useImperativeHandle, useRef } from "react";
import { Text } from "@chakra-ui/react";

type InputRef = {
  changeValue: (value: string) => void;
};

const DynamicText = React.forwardRef<InputRef>((props, ref) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue: (newValue: string) => {
      setValue(newValue);
    },
  }));

  return (
    <Text ref={textRef} fontSize="lg" padding="20px">
      {value}
    </Text>
  );
});

export default DynamicText;
