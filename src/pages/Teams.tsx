import { Box, Button } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import * as yup from "yup";
import { useState } from "react";
import { throwMessage } from "../helpers/toastr/ToastMessages";

interface TeamProps {
  id: number | undefined;
  developers: number | undefined;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>();

  const handleSubmitTeams = async () => {
    const { status } = await axios({
      method: "get",
      url: "http://localhost:3000/status",
    });

    if (status === 200) {
      await axios({
        method: "put",
        url: "http://localhost:3000/teams",
        data: teams,
      });
      throwMessage("List of Teams Added Succesfully");
      setTeams([])
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
    <>
      <h1>Input Teams</h1>
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
              throwMessage(
                `Team with id ${teamAlreadyExists.id} already exists`
              );
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
                type="submit"
                variant="outlined"
                color="primary"
              >
                Add Team
              </Button>
              <Button
                disabled={!teams}
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
      {teams
        ? teams.map((team) => {
            return (
              <Box key={team.id}>
                <pre>
                  TeamID: {team.id} Developers: {team.developers}
                </pre>
              </Box>
            );
          })
        : null}
    </>
  );
};

export default Teams;
