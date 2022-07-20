import { useEffect, useState } from "react"
import API from '../../util/api';
import Payment from "../../components/Payment";


export default function OutstandingPaymentsPage(){
    const [getPayments, setPayments] = useState('');

    useEffect(() => {
        async function getAllPayments(){   
            try {
                {/* TODO:  decide which user to harass for payment information  */ }
                const res = await API.get("/payments/userid/0")
                setPayments(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllPayments();
        }, []);

        console.log(getPayments)
    return <>
        {getPayments && getPayments.map((payment) => 
            <Payment key={payment.id} payment={payment} />
        )}

        {!getPayments && <h3>Loading Payments...</h3>}
    </>
}