import { EditorState, SelectionState, Modifier } from "draft-js";
import { OrderedSet } from "immutable";

export function addTaskToEndOfEditor(editorState, task) {
  let contentState = editorState.getCurrentContent();
  const endSelection = getEndSelection(contentState);
  const txt = task.content;
  console.log(txt);
  contentState = contentState.createEntity("task", "IMMUTABLE", {
    taskId: task.id
  });
  const entityKey = contentState.getLastCreatedEntityKey();

  const nextContentState = Modifier.insertText(
    contentState,
    endSelection,
    txt,
    OrderedSet.of("immutable"),
    entityKey
  );
  return EditorState.push(editorState, nextContentState, "insert-characters");
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
