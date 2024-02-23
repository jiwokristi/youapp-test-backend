import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { PrismaClient } from '@prisma/client'

import { errorHandler } from './src/middleware/errorHandler'

const app = express()
const port = process.env.PORT || 8080

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

const prisma = new PrismaClient()

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .post('/upload', upload.single('image'), async (req, res, next) => {
    try {
      const { id, userId } = req.body

      if (!userId) {
        return res.status(400).send('Missing userId in the request body.')
      }

      if (!req.file) {
        return res.status(400).send('No file uploaded.')
      }

      const imagePath = req.file!.path

      const updatedProfile = await prisma.profile.update({
        where: { userId, id: +id },
        data: { image: imagePath },
      })

      return res.status(200).json({ data: updatedProfile })
    } catch (error) {
      next(error)
    }
  })
  .use('/uploads', express.static(path.join(__dirname, 'uploads')))
  .use(errorHandler)
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })

module.exports = app
