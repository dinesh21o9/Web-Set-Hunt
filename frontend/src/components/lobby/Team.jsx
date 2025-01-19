import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Team.css";
import toast from "react-hot-toast";

export const Team = () => {
  const [createClicked, setCreateClicked] = useState(true);
  const [submit, setSubmit] = useState("Create");
  const [placeholderText, setPlaceholderText] = useState("Team Name...");
  const [teamName, setTeamName] = useState(
    localStorage.getItem("teamName") || ""
  );
  const [teamCode, setTeamCode] = useState(
    localStorage.getItem("teamCode") || ""
  );
  const [displayTeamCode, setDisplayTeamCode] = useState(teamCode !== "");
  const [hideInput, setHideInput] = useState(false); // Change initial state to false
  const [teamCreated, setTeamCreated] = useState(teamCode !== "");

  console.log('TeamCode',teamCode);
  console.log('TeamName',teamName);
  

  useEffect(() => {
    if (localStorage.getItem("teamCode")) {
      setHideInput(true);
      setCreateClicked(false);
    }
  }, []);

  const handleCreateClick = async () => {
    try {
      const response = await axios.post(
        "https://wsh.vistaran.tech/api/teamdetails/createTeam",
        {
          teamName,
        }
      );

      console.log("Team created:", response.data);
      sessionStorage.setItem("teamid", response.data.newTeam.id);
      // console.log(response.data);
      const newTeamCode = response.data.newTeam._doc.teamCode;
      const newTeamName = response.data.newTeam._doc.teamName;
      // console.log(newTeamName);
      setTeamCode(newTeamCode);
      setTeamName(newTeamName);
      setDisplayTeamCode(true);
      setHideInput(true);
      setTeamCreated(true);
      localStorage.setItem("teamCode", newTeamCode);
      localStorage.setItem("teamName", newTeamName);
      toast.success("Team Created");
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(error);
    }
  };

  const handleJoinClick = async () => {
    try {
      const response = await axios.put(
        "https://wsh.vistaran.tech/api/teamdetails/joinTeam",
        {
          teamCode: teamName,
        }
      );
      console.log("Joined team:", response.data);
      // Handle success or display a message to the user
      //localStorage.setItem('teamid', response.data.team.id);
      sessionStorage.setItem("teamid", response.data.team.id);
      const newTeamCode = response.data.team._doc.teamCode;
      const newTeamName = response.data.team._doc.teamName;
      setTeamCode(newTeamCode);
      setTeamName(newTeamName);
      setDisplayTeamCode(true);
      setHideInput(true);
      setTeamCreated(true);
      localStorage.setItem("teamCode", newTeamCode);
      localStorage.setItem("teamName", newTeamName);
      
      toast.success("Team Joined");
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error(error);
    }
  };

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async () => {
    if (createClicked) {
      await handleCreateClick();
    } else {
      await handleJoinClick();
    }
  };

  return (
    <div className="container-1 relative" >
      <div className="p-8 w-full max-w-md flex flex-col rounded-lg backdrop-blur-md bg-white bg-opacity-5 gap-12 -translate-x-10 -translate-y-5">
        {!teamCreated && (
          <div className="flex justify-around items-center h-10">
            
            <button
              className={`rounded-full font-bold text-lg inline-flex px-6 py-2  ${
                createClicked ? "clicked" : "text-white bg-slate-800 opacity-80"
              }`}
              onClick={() => {
                setCreateClicked(true);
                setSubmit("Create");
                setPlaceholderText("Team Name...");
                setDisplayTeamCode(false);
                setHideInput(false);
              }}
            >
              Create Team
            </button>
                        <button
              className={`rounded-full font-bold text-lg inline-flex px-6 py-2  ${
                createClicked ? "text-white bg-slate-800 opacity-80" : "clicked"
              }`}
              onClick={() => {
                setCreateClicked(false);
                setSubmit("Join");
                setPlaceholderText("Team Code...");
                setDisplayTeamCode(false);
                setHideInput(false);
              }}
            >
              Join Team
            </button>
            
          </div>
        )}
        <div className="bottom-1">
          {displayTeamCode && (
            <>
              <div className="box-2 flex flex-col items-center justify-around rounded-3xl gap-6 p-8">
                <h2 className="text-sky-400 text-2xl font-black tracking-wide ">
                  You are already in a team
                </h2>
                <div className="flex flex-col w-full max-w-xs">
                  <div
                    className="text-base text-white font-bold py-2 text-left"
                    htmlFor=""
                  >
                    Team Name
                  </div>
                  <div className="w-full px-2 py-2 bg-white text-cyan-800 min-w-md font-bold rounded-lg text-left">
                    {teamName}
                  </div>
                </div>
                <div className="flex flex-col w-full max-w-xs">
                  <div
                    className="text-base text-white font-bold py-2 text-left"
                    htmlFor=""
                  >
                    Team Code
                  </div>
                  <div className="w-full px-2 py-2 bg-white text-cyan-800 min-w-md font-bold rounded-lg text-left">
                    {teamCode}
                  </div>
                </div>
              </div>
            </>
          )}
          {!hideInput && (
            <div className="w-full flex flex-col items-center gap-6">
              <input
                className="focus:outline-[#33f9c4]"
                type="text"
                placeholder={placeholderText}
                value={teamName}
                onChange={handleInputChange}
              />
              <button
                className="bg-slate-700 text-white font-bold px-4 py-2 rounded-lg w-full max-w-20 uppercase inline-flex justify-center items-center tracking-tighter hover:bg-slate-700/80 transition-all ease-in-out duration-200"
                onClick={handleSubmit}
              >
                {submit}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
