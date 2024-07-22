import { useEffect, useState } from "react"
import { updateApi, getUserById } from '../../util/api';
import Payment from "../../components/Payment";




export default function OutstandingPaymentsPage({appUser}){
    const [getPayments, setPayments] = useState('');

    useEffect(() => {
        async function getAllPayments(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/payments/userid/"+`${userId}` + "/paystatus/UNPAID")
                setPayments(res.data)
                console.log("@@@@PAYMENT HRE@@@@")
                console.log(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllPayments();
        }, []);

    return <>
        {getPayments && getPayments.map((payment) => 
            <Payment key={payment.paymentId} payment={payment} payable={true} appUser={appUser} />
        )}

        {!getPayments || getPayments ==0 && <h3>No Payments due at this time</h3>}
    </>
}