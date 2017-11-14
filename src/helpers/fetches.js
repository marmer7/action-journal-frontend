import debounce from "lodash/debounce";
import { convertToRaw } from "draft-js";
// save current editor to backend
const saveContent = debounce((content, id) => {
  fetch(`http://localhost:3000/api/v1/editors/${id}`, {
    method: "POST",
    body: JSON.stringify({
      content: convertToRaw(content)
    }),
    headers: {
      Application: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
  // .then(editorData =>
  //   this.props.onSaveEditorState(
  //     editorData.raw_content_state,
  //     editorData.id
  //   )
  // );
}, 1000);

export { saveContent };
