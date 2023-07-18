import productService from "../services/productService.js";
import fs from "fs";


class ProductController {
    constructor() {
    }

    findAll(req, res) {
        fs.readFile('views/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '<table style="margin: 30px">';
            productService.findAll().then((products) => {
                for (const item of products) {
                    str += `<h1>
                           <tr><td>${item.name}, ${item.price}</td></h1>
                           <td> <a href="/api/products/edit/${item.id}">Edit</a></td>
                          <td><form action="/api/products/delete/${item.id}" method="get"><button type="submit">Delete</button></form></td></tr>

`;

                }
                str += `<tr><a href="/api/products/add">Add</a></tr>`
                str += `</table>`
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    showAddForm(req, res) {
        fs.readFile('views/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })

    }
    showEditForm(req, res) {
        const idProduct = req.params.id;
        fs.readFile("views/product/edit.html", 'utf-8', (err, stringHTML) => {
                productService.findById(idProduct).then((item)=> {
                stringHTML = stringHTML.replace("{id}", item.id);
                stringHTML = stringHTML.replace("{name}", item.name);
                stringHTML = stringHTML.replace("{price}", item.price);
                stringHTML = stringHTML.replace('{quantity}', item.quantity);
                stringHTML = stringHTML.replace('{image}', item.image);
                stringHTML = stringHTML.replace('{popularityID}', item.popularityID);
                res.write(stringHTML);
                res.end();
            })
        })
    }

    edit(req, res) {
        productService.update(req.body).then(() => {
            res.redirect('/api/products');
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
    }

    add(req, res) {
        productService.save(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }
    delete(req, res) {
        const id = req.params.id;
        productService.delete(id)
            .then(() => {
                res.writeHead(302, { 'Location': '/api/products' });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
    }


}

export default new ProductController();
