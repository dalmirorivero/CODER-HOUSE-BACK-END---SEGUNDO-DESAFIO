import ProductManager from "./products/productManager.js";

const manager = new ProductManager ('./files/productos.json');

const send = async () => {
    // CREA UN NUEVO PRODUCTO ALMACENADO EN EL ARREGLO
    const product = {
    title: 'Regla', 
    description: 'Transparente', 
    price: 80, 
    thumbnail: 'no img', 
    code: 'ab154', 
    stock: 37
    };
    
    await manager.addProduct(product);
    if(product){
        console.log("Producto creado con exito!")
    }

    // DEVUELVE TODOS LOS PRODUCTOS EN FORMATO DE ARREGLO
    const products = await manager.getProducts();
    console.log(products);

    // DEVUELVE UN PRODUCTO DEL ARREGLO SELECCION POR ID
    const productbyid = await manager.getProductById(5);
    if (productbyid) {
        console.log("Producto encontrado!", productbyid)
    }

    // MODIFICA UN PRODUCTO DEL ARREGLO SELECCIONADO POR ID
    const productUpdateId = 6;
    const updateFields = {
        title: 'K',
        price: 100,
        stock: 1,
    };

    const updatedProduct = await manager.updateProduct(productUpdateId, updateFields);
    if (updatedProduct) {
        console.log("Producto actualizado!", updatedProduct)}
    
    // ELIMINA UN PRODUCTO DEL ARREGLO SELECCIONADO POR ID
    const deletedProduct = await manager.deleteProductById(2);
    if (deletedProduct){
    console.log("Producto eliminado correctamente!")
    }
}
send();

