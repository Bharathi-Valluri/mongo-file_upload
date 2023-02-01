const employee_controller = require('../controller/mongoController')
const router = require('express').Router()
const { upload } = require('../middleware/middleware')
router.post(
  '/savingFileIntoDB',
  upload.single('profile'),
  employee_controller.saveData
)
router.get('/getOneRecord', employee_controller.fetchOneRecord)
router.get('/getAll', employee_controller.fetchAllRecords)
router.put('/modifyingData', employee_controller.modifyRecords)
router.delete('/deleteRecords', employee_controller.deleteRecords)

module.exports = router
