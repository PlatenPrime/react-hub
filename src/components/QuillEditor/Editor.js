// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

const Editor = () => {
	// Editor state
	const [value, setValue] = useState(`<a href="https://music.youtube.com/">Ссылка на музику</a>`);

	// Editor ref
	const quill = useRef();

	// Handler to handle button clicked
	function handler() {
		console.log(value);
	}






	const imageHandler = useCallback(() => {
		// Create an input element of type 'file'
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		// When a file is selected
		input.onchange = async () => {
			const file = input.files[0];

			// Upload the image to Imgur using Imgur API
			const formData = new FormData();
			formData.append("image", file);

			try {
				const response = await fetch("https://api.imgur.com/3/image", {
					method: "POST",
					headers: {
						Authorization: "Client-ID 1db65d3bddf681a", // Replace YOUR_CLIENT_ID with your Imgur client ID
					},
					body: formData,
				});

				const data = await response.json();

				if (data.success) {
					const imageUrl = data.data.link;

					// Insert the image into the editor with a figure tag
					const quillEditor = quill.current.getEditor();
					const range = quillEditor.getSelection(true);
					quillEditor.insertEmbed(range.index, "figure", imageUrl, "user");
				} else {
					console.error("Failed to upload image to Imgur");
				}
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