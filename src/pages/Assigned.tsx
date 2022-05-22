import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { InfoBubble } from "../components/InfoBox";
import { Box, Button } from "@mui/material";
import { throwError, throwMessage } from "../helpers/toastr/ToastMessages";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import * as yup from "yup";

interface Assigned {
  isFound: boolean;
  isAssigned: boolean;
  assignedID: string;
}

const notAssigned: Assigned = {
  isFound: true,
  isAssigned: false,
  assignedID: "",
};

const notFound: Assigned = {
  isFound: false,
  isAssigned: false,
  assignedID: "",
};

const AssignedPage: React.FC = () => {
  const [assigned, setAssigned] = useState<Assigned>(notFound);

  const infoMessage = `
  Provide a project ID,
  and find a Team that this project is assigned to,
  or no Team if the project is not assigned.`;

  const handleAssignProject = async (projectID: number) => {
    try {
      const { status } = await axios.get("http://localhost:3000/status");

      if (status === 200) {
        const res = await axios({
          method: "post",
          url: "http://localhost:3000/assigned",
          data: `ID=${projectID}`,
        });
        if (!res) {
          throwError(`ERROR, Project NOT FOUND`);
          setAssigned(notFound);
        }
        switch (res.status) {
          case 404:
            throwError(`ERROR, Project NOT FOUND`);
            setAssigned(notFound);
            break;
          case 204:
            throwMessage(`Project is not assigned to any Team yet...`);
            setAssigned(notAssigned);
            break;
          case 200:
            throwMessage(`Project is assigned to Team: ${res.data}`);
            setAssigned({
              isFound: true,
              isAssigned: true,
              assignedID: res.data,
            });
            break;

          default:
            throwError(`ERROR, Bad Request`);
            setAssigned(notFound);
        }
      }
    } catch (error) {
      console.error(error);
      throwError(`ERROR, Project NOT FOUND`);
      setAssigned(notFound);
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
              Get Project Info
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
          await handleAssignProject(projectID);

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
                <FindInPageIcon sx={{ paddingLeft: 1, paddingRight: 1 }} />
                Find Project
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {assigned.isFound ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box component="h1">
            <Box component="pre">
              {assigned.isAssigned
                ? `Project is Assigned to Team ${assigned.assignedID}`
                : "Project is not assigned to any Team yet"}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default AssignedPage;
