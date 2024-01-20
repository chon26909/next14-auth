import { getProductList } from '@/database/product';

export async function GET(req: Request, res: Response) {
    try {
        const products = await getProductList();
        console.log('products :', products);
        return Response.json({ message: 'success', data: products });
    } catch (error) {
        console.log('error', error);
        return Response.json({ message: 'error', data: error });
    }
}
