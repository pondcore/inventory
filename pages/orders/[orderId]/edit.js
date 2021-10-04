import { useRouter } from 'next/router';

function EditOrder() {
    const routes = useRouter()
    const orderId = routes.query.orderId;

    return (
        <div>Edit {orderId} Order Page!</div>
    )
}

export default EditOrder