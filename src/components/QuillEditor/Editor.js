import React, { useCallback, useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";
import ImageUploader from "../ImageUploader"; // Импортируем компонент ImageUploader

const Editor = () => {
  const [value, setValue] = useState("");
  const quill = useRef();

  const imageHandler = useCallback((imageUrl) => {
    const quillEditor = quill.current.getEditor();
    const range = quillEditor.getSelection(true);
    quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
  }, []);

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
          image: () => {
            // Вызываем компонент ImageUploader для загрузки изображения на Imgur
            // Передаем URL изображения функции imageHandler
            ImageUploader().then((imageUrl) => {
              if (imageUrl) {
                imageHandler(imageUrl);
              }
            });
          },
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
      <button className={styles.btn}>Submit</button>
    </div>
  );
};

export default Editor;
