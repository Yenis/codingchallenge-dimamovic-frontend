import { Box, Button } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import * as yup from "yup";
import { throwMessage } from "../helpers/toastr/ToastMessages";
import { InfoBubble } from "../components/InfoBox";

const infoMessage = `
Complete a project with the provided ID,
Whether it has been started or not.
`;

const Completed: React.FC = () => {
  const validationSchema = yup.object({
    ID: yup
      .number()
      .typeError("Please enter a valid number")
      .required("Required")
      .min(0, "Project ID cannot be 0 or negative."),
  });

  return (
    <Box sx={{ minWidth: { xs: "80%", sm: "60%", md: "40%" } }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="h1">
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box component="pre" sx={{ paddingLeft: 2, paddingRight: 2 }}>
              Complete a Project
            </Box>
            <InfoBubble message={infoMessage} />
          </Box>
        </Box>
      </Box>
      <Formik
        initialValues={{
          ID: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (submitData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const projectID: number = parseInt(submitData.ID);

          try {
            const { status } = await axios.get("http://localhost:3000/status");

            if (status === 200) {
              const res = await axios({
                method: "post",
                url: "http://localhost:3000/completed",
                data: `ID=${projectID}`,
              });
              if (!res) throwMessage(`ERROR, Project NOT FOUND`);
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
          } catch (error) {
            console.error(error);
            throwMessage(`ERROR, Project NOT FOUND`);
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
                fullWidth
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
    </Box>
  );
};

export default Completed;
