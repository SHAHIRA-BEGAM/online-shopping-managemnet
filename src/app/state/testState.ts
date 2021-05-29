import { ProductState } from './product/product.store';

export const initialState: {
  product: ProductState;
} = {
  product: {
    ids: [1, 2],
    entities: {
      1: {
        id: 1,
        title: 'Mens Casual Slim Fit',
        price: 9,
        category: 'men clothing',
        description: 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description',
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'
      },
      2: {
        id: 2,
        title: 'White Gold Plated Princess',
        price: 10.99,
        category: 'jewelery',
        description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
        image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'
      }
    }
  }
};
