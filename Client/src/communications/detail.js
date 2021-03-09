import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

export default function CommunicationDetail() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const params = useParams();
  const history = useHistory()

  const setCommunication = (communication) => {
    setFromValue(communication.from);
    setToValue(communication.to);
    setSubjectValue(communication.subject);
    setMessageValue(communication.message);
  }

  const sendCommunication = data => {
    axios({
      method: 'put',
      url: '/Communications',
      data: data
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  const deleteCommunication = () => {
    axios({
      method: 'delete',
      url: `/Communications/${params.id}`
    })
    .then(function (response) {
      // handle success
      console.log(response);
      // Redirect to home
      history.push("/");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

   useEffect(() => {
    axios.get(`/Communications/${params.id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      setCommunication(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }, [params.id]);

  
  return (
    <>
    <p></p>
      <TextField
        id="from"
        label="From"
        variant="outlined"
        required={true}
        InputLabelProps={{ shrink: true }}
        value={fromValue}
        onChange={(event) => setFromValue(event.target.value)}
      />
      <TextField
        id="to"
        label="To"
        variant="outlined"
        required={true}
        InputLabelProps={{ shrink: true }}
        value={toValue}
        onChange={(event) => setToValue(event.target.value)}
      />
      <TextField
        id="subject"
        label="Subject"
        variant="outlined"
        required={true}
        InputLabelProps={{ shrink: true }}
        value={subjectValue}
        onChange={(event) => setSubjectValue(event.target.value)}
      />
        <TextField
        id="message"
        label="Message"
        variant="outlined"
        required={true}
        InputLabelProps={{ shrink: true }}
        value={messageValue}
        onChange={(event) => setMessageValue(event.target.value)}
        />

      <Button variant="contained" color="primary"
        onClick={() => sendCommunication({
          id: params.id,
          from: fromValue,
          to: toValue,
          subject: subjectValue,
          message: messageValue
        })}>
        Send
      </Button>

      <Button variant="contained" color="secondary"
        onClick={() => deleteCommunication()}>
        Delete
      </Button>
  </>
  );
}
