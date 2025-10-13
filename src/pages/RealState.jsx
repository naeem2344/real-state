import React, { lazy, Suspense } from 'react'
const QRCode = lazy(() => import('../components/QRCode'));
const Loader = lazy(() => import('../components/Loader'));

const RealState = () => {
    return (
        <Suspense fallback={<><Loader /></>}>
            <div className='QR__container'>
                <img src='/realEstate/real-estate-image.jpg' height={400} width={600}/>
                <QRCode title="Real State QR code" url="https://real-state-six-jade.vercel.app/real-state-scanner"/>
            </div>
        </Suspense>
    )
}

export default RealState