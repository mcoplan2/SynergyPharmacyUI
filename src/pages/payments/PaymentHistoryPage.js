import { useEffect, useState } from "react"
import { updateApi, getUserById } from '../../util/api';
import Payment from "../../components/Payment";

export default function PaymentHistoryPage({appUser}){
    const [getPayments, setPayments] = useState('');

    useEffect(() => {
        async function getAllPayments(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/payments/userid/" + `${userId}` + "/paystatus/FULLY_PAID")
                setPayments(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllPayments();
        }, []);

        //console.log(getPayments)
    return <>
        {getPayments && getPayments.map((payment) => 
            <Payment key={payment.paymentId} payment={payment} payable={false}/>
        )}

        {!getPayments && <h3>Loading Payments...</h3>}
    </>
}