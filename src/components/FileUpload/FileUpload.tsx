import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { RefObject } from '../../types'
import ReactS3Client from 'react-aws-s3-typescript';

import {
    Box,
    Text,
    Image,
} from '@chakra-ui/react'

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME || '',
    dirName: process.env.REACT_APP_S3_BUCKET_DIR_NAME || '',
    region: process.env.REACT_APP_AWS_REGION || '',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ''
}

console.log(config)

const FileUpload = forwardRef((props: {name: string}, ref: Ref<RefObject>) => {
    const [file, setFile] = useState<File>(new File(['10'],''))
    const [imageSrc, setImageSrc] = useState('')

    useImperativeHandle(ref, () => ({ uploadImage }))

    const uploadImage = async (fileName: string) => {
        console.log('upload image')
        const s3 = new ReactS3Client(config)
        console.log(file, fileName)
        try{
            const res = await s3.uploadFile(file, fileName)
            console.log(res)
        } catch(exception) {
            console.log(exception)
        }
    }
    const handleChange = (e: any) => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }
    return (
        <>
            <Box w='full' p='18px' border='1px solid white'>
                <Image src={imageSrc} boxSize='200px' border='1px solid white' alt=''/>
            </Box>
            <Box w='full'>
                <Text>preview image</Text>
                <input type='file' onChange={handleChange} />
            </Box>
        </>
    )
})

export { FileUpload }