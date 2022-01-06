import React, { useState } from 'react'
//import S3FileUpload from 'react-s3'

const config = {
    bucketName: '',
    dirName: '',
    region: '',
    accessKeyId: '',
    secretAccessKey: ''
}

const FileUpload: React.FC<{childFunc: any}> = ({childFunc}) => {
    const [file, setFile] = useState('')

    const uploadImage = () => {
        console.log('upload image')
        // S3FileUpload.uploadFile(file, config)
        // .then(data => {
        //     console.log(data.location)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }
    const handleChange = (e: any) => {
        setFile(e.target.files[0])
    }
    React.useEffect(() => {
        childFunc.current = uploadImage
    })
    return (
        <>
            <input type='file' onChange={handleChange} />
        </>
    )
}

export { FileUpload }