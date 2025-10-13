import React from 'react'
import {QRCodeSVG} from 'qrcode.react'

const QRCode = ({title , url}) => {
  return (
    <div>
        <p>{title}</p>
        <QRCodeSVG size={200} value={url} />
    </div>
  )
}

export default QRCode