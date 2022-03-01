import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Text, Input, Progress, Button, FormControl } from "@chakra-ui/react";
import { object, string } from "yup";

import useStorage from "../hooks/useStorage";

const Schema = object().shape({
  title: string().required().label("Title"),
});

const UploadForm = React.forwardRef<HTMLInputElement>(() => {
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState(null);
  const { progress, uploadBlog, url, loading, error } = useStorage();
  const [progressState, setProgress] = useState(progress);
  const formRef = useRef(null);

  const types = ["image/png", "image/jpeg"];

  const handleSubmit = async (values) => {
    const { title } = values;
    uploadBlog(file, title);
  };

  const handleChangeFile = (e) => {
    const seletedFile = e.target.files[0];

    if (seletedFile && types.includes(seletedFile.type)) {
      setFile(seletedFile);
      setFileName(e.target.value);
      setFileError("");
    } else {
      setFile(null);
      setFileError("Please select an image file (png or jpeg)");
    }
  };

  useEffect(() => {
    if (url) {
      if (formRef.current) {
        formRef.current.resetForm();
        formRef.current.setFieldValue("title", "");
      }
      setFile(null);
      setProgress(null);
      setFileName("");
    }
  }, [url]);

  useEffect(() => {
    setProgress(progress);
  }, [progress]);

  return (
    <Formik
      initialValues={{ file: {}, title: "" }}
      onSubmit={handleSubmit}
      innerRef={formRef}
      validationSchema={Schema}>
      {({ handleChange, handleBlur, errors, touched, isValid, setFieldValue, values }) => {
        return (
          <Form>
            <FormControl id="file" marginBottom="20px">
              <input type="file" onChange={handleChangeFile} value={fileName} />
              {fileError && <Text color="tomato">{fileError}</Text>}
            </FormControl>
            <FormControl id="file" marginBottom="20px">
              <Input
                name="title"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("title", e.target.value);
                }}
                value={values.title}
                marginTop="15px"
                onBlur={handleBlur}
              />
              <Text color="tomato">{touched.title && errors.title}</Text>
            </FormControl>
            <div>{progressState > 0 && <Progress hasStripe value={progress} />}</div>

            <Button type="submit" disabled={!isValid || !file || loading}>
              Submit
            </Button>

            {error && <Text color="tomato">{error}</Text>}
          </Form>
        );
      }}
    </Formik>
  );
});

export default UploadForm;
