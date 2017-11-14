import { EditorState, SelectionState, Modifier } from "draft-js";
import { OrderedSet } from "immutable";
// import tensify from "tensify";
import ConvertTense from "./convertTense";

export function addTaskToEndOfEditor(editorState, task) {
  let contentState = editorState.getCurrentContent();
  var txt = task.content;
  txt = formatText(contentState, txt);
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

function formatText(contentState, txt) {
  const txtArray = txt.toLowerCase().split(" ");
  const past = new ConvertTense(txtArray[0]).past;
  const formattedTxt = [past, ...txtArray.slice(1)].join(" ");
  if (!contentState.hasText()) {
    return "Today, I ".concat(formattedTxt);
  }
  const plainText = contentState.getPlainText().trim();
  // const plainTextLength = plainText.trim().length;
  //
  // const periodRe = /\./;
  // const andRe = /and/;

  const lastSentence = plainText.split(".").slice(-1)[0];
  // const periodIndex = lastSentence.search(periodRe);
  // const andIndex = lastSentence.search(andRe);

  if (lastSentence.length === 0) {
    return `I ${formattedTxt}`;
  } else {
    return `and ${formattedTxt}.`;
  }
}
