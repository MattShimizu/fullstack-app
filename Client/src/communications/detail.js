import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { useParams } from "react-router";

export default function CommunicationDetail() {
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [subjectValue, setSubjectValue] = useState();
  const [messageValue, setMessageValue] = useState();

  const params = useParams();

  const setCommunication = (communication) => {
    setFromValue(communication.from);
    setToValue(communication.to);
    setSubjectValue(communication.subject);
    setMessageValue(communication.message);
  }

  const getCommunication = () => {

    axios.get(`/Communications/${params.id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setCommunication(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const sendCommunication = data => {
    axios({
      method: 'post',
      url: '/',
      data
    });
  }

   useEffect(() => {
    getCommunication();
  }, []);

  
    // TODO: Show From, To, Subject, and Message fields. Allow for Create, Update, and Delete
  return (
    <>
      <TextField
        id="from"
        label="From"
        variant="outlined"
      />
      <Button variant="contained" color="secondary">
        Delete
      </Button>
      <Button variant="contained" color="primary">
        Send
      </Button>
  </>
  );
}
