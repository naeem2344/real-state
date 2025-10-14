import { Box, Button, Modal, Typography, Link as MuiLink } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  textAlign: 'center',
};

const dealers = [
  { name: 'Braman Bugatti Miami', path: 'https://www.bugatti.com/en/partners' },
  { name: 'Manhattan Motorcars', path: 'https://www.miamibugatti.com/' },
  { name: 'Bugatti Scottsdale & Phoenix', path: 'https://www.manhattanmotorcars.com/bugatti/' },
  { name: 'Miller Motorcars', path: 'https://www.manhattanmotorcars.com/bugatti/' },
];

const ShowBrockers = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 3, width: '100%' }}>
        List of Dealers
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Official Bugatti Dealers
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Find your nearest authorized Bugatti dealer:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {dealers.map((dealer, index) => (
              <MuiLink
                key={index}
                component={Link}
                to={dealer.path}
                underline="none"
                target='_blank'
                sx={{
                  p: 1,
                  borderRadius: 1,
                  textAlign: 'center',
                  bgcolor: 'grey.100',
                  color: 'text.primary',
                  fontWeight: 500,
                  transition: '0.3s',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                {dealer.name}
              </MuiLink>
            ))}
          </Box>

          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ mt: 3 , mb: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ShowBrockers;
