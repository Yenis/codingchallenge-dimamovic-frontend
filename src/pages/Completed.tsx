import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { InfoBubble } from "../components/InfoBox";
import { Box, Button } from "@mui/material";
import { throwError, throwMessage } from "../helpers/toastr/ToastMessages";
import DoneIcon from "@mui/icons-material/Done";
import * as yup from "yup";

interface Completed {
  isComplete: boolean;
  completedProjectID: string;
}

const notCompleted: Completed = {
  isComplete: false,
  completedProjectID: "",
};

const CompletedPage: React.FC = () => {
  const [completed, setCompleted] = useState<Completed>(notCompleted);

  const infoMessage = `
  Complete a project with the provided ID,
  Whether it has been started or not.`;

  const handleProjectComplete = async (projectID: number) => {
    try {
      const { status } = await axios.get("http://localhost:3000/status");

      if (status === 200) {
        const res = await axios({
          method: "post",
          url: "http://localhost:3000/completed",
          data: `ID=${projectID}`,
        });
        if (!res) {
          throwError(`ERROR, Project NOT FOUND`);
          setCompleted(notCompleted);
        }
        switch (res.status) {
          case 404:
            throwError(`ERROR, Project NOT FOUND`);
            setCompleted(notCompleted);
            break;
          case 200:
            throwMessage(`Project ${res.data} is completed.`);
            setCompleted({
              isComplete: true,
              completedProjectID: res.data,
            });
            break;

          default:
            throwError(`ERROR, Bad Request`);
            setCompleted(notCompleted);
        }
      }
    } catch (error) {
      console.error(error);
      throwError(`ERROR, Project NOT FOUND`);
      setCompleted(notCompleted);
    }
  };

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
          await handleProjectComplete(projectID);

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
                <DoneIcon sx={{ paddingLeft: 1, paddingRight: 1 }} />
                Complete Project
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {completed.isComplete ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box component="h1">
            <Box component="pre">
              {`Project ${completed.completedProjectID} is completed.`}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default CompletedPage;
