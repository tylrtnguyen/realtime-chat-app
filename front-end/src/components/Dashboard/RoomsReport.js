import React, { useContext, useEffect } from "react";
import StaticToolbar from "./StaticToolbar";
import { CustomTable } from "./SubComponents/Table";
import { GlobalContext } from "../../context/GlobalState";
import { UseStyles } from "./UseStyles";


export default function RoomsReport() {
  const { rooms, getRooms } = useContext(GlobalContext);
  const classes = UseStyles();

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRoom = async token => {
      await getRooms(token);
    };
    fetchRoom(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
      <div className={classes.root}>
        <StaticToolbar title="Room Report" />
        <CustomTable objectArray={rooms} />
      </div>
  );
}
