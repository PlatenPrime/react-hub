import { useCallback, useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";
import axios from 'axios'; // Import axios for making HTTP requests

import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

const Editor = () => {
    const [value, setValue] = useState(`<a href="https://music.youtube.com/">Ссылка на музику</a>`);

    console.log(value);

    const handleUpdateState = () => {
        setValue(prev => prev + `<img  src="https://m.media-amazon.com/images/I/61M2NEfcPkL._AC_UF894,1000_QL80_.jpg" />`)
    }

    const quill = useRef();

    // Function to handle image upload to Imgur
    const imageHandler = useCallback(async (image) => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    'Authorization': 'Client-ID 1db65d3bddf681a' // Replace YOUR_CLIENT_ID with your actual Imgur client ID
                }
            });

            const imageUrl = response.data.data.link;

            // Insert the image into the editor
            const editor = quill.current.getEditor();
            const index = (quill.current.editor.getSelection() || {}).index || quill.current.editor.getLength();
            editor.insertEmbed(index, 'image', imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        clipboard: {
            matchVisual: true,
        },
    }), [imageHandler]);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
    ];

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>Editor Content</label>
            <QuillEditor
                ref={(el) => (quill.current = el)}
                className={styles.editor}
                theme="snow"
                value={value}
                formats={formats}
                modules={modules}
                onChange={(value) => setValue(value)}
            />
            <button onClick={handleUpdateState} className={styles.btn}>
                Update
            </button>
        </div>
    );
};

export default Editor;
