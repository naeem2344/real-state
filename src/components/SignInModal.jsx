import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';

const SignInModal = ({ setSignInModalOpenOpen, signInModalOpen, setDetails , modalKey , setIsUserTryToLogin}) => {
  const [userNumber, setUserNumber] = useState('');
  const [isUserEnterNumber, setIsUserEnterNumber] = useState(false);
  const [isValidateUser, setIsValidateUser] = useState(false);
  // const [isUserTryToLogin, setIsUserTryToLogin] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();
    setDetails(pre => ({ ...pre, contact: userNumber }))
    setIsUserEnterNumber(!isUserEnterNumber)
    setIsValidateUser(true);
    setIsUserTryToLogin(false);
  };

  const handleCountinue = (event) => {
    event.preventDefault();
    setSignInModalOpenOpen(false);
    localStorage.setItem(modalKey, 'done');
    setIsUserTryToLogin(false);
  }

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setUserNumber(value);
    setIsUserEnterNumber(value.trim().length > 0);
    setIsUserTryToLogin(true);
  };

  // console.log(isUserTryToLogin)

  return (
    <React.Fragment>
      <Dialog open={signInModalOpen} sx={{ bgcolor: 'transparent' }}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To subscribe to this offer, please enter your phone number or continue with your email address below. You’ll receive an exclusive discount upon subscribing.
          </DialogContentText>

          <TextField
            required
            margin="dense"
            value={userNumber}
            id="phone"
            name="phone"
            label="Enter your number"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleNumberChange}
          />

          <Box component={'div'} onClick={() => setIsUserTryToLogin(true)}>
            <GoogleOAuthProvider clientId="<your_client_id>" >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  setIsUserTryToLogin(false)
                  setDetails(pre => ({ ...pre, contact: "Here will be the actuall user email after provide the real client_id" }))
                }}
                onError={() => {
                  console.log('Login Failed');
                  setIsUserTryToLogin(false)
                }}
              />
            </GoogleOAuthProvider>
          </Box>

          {isUserEnterNumber && (
            <Button
              variant="contained"
              disableElevation
              onClick={handleSubmit}
              sx={{ width: '100%', mt: 3 }}
            >
              Validate
            </Button>
          )}

          {isValidateUser && <Button variant="contained" disableElevation sx={{ width: '100%', mt: 2 }} onClick={handleCountinue}>
            Continue
          </Button>}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default SignInModal