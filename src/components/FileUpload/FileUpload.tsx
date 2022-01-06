import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { RefObject } from '../../types'
import ReactS3Client from 'react-aws-s3-typescript';

const config = {
    bucketName: process.env.AWS_BUCKET_NAME || 'cart-web-admin',
    dirName: 'prev_images',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIA56CGEHVGVGOU6BOF',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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'
}

const FileUpload = forwardRef((props: {name: string}, ref: Ref<RefObject>) => {
    const [file, setFile] = useState<File>(new File(['10'],''))

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
            <input type='file' onChange={handleChange} />
        </>
    )
})

export { FileUpload }