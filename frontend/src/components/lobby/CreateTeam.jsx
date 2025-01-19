import React from 'react'
import "../../css/CreateTeam.css"
function CreateTeam() {
  return (
    <div className='container-2'>
      <div className="box-2">
        <div className="para">You are already in a team</div>
        <form action="">
            <label className='label' htmlFor="">Team Name</label>
            <input type="text" readOnly />
        </form>
        <form action="">
            <label className='label' htmlFor="">Team Code</label>
            <input type="text" readOnly />
        </form>
        </div>
    </div>
  );
}

export default CreateTeam;