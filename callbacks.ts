import express from "express";
import axios from "axios";
import Product from "./my-app/app/products/[productId]/page.js";
const app = express();

const config = {
  port: Number(process.env.PORT) || 8000,
  host: `localhost`,
};

type Product = {
  id: number;
  title: string;
  category: string;
  description?: string;
  price?: number;
};

type ProductsResponse = {
  total: number;
  products: Product[];
};

/**
 * دالة مخصصة لإضافة مشروع/منتج جديد
 *
 */

// still didn't know how we are escaping callback hell like this
// all fetching from APIs will return a Promise
// consuming a promise using .then, .catch
export function filterProducteByPrice(
  props: { api: string; minPrice: number; maxPrice: number },

  callback: (arg0: Error | null, arg1: Product[] | null) => void,
) {
  axios
    .get<ProductsResponse>(props.api)
    .then((value) => {
      const productFiltered = value.data.products.filter(
        (product) =>
          product.price &&
          product.price >= props.minPrice &&
          product.price <= props.maxPrice,
      );

      callback(null, productFiltered);
    })
    .catch((reason) => {
      callback(reason, null);
    });
}

// consuming a promise using async & await
// this will return a resolved promise
export async function asyncFilterProducteByPrice(
  props: { api: string; minPrice: number; maxPrice: number },

  callback: (arg0: Error | null, arg1: Product[] | null) => void,
) {
  try {
    const value = await axios.get<ProductsResponse>(props.api);
    const productFiltered = value.data.products.filter(
      (product) =>
        product.price &&
        product.price >= props.minPrice &&
        product.price <= props.maxPrice,
    );

    return callback(null, productFiltered);
  } catch {
    const reason = { message: "this is error" } as Error;
    return callback(reason, null);
  }
}

export async function promiseFiltesrProducteByPrice(props: {
  api: string;
  minPrice: number;
  maxPrice: number;
}): Promise<Product[]> {
  // الـ await ينتظر الـ axios داخلياً
  const value = await axios.get<ProductsResponse>(props.api);

  // نقوم بإرجاع النتيجة مباشرة (تُغلف تلقائياً كـ Promise ناجح بفضل كلمة async)
  return value.data.products.filter(
    (product) =>
      product.price &&
      product.price >= props.minPrice &&
      product.price <= props.maxPrice,
  );
}

app.get("/", async (req: express.Request, res: express.Response) => {
  // asyncFilterProducteByPrice(
  //   {
  //     api: `https://dummyjson.com/products`,
  //     minPrice: 20,
  //     maxPrice: 50,
  //   },
  //   (error, products) => {
  //     if (error) {
  //       res.status(500).end("error loading products");
  //     } else {
  //       res.status(200);
  //       res.json(products);
  //     }
  //   },
  // );

  try {
    const values = await promiseFiltesrProducteByPrice({
      api: "https://dummyjson.com/products",
      minPrice: 20,
      maxPrice: 50,
    });
    res.status(200);
    res.json(values);
  } catch {
    res.status(500);
    res.end("error fetching data");
  }

  //   const testingProducts: Product[] = [
  //     {
  //       id: 1,
  //       title: "Product 1",
  //       category: "Category 1",
  //       description: "This is a test product",
  //       price: 29.99,
  //     },
  //     {
  //       id: 2,
  //       title: "Product 2",
  //       category: "Category 2",
  //       description: "This is another test product",
  //       price: 39.99,
  //     },
  //     {
  //       id: 2,
  //       title: "Product 2",
  //       category: "Category 2",
  //       description: "This is another test product",
  //       price: 39.99,
  //     },
  //   ];
  //   axios.get<Product[]>(`https://dummyjson.com/products`).then((value) => {
  //     console.log(value.data);
  //     res.status(200);
  //     res.end("test");
  //   });

  //   const productFiltered = testingProducts.filter(
  //     (product) => product.price && product.price >= 30,
  //   );
  //   res.status(200);
  //   res.json(productFiltered);
});

app.listen(config.port, config.host, () => {
  console.log("listening to server at port 8000");
});
