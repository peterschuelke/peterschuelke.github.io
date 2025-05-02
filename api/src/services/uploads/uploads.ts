import { createWriteStream } from 'fs'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import type { MutationResolvers } from 'types/graphql'

export const uploadFile: MutationResolvers['uploadFile'] = async ({ file, filename }) => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'web', 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    // Write the file
    const filePath = join(uploadsDir, filename)
    const writeStream = createWriteStream(filePath)
    writeStream.write(Buffer.from(file, 'base64'))
    writeStream.end()

    return { path: `/uploads/${filename}` }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}