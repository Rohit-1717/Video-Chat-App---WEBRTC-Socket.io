import React, { useContext, useState } from 'react';
import { Typography, Paper, Grid, Container, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../SocketContext";

// Define styled components
const ContainerStyled = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: '10px 20px',
  border: '2px solid black',
}));

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const Padding = styled(Grid)(({ theme }) => ({
  padding: 20,
}));

const Margin = styled('div')(({ theme }) => ({
  marginTop: 20,
}));

function Options({ children }) {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  // Log to verify the value of 'me'
  console.log('User ID:', me);

  // Check if me is properly defined and not false
  const userId = me || '';

  return (
    <ContainerStyled>
      <PaperStyled elevation={10}>
        <form className={Root} noValidate autoComplete='off'>
          <GridContainer container>
            <Padding item xs={12} md={6}>
              <Typography gutterBottom variant='h6'>Account Info</Typography>
              <TextField 
                label="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                fullWidth
              />
              <CopyToClipboard text={userId}>
                <Button 
                  variant='contained' 
                  color='primary' 
                  fullWidth 
                  startIcon={<Assignment fontSize='large' />}
                  onClick={() => console.log('ID copied:', userId)}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Padding>
            <Padding item xs={12} md={6}>
              <Typography gutterBottom variant='h6'>Make a call</Typography>
              <TextField 
                label="ID to call" 
                value={idToCall} 
                onChange={(e) => setIdToCall(e.target.value)} 
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={Margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={Margin}
                >
                  Call
                </Button>
              )}
            </Padding>
          </GridContainer>
        </form>
        {children}
      </PaperStyled>
    </ContainerStyled>
  );
}

export default Options;
