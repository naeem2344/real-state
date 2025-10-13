import React, { lazy, Suspense } from 'react'
const Loader = lazy(() => import('../components/Loader'));
const QRCode = lazy(() => import('../components/QRCode'));

const AutoMobile = () => {
    return (
        <Suspense fallback={<Loader />}>
            <div className='QR__container'>
                <QRCode title = 'Auto Mobile QR code' />
            </div>
        </Suspense>
    )
}

export default AutoMobile