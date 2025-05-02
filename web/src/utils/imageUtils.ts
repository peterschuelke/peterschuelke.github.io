import { v4 as uuidv4 } from 'uuid'

export const handleImageUpload = async (file: File): Promise<string> => {
  // Generate a unique filename
  const extension = file.name.split('.').pop()
  const filename = `${uuidv4()}.${extension}`

  // Convert file to base64
  const reader = new FileReader()
  const base64Promise = new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
  reader.readAsDataURL(file)
  const base64Data = await base64Promise

  try {
    // Upload the file to the API
    const response = await fetch('/.redwood/functions/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64Data,
        filename,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const result = await response.json()
    return result.path
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}