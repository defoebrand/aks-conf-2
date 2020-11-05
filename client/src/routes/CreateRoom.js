import React from "react";
import {
  v1 as uuid
} from "uuid";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
    const logo = document.querySelector('.App-logo');
    document.remove(logo);
  }

  return ( <
    button onClick = {
      create
    } > Create Room < /button>
  );
}

export default CreateRoom;