import{Router} from 'express';
import productController from "../controllers/productController.js";
const productRouter = Router();

productRouter.get('', productController.findAll);
productRouter.post('', productController.add);
productRouter.get('/add', productController.showAddForm);
productRouter.get('/edit/:id', productController.showEditForm);
productRouter.post('/edit/:id', productController.edit);
productRouter.delete('del', productController.delete);

export default productRouter;
