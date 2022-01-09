import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { RefObject } from '../../types'
import ReactS3Client from 'react-aws-s3-typescript';

import {
    Box,
    Text,
    Image,
} from '@chakra-ui/react'
import ReactPlayer from 'react-player';

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME || '',
    dirName: process.env.REACT_APP_S3_BUCKET_DIR_NAME || '',
    region: 'website-' + process.env.REACT_APP_AWS_REGION || '',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ''
}

enum FileType {
    NONE,
    IMAGE,
    VIDEO
}

const FileUpload = forwardRef((props: {name: string}, ref: Ref<RefObject>) => {
    const [file, setFile] = useState<File>(new File(['10'],''))
    const [imageSrc, setImageSrc] = useState('')
    const [videoSrc, setVideoSrc] = useState('')
    const [type, setType] = useState(FileType.NONE)

    const imageTypes = ['image/gif', 'image/jpeg', 'image/png']
    const videoTypes = ['video/mp4', 'video/quicktime']

    useImperativeHandle(ref, () => ({ uploadImage }))

    const getExtension = (path: string) => {

        var basename: string = path.split(/[\\/]/).pop() || '',
        pos = basename.lastIndexOf(".");
    
        if (basename === "" || pos < 1)
            return "";
    
        return basename.slice(pos + 1);
    }

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
        let file = e.target.files[0]
        console.log(file)

        if(file) {
            if(imageTypes.includes(file['type'])) {
                setType(FileType.IMAGE)
                setImageSrc(URL.createObjectURL(file))
            }
            else if(videoTypes.includes(file['type'])) {
                setType(FileType.VIDEO)
                setVideoSrc(URL.createObjectURL(file))
            }
            setFile(file)
            
        }
        
    }
    return (
        <>
            <Box w='full' p='18px' border='1px solid white'>
                { type === FileType.IMAGE && <Image src={imageSrc} boxSize='200px' border='1px solid white' alt=''/>}
                { type === FileType.VIDEO && <ReactPlayer playing url={videoSrc} />}
            </Box>
            <Box w='full'>
                <Text>preview image</Text>
                <input type='file' onChange={handleChange} />
            </Box>
        </>
    )
})

export { FileUpload }