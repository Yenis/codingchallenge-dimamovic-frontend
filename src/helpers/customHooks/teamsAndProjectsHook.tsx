import { createContext, useContext, useMemo, useState } from "react";

export interface TeamProps {
  id: number | undefined;
  developers: number | undefined;
}

export interface ProjectProps {
  id: number | undefined;
  devs_needed: number | undefined;
}

export interface TeamsAndProjects {
  teams: Array<TeamProps>;
  projects: Array<ProjectProps>;
}

const defaultState: TeamsAndProjects = {
  teams: [],
  projects: [],
};

const CurrentTeamsAndProjects = createContext({
  currentTeamsProjects: defaultState,
  setTeamsAndProjects: (user: TeamsAndProjects) => {},
});

export const useTeamsAndProjects = () => {
  const [teamsProjects, setTeamsProjects] =
    useState<TeamsAndProjects>(defaultState);

  const currentTeamsAndProjects = useMemo(
    () => ({
      currentTeamsProjects: teamsProjects,
      setTeamsAndProjects: setTeamsProjects,
    }),
    [teamsProjects]
  );

  const { currentTeamsProjects, setTeamsAndProjects } = useContext(
    CurrentTeamsAndProjects
  );

  const TeamsAndProjectsProvider = ({ children }: any) => {
    return (
      <CurrentTeamsAndProjects.Provider value={currentTeamsAndProjects}>
        {children}
      </CurrentTeamsAndProjects.Provider>
    );
  };

  return {
    currentTeamsProjects,
    setTeamsAndProjects,
    TeamsAndProjectsProvider,
  } as const;
};
