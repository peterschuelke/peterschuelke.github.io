import { createWriteStream } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export const handler = async (event) => {
  try {
    const { file, filename } = JSON.parse(event.body)
    const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Ensure the uploads directory exists in web/public
    const uploadsDir = join(process.cwd(), 'web', 'public', 'uploads')
    const finalFilename = filename || `${uuidv4()}.png`
    const filePath = join(uploadsDir, finalFilename)

    // Write the file
    const writeStream = createWriteStream(filePath)
    writeStream.write(buffer)
    writeStream.end()

    // Return the path relative to the public directory
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: `/uploads/${finalFilename}`,
      }),
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to upload file',
      }),
    }
  }
}