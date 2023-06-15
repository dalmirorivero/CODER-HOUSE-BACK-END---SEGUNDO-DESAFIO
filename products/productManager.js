import fs from 'fs';

// const path = './files/productos.json'

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.error("Campo del producto obligatorio!");
                return;
            }
            if (products.find((p) => p.code === product.code)) {
                console.log("El código del producto ya existe!");
                return;
            }
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            return product;
        } catch (error) {
        console.log(error)
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
        console.log(error)
        }
    }

    async getProductById(ProductID) {
        const products = await this.getProducts();
        const productIndex = products.find(product => product.id === ProductID);

        if (!productIndex) {
            console.log("ID de producto no encontrado!");
            return;
        }
        return productIndex;
    }


    async updateProduct(productId, updatedFields) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
            console.log("Producto a actualizar no encontrado!");
            return;
        }

        const updatedProduct = {
            ...products[productIndex], ...updatedFields,
        }

        products[productIndex] = updatedProduct;

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return updatedProduct;
        } catch (error) {
        console.log(error);
        }
    }

    deleteProductById = async (productId) => {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((product) => product.id === productId);

            if (productIndex === -1) {
                console.log("Producto a eliminar no encontrado!");
                return false;
            }

            products.splice(productIndex, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return true;
        } catch (error) {
        console.log(error);
        return false;
        }
    }
}