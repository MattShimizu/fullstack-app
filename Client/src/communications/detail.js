import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

export default function CommunicationDetail() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [isNew, setIsNew] = useState();

  const params = useParams();
  const history = useHistory()

  const setCommunication = (communication) => {
    setFromValue(communication.from);
    setToValue(communication.to);
    setSubjectValue(communication.subject);
    setMessageValue(communication.message);
  }

  const updateCommunication = data => {
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

  const createCommunication = data => {
    axios({
      method: 'post',
      url: '/Communications',
      data: data
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
  const handleSend = () => {
    // create new Communications object for
    // Creating or Updating
    // Id will be overwritten on Creation
    const data = {
      id: isNew ? 0 : params.id,
      from: fromValue,
      to: toValue,
      subject: subjectValue,
      message: messageValue
    }
    isNew
    ? createCommunication(data)
    : updateCommunication(data);
  }

   useEffect(() => {
     // set whether we are creating a new Communication
    setIsNew(params.id === 'new');

    // There is no data to fetch id this is a new Communication
    if(params.id !== 'new') {
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
  }
  }, [params.id, isNew]);

  
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
        onClick={() => handleSend()}>
        Send
      </Button>

      <Button variant="contained" color="secondary"
        disabled={isNew}
        onClick={() => deleteCommunication()}>
        Delete
      </Button>
  </>
  );
}
