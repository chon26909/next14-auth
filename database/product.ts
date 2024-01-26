import { RowDataPacket } from 'mysql2';
import { db } from './mysql';
import { IProduct } from '@/types/product';

interface IProductList extends IProduct, RowDataPacket {}

export const getProductList = () => {
    return new Promise<IProductList[]>((resolve, reject) => {
        db.query<IProductList[]>('SELECT * FROM products', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const getProductID = (id: string) => {
    return new Promise<IProductList>((resolve, reject) => {
        db.query<IProductList[]>('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
};
