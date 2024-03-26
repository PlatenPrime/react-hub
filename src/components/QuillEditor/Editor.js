// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

const Editor = () => {
	// Editor state
	const [value, setValue] = useState("");

	// Editor ref
	const quill = useRef();

	// Handler to handle button clicked
	function handler() {
		console.log(value);
	}

	const imageHandler = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files[0];

			try {
				// Загрузка изображения на Imgur
				const formData = new FormData();
				formData.append("image", file);

				const response = await axios.post("https://api.imgur.com/3/image", formData, {
					headers: {
						Authorization: "Client-ID 	1db65d3bddf681a", // Замени YOUR_CLIENT_ID_HERE на свой клиентский идентификатор Imgur
					},
				});

				const imageUrl = response.data.data.link;
				const quillEditor = quill.current.getEditor();
				const range = quillEditor.getSelection(true);
				quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		};
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

export default Editor;