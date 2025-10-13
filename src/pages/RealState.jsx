import React, { lazy, Suspense } from 'react'
const QRCode = lazy(() => import('../components/QRCode'));
const Loader = lazy(() => import('../components/Loader'));

const RealState = () => {
    return (
        <Suspense fallback={<><Loader /></>}>
            <div className='QR__container'>
                <QRCode title="Real State QR code" url="hello url"/>
            </div>
        </Suspense>
    )
}

export default RealState