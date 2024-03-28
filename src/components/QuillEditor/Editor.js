// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

// Define the TestBlock component
export function TestBlock({ children }) {
    return <h1 className="border-4 border-red-500 p-4 bg-blue-500"> {children}</h1>;
}

const Editor = () => {
    // Editor state
    const [value, setValue] = useState("<TestBlock>Тестовый параграф</TestBlock>");

    console.log(value);

    // Editor ref
    const quill = useRef();

    // Handler to handle button clicked
    function handler() {
        console.log(value);
    }

    const ImageUploader = () => {
        const [imageUrl, setImageUrl] = useState('');

        const uploadImage = async (file) => {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('https://api.imgur.com/3/image', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Client-ID 1db65d3bddf681a', // Вставьте ваш Client ID Imgur
                    },
                    body: formData,
                });

                console.log(response);

                const data = await response.json();
                setImageUrl(data.data.link);
            } catch (error) {
                console.error('Error uploading image to Imgur:', error);
            }
        };

        const handleFileInputChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                uploadImage(file);
            }
        };

        const imageHandler = () => {
            // Implement your custom image handler logic here
        };

        const modules = useMemo(
            () => ({
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
            }),
            [imageHandler]
        );

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
                <button onClick={handler} className={styles.btn}>
                    Submit
                </button>
            </div>
        );
    };

    return <ImageUploader />;
};

export default Editor;
