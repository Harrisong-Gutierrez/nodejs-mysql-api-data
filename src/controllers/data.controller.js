import { pool } from "../db.js";
 
 
 
 
 export const getData = async (req, res) => {
  
  try {
    const [rows] = await pool.query('SELECT * FROM customer')
  res.json(rows)

  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
 };

 
 export const getDataId = async (req, res) => {
   
  try {
    const [rows]  = await pool.query('SELECT * FROM customer WHERE id = ?',
    [req.params.id]);



   if (rows.length <= 0) return res.status(404).json({
    message: 'Data not found'
   })


  res.json(rows[0])
  }catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
 }

 export const createData = async (req, res) => {
  const {name, last, email, password, comment} = req.body
  try {
    
    const [rows] =   await pool.query('INSERT INTO customer(name, last, email, password, comment) VALUES (?, ?, ?, ?, ?)',
     [name, last, email, password, comment])
       res.send({ 
        id: rows.insertId,
        name,
        last,
        email,
        password,
        comment,
        })
  }catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
 };


export const deleteData = async (req, res) => {
 
  try {
    const [result]  = await pool.query('DELETE FROM customer WHERE id = ?',[req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Data not found'
    })
    
     res.sendStatus(204)
  }catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }

};


 export const updateData = async (req, res) => {
  const {id} = req.params
  const {name, last, email, password, comment } = req.body
  
  try{
 
    const [result] = await 
    pool.query('UPDATE customer SET name = IFNULL(?, name), last = IFNULL(?, last), email = IFNULL(?, email), password = IFNULL(?, password), comment = IFNULL(?, comment) WHERE id = ?'
    , [name, last,email, password, comment,  id]);
  
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Data not found'
    })
  
      const [rows] = await pool.query('SELECT * FROM customer WHERE id = ?',
      [id])
     
    res.json(rows[0])
  }catch(error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
 }

 

