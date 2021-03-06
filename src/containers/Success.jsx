import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
// import useGoogleAddress from '../hooks/useGoogleAddress';
// import Map from '../components/Map';
import '../styles/components/Success.css'

const Success = () => {
    const { state } = useContext(AppContext)
    const { buyer } = state 
    // const location = useGoogleAddress(buyer[0].address)

    return (
        <div className="Success">
            <div className="Success-content">
                <h2>{buyer.name}, gracias por tu compra</h2>
                <span>tu pedido llegara en 3 dias a tu direccion:</span>
                <div className="Success-map">
                    google maps 
                    {/* <Map data={location} /> */}
                </div>
            </div>
        </div>
    );
}

export default Success;