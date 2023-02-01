const { db } = require('../db')
const employee = db.collection('employee')
const fs = require('fs')

const saveData = async (req, res) => {
  try {
    console.log(req.file)
    const resp = await employee.insertOne({
      name: req.body.name,
      email: req.body.email,
      file: req.file
    })
    fs.unlinkSync(req.file.path)
    res.status(200).json({
      status: 'success',
      response: resp,
      message: 'files uploaded into DB successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed!.....',
      response: null,
      message: 'failed to save data into DB!......'
    })
  }
}
const fetchOneRecord = async (req, res) => {
  try {
    const resp = await employee.findOne({
      name: req.body.name
    })
    res.status(200).json({
      status: 'success!...',
      response: resp,
      message: 'successfully fetch records from mongo DB'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed!...',
      response: null,
      message: 'failed!....'
    })
  }
}
const fetchAllRecords = async (req, res) => {
  try {
    const resp = await employee.find().toArray()
    res.status(200).json({
      status: 'success!...',
      response: resp,
      message: 'successfully fetch records from mongo DB'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed!...',
      response: null,
      message: 'failed!....'
    })
  }
}
const modifyRecords = async (req, res) => {
  try {
    const find = await employee
      .find({
        name: req.body.name
      })
      .toArray()
    const count = find.length
    console.log(count)
    let resp
    if (count > 1) {
      resp = await employee.updateMany(
        { name: req.body.name },
        { $set: { email: req.body.email } }
      )
    } else {
      resp = await employee.updateOne(
        { name: req.body.name },
        { $set: { email: req.body.email } }
      )
    }
    res.status(200).json({
      status: 'success',
      response: resp,
      message: 'Records are updated successfully!...'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed',
      response: null,
      message: 'failed to update the records!...'
    })
  }
}
const deleteRecords = async (req, res) => {
  try {
    const find = await employee
      .find({
        name: req.body.name
      })
      .toArray()
    const count = find.length
    console.log(count)
    let resp
    if (count > 1) {
      resp = await employee.deleteMany({ name: req.body.name })
    } else {
      resp = await employee.deleteOne({ name: req.body.name })
    }
    res.status(200).json({
      status: 'success',
      response: resp,
      message: 'Records are deleted from DB successfully!....'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed!..........',
      response: null,
      message: 'Failed to delete Records'
    })
  }
}
module.exports = {
  saveData,
  fetchOneRecord,
  fetchAllRecords,
  modifyRecords,
  deleteRecords
}
