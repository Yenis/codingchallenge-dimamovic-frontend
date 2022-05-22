import { Box, Button } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import * as yup from "yup";
import { useState } from "react";
import { throwError, throwMessage } from "../helpers/toastr/ToastMessages";
import { InfoBubble } from "../components/InfoBox";
import {
  TeamProps,
  useTeamsAndProjects,
} from "../helpers/customHooks/teamsAndProjectsHook";

const infoMessage = `
Teams can contain 4, 5 or 6 developers.
Multiple teams can be submitted at the same time, 
as each submit clears previous data.`;

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>();

  const { currentTeamsProjects, setTeamsAndProjects } = useTeamsAndProjects();

  const handleSubmitTeams = async () => {
    try {
      const { status } = await axios({
        method: "get",
        url: "http://localhost:3000/status",
      });

      if (!teams) {
        throwError("ERROR, Bad Request");
        return;
      }

      if (status === 200) {
        await axios({
          method: "put",
          url: "http://localhost:3000/teams",
          data: teams,
        });
        throwMessage("List of Teams Added Succesfully");
        setTeamsAndProjects({ ...currentTeamsProjects, teams: teams });
        setTeams([]);
      }
    } catch (error) {
      console.error(error);
      throwError(`ERROR, Bad Request`);
    }
  };

  const validationSchema = yup.object({
    id: yup
      .number()
      .typeError("Please enter a valid number.")
      .required("Required Field.")
      .min(0, "Team ID cannot be 0 or negative."),
    developers: yup
      .number()
      .typeError("Please enter a valid number.")
      .required("Required Field.")
      .min(4, "Teams must consist of at least 4 developers.")
      .max(6, "Teams can not have more than 6 developers."),
  });

  return (
    <Box sx={{ minWidth: { xs: "80%", sm: "60%", md: "40%" } }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="h1">
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box component="pre" sx={{ paddingLeft: 2, paddingRight: 2 }}>
              Create a list of Teams
            </Box>
            <InfoBubble message={infoMessage} />
          </Box>
        </Box>
      </Box>
      <Formik
        initialValues={{
          id: "",
          developers: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (submitData, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const newTeam: TeamProps = {
            id: parseInt(submitData.id),
            developers: parseInt(submitData.developers),
          };

          if (teams) {
            const teamAlreadyExists = teams.find(
              (team) => team.id === newTeam.id
            );
            if (teamAlreadyExists) {
              throwError(`Team with id ${teamAlreadyExists.id} already exists`);
              resetForm();
              return;
            }
            setTeams([...teams, newTeam]);
          } else {
            setTeams([newTeam]);
          }

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="id" placeholder="Team ID" />
            </Box>
            <Box>
              <InputField name="developers" placeholder="Developers" />
            </Box>
            <Box>
              <Button
                disabled={isSubmitting}
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
              >
                Add Team
              </Button>
              <Button
                disabled={!teams}
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleSubmitTeams}
              >
                Submit List of Teams
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {teams
          ? teams.map((team) => {
              return (
                <pre key={team.id}>
                  TeamID: {team.id} Developers: {team.developers}
                </pre>
              );
            })
          : null}
      </Box>
    </Box>
  );
};

export default TeamsPage;
