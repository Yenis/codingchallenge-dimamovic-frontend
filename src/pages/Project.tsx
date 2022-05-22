import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { InfoBubble } from "../components/InfoBox";
import { Box, Button } from "@mui/material";
import * as yup from "yup";
import {
  ProjectProps,
  useTeamsAndProjects,
} from "../helpers/customHooks/teamsAndProjectsHook";
import { throwError, throwMessage } from "../helpers/toastr/ToastMessages";
import AddCardIcon from "@mui/icons-material/AddCard";

const ProjectsPage: React.FC = () => {
  const { currentTeamsProjects, setTeamsAndProjects } = useTeamsAndProjects();

  const infoMessage = `
  Add a single project. Project must require at least 1,
  and a maximum of 6 developers. Project will be
  assigned to the first Team available.`;

  const handleAddProject = async (newProject: ProjectProps) => {
    try {
      const { status } = await axios({
        method: "get",
        url: "http://localhost:3000/status",
      });

      if (status === 200) {
        await axios({
          method: "post",
          url: "http://localhost:3000/project",
          data: newProject,
        });

        setTeamsAndProjects({
          ...currentTeamsProjects,
          projects: [...currentTeamsProjects.projects, newProject],
        });

        throwMessage("New Project Added Succesfully");
      }
    } catch (error) {
      console.error(error);
      throwError(`ERROR, Bad Request`);
    }
  };

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
    <Box sx={{ minWidth: { xs: "80%", sm: "60%", md: "40%" } }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="h1">
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box component="pre" sx={{ paddingLeft: 2, paddingRight: 2 }}>
              Create a New Project
            </Box>
            <InfoBubble message={infoMessage} />
          </Box>
        </Box>
      </Box>
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

          await handleAddProject(newProject);

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
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
              >
                <AddCardIcon sx={{ paddingLeft: 1, paddingRight: 1 }} />
                Add New Project
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProjectsPage;
