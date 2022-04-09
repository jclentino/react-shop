import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext'
import '../styles/components/Payment.css'

const Payment = () => {
    const { state, addNewOrder } = useContext(AppContext)
    const { cart, buyer } = state 

    const navigate = useNavigate()

    const paypalOptions = {
        clientId: 'ATi28Ar4i2XgnGj3_t3BcZT385r6JYJKwOFqOIBSWt58yiv3mqC_EIzAajPkWDrpd0xtS1JSonk7N99W',
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    }

    const handleSumTotal = ()=> {
        const reducer = (a,i) => a+i.price
        const sum = cart.reduce(reducer,0)
        return sum 
    }

    const handlePaymentSuccess = data => {
        if (data.status === 'COMPLETED'){
            const newOrder = {
                buyer, 
                product: cart, 
                payment: data 
            }
            addNewOrder(newOrder)
            navigate('/checkout/success')
        }
    }
    
    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>resumen del pedido:</h3>
                {cart.map(item => (
                    <div className="Payment-item" key={item.title}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>
                                $
                                {' '}
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}

                <div className="Payment-button">
                    <PayPalButton 
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal()}
                        onPaymentStart={()=> console.log('start payment')}
                        onPaymentSuccess={data => handlePaymentSuccess(data)}
                        onPaymentError={error => console.log(error)}
                        onPaymentCancel={data => console.log(data)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;