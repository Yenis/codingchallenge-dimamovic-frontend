import { Box, Button } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import * as yup from "yup";
import { throwMessage } from "../helpers/toastr/ToastMessages";

const Completed: React.FC = () => {
    const validationSchema = yup.object({
        ID: yup
          .number()
          .typeError("Please enter a valid number")
          .required("Required")
          .min(0, "Project ID cannot be 0 or negative."),
      });
    
      return (
        <>
          <h1>Complete a Project</h1>
          <Formik
            initialValues={{
              ID: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (submitData, { setSubmitting, resetForm }) => {
              setSubmitting(true);
    
              const projectID: number = parseInt(submitData.ID);
    
              const { status } = await axios.get("http://localhost:3000/status");
    
              if (status === 200) {
                const res = await axios({
                  method: "post",
                  url: "http://localhost:3000/completed",
                  data: `ID=${projectID}`,
                });
                if (!res)  throwMessage(`ERROR, Project NOT FOUND`);
                switch (res.status) {
                  case 404:
                    throwMessage(`ERROR, Project NOT FOUND`);
                    break;
                  case 200:
                    throwMessage(`Project ${res.data} is completed.`);
                    break;
    
                  default:
                    throwMessage(`ERROR, Project NOT FOUND`);
                }
              }
    
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box>
                  <InputField name="ID" placeholder="Find Project by ID" />
                </Box>
                <Box>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                    color="primary"
                  >
                    Complete Project
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      );
};

export default Completed;