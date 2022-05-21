import { Box, Button } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import * as yup from "yup";
import { throwMessage } from "../helpers/toastr/ToastMessages";

interface ProjectProps {
  id: number | undefined;
  devs_needed: number | undefined;
}

const Projects: React.FC = () => {

  const validationSchema = yup.object({
    id: yup
      .number()
      .typeError("Please enter a valid number")
      .required("Required")
      .min(0, "Project ID cannot be 0 or negative."),
    devs_needed: yup
      .number()
      .typeError("Please enter a valid number")
      .required("Required Field.")
      .min(1, "Project must require at least 1 developer.")
      .max(6, "Projects can not require more than 6 developers."),
  });

  return (
    <>
      <h1>Create Project</h1>
      <Formik
        initialValues={{
          id: "",
          devs_needed: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (submitData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const newProject: ProjectProps = {
            id: parseInt(submitData.id),
            devs_needed: parseInt(submitData.devs_needed),
          };

          const { status } = await axios({
            method: "get",
            url: "http://localhost:3000/status"
          });

          if (status === 200) {
            await axios({
              method: "post",
              url: "http://localhost:3000/project",
              data: newProject,
            });
            throwMessage("New Project Added Succesfully")
          }

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="id" placeholder="Project ID" />
            </Box>
            <Box>
              <InputField name="devs_needed" placeholder="Devs Needed" />
            </Box>
            <Box>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Add New Project
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Projects;
