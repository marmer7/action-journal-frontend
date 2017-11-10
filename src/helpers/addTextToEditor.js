import { EditorState, SelectionState, Modifier } from "draft-js";
import { OrderedSet } from "immutable";
import tensify from "tensify";

export function addTaskToEndOfEditor(editorState, task) {
  let contentState = editorState.getCurrentContent();
  var txt = task.content;
  txt = formatText(contentState, txt);
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

  // const withBlank = Modifier.insertText(
  //   withEntity,
  //   getEndSelection(withEntity),
  //   " ",
  //   null,
  //   null
  // );
  return EditorState.push(editorState, withEntity, "insert-characters");
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

function formatText(contentState, txt) {
  const txtArray = txt.split(" ");
  console.log(tensify(txtArray[0]).past);
  const formattedTxt = [
    tensify(txtArray[0].toLowerCase()).past,
    ...txtArray.slice(1)
  ].join(" ");
  if (!contentState.hasText()) {
    return "Today, I ".concat(formattedTxt);
  }
  const plainText = contentState.getPlainText();
  const plainTextLength = plainText.trim().length;

  const periodRe = new RegExp("\\.");
  const andRe = new RegExp("and");

  const periodIndex = plainText.search(periodRe);
  const andIndex = plainText.search(andRe);

  if (periodIndex >= plainTextLength - 1) {
    return ` I ${formattedTxt}`;
  } else if (andIndex > periodIndex) {
    return ` I ${formattedTxt}`;
  } else {
    return ` and ${formattedTxt}.`;
  }
  return formattedTxt;
}
