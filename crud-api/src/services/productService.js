import db from "../config/database.js";

class ProductService {
    constructor() {
    }

    findAll() {
        return new Promise((resolve, reject) => {
            db.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            db.query(
                `insert into product values (${product.id},
                    '${product.name}', ${product.price},
                     ${product.quantity}, ${product.image},
                      ${product.popularityID});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.query(`select * from product where id = ${id}`,(err, item) => {
                if(err){
                    reject(err)
                } else {
                    resolve(item[0])
                }
            })
        })
    }
    update(product) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET name = '${product.name}',
                price = ${product.price},
                 quantity = ${product.quantity},
                  image = '${product.image}',
                   popularityID = ${product.popularityID}
                    WHERE id = ${product.id}`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    delete (id){
        return new Promise((resolve, reject) => {
            db.query(`delete from product where id ${id} `,(err, result) => {
                if(err){
                    reject(err)
                } else {
                    console.log(`xoá thành cong`)
                    resolve(result)
                }
            })
        })

    }
}

export default new ProductService();
