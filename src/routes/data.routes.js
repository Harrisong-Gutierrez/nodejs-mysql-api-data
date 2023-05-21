import { Router } from "express";
import { getData, createData, updateData, deleteData, getDataId } from "../controllers/data.controller.js";

const router = Router();

router.get('/data', getData);

router.get('/data/:id', getDataId);

router.post('/data', createData);

router.patch('/data/:id', updateData);

router.delete('/data/:id', deleteData);

export default router;
