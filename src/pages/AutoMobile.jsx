import React, { lazy, Suspense } from 'react'
const Loader = lazy(() => import('../components/Loader'));
const QRCode = lazy(() => import('../components/QRCode'));

const AutoMobile = () => {
    return (
        <Suspense fallback={<Loader />}>
            <div className='QR__container'>
                <img src='/autoMobile/target-image.jpg' height={400} width={600}/>
                <QRCode title = 'Auto Mobile QR code' url="https://real-state-six-jade.vercel.app/auto-moble-scanner" />
            </div>
        </Suspense>
    )
}

export default AutoMobile