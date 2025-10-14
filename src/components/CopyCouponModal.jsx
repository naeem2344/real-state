import React, { lazy, useEffect, useState } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'
import copy from 'copy-to-clipboard';
const ShowBrockers = lazy(() => import('./ShowBrockers'));

const CopyCouponModal = ({ couponOpen, setDetails, saveUserData, isRealEstate }) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const [coupon, setCoupon] = useState(null)

  const handleCopy = () => {
    copy(coupon)
    setDetails(pre => ({ ...pre, coupon }))
    localStorage.setItem('discount-key', 'done');
    saveUserData()
  }

  useEffect(() => {
    let code = '';
    for (let i = 0; i <= 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCoupon(code);
  }, []);


  return (
    <React.Fragment>
      <Dialog open={couponOpen} sx={{ bgcolor: 'transparent' }}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            🎉 Congratulations! You’ve unlocked your exclusive discount coupon — don’t miss out on your savings!
          </DialogContentText>
          <Typography variant="h5" textAlign={'center'}>{coupon}</Typography>

          <Button variant="contained" disableElevation sx={{ width: '100%', mt: 2 }} onClick={handleCopy}>
            Copy
          </Button>
          {isRealEstate && <ShowBrockers />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default CopyCouponModal