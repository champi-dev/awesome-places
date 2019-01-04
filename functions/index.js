const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')

const gcConfig = {
  projectId: 'devsarmico-rncourse',
  keyFilename: 'rncourse.json'
}
const { Storage } = require('@google-cloud/storage')
const gcs = new Storage(gcConfig)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body)
    const tmpPath = '/tmp/uploaded-image.jpg'

    fs.writeFileSync(tmpPath, body.image, 'base64', err => {
      console.log(err)
      return response.status(500).json({ err })
    })

    const uniqueId = uuid()
    const bucket = gcs.bucket('devsarmico-rncourse.appspot.com')
    bucket.upload(
      tmpPath,
      {
        uploadType: 'media',
        destination: '/places/' + uniqueId + '.jpg',
        metadata: {
          metadata: {
            contentType: 'image/jpeg',
            firebaseStorageDownloadTokens: uniqueId
          }
        }
      },
      (error, file) => {
        if (!error) {
          response.status(201).json({
            imageUrl:
              'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              encodeURIComponent(file.name) +
              '?alt=media&token=' +
              uniqueId
          })
        } else {
          console.log(error)
          response.status(500).json({ error })
        }
      }
    )
  })
})
