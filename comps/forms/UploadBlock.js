import React, { useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default function UploadBlock() {
    const [fileList, setFileList] = useState([]);

    const selectImageButton = (
        <div>
            {<PlusOutlined />}
            <div style={{ marginTop: 8 }}>Select</div>
        </div>
    );

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };


    const beforeUpload = (file) => {
        return false;
    }

    return (<>
        <style jsx>{
            `.avatar-uploader > .ant-upload {
            width: 128px;
            height: 128px;
          }`
        }</style>
        <ImgCrop>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                onPreview={onPreview}
            >
                {fileList.length < 1 && selectImageButton}
            </Upload>
        </ImgCrop>
    </>);

};
