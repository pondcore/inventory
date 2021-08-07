import { useRouter } from 'next/router';

function EditProduct() {
    const routes = useRouter()
    const productId = routes.query.productId;

    return (
        <div>Edit {productId} Product Page!</div>
    )
}

export default EditProduct