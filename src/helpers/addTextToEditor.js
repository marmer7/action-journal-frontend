import { EditorState, SelectionState, Modifier } from "draft-js";
import { OrderedSet } from "immutable";

export function addTaskToEndOfEditor(editorState, task) {
  let contentState = editorState.getCurrentContent();
  const txt = task.content;
  console.log(txt);
  contentState = contentState.createEntity("TASK", "IMMUTABLE", {
    taskId: task.id
  });
  const entityKey = contentState.getLastCreatedEntityKey();

  const withEntity = Modifier.insertText(
    contentState,
    getEndSelection(contentState),
    txt,
    OrderedSet.of("immutable"),
    entityKey
  );

  const withBlank = Modifier.insertText(
    withEntity,
    getEndSelection(withEntity),
    " ",
    null,
    null
  );
  return EditorState.push(editorState, withBlank, "insert-characters");
}

function getEndSelection(contentState) {
  const lastBlock = {
    key: contentState.getLastBlock().getKey(),
    length: contentState.getLastBlock().getLength()
  };

  const endSelection = new SelectionState({
    anchorKey: lastBlock.key,
    anchorOffset: lastBlock.length,
    focusKey: lastBlock.key,
    focusOffset: lastBlock.length
  });

  return endSelection;
}
