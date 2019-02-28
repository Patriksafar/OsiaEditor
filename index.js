window.addEventListener('load', function () {
  osiaEditor('.editable-on');
});


function osiaEditor (editableElementWrapper) {
  let editableElements = document.querySelectorAll(editableElementWrapper);
  //@this function has properties:
  //editableElementWrapper - html selector where whole editor will go


  for (var i = 0; i < editableElements.length; i++) {
    let oldTextareaName = (editableElements[i].name) ? editableElements[i].name : '';

    let editorWrapper = document.createElement( 'div' );
    editorWrapper.className = 'osia-editor-wrapper osiaEditor-wrapper'+i;

    let headWrapper = document.createElement( 'div' );
    headWrapper.className = 'osia-editor-header';

    let functionList = document.createElement( 'UL' );
    functionList.className = 'osia-editor-header-function-list'

    headWrapper.appendChild(functionList);

    let hiddenTextarea = document.createElement( 'textarea' );
    hiddenTextarea.className = 'osia-editor-content-'+i;
    hiddenTextarea.name = oldTextareaName;

    let editableContent = document.createElement( 'div' );
    editableContent.className = 'osia-editor-content';
    editableContent.contentEditable = true;

    editorWrapper.appendChild(headWrapper);
    editorWrapper.appendChild(hiddenTextarea);
    editorWrapper.appendChild(editableContent);


    editableElements[i].replaceWith(editorWrapper);
    //edit mode for this leemnt turn on
  }

  let osiaEditor = document.querySelectorAll('.osia-editor-wrapper');
  for (var i = 0; i < osiaEditor.length; i++) {
    osiaEditor[i].addEventListener('focusout', save);
  }

  renderFunctions();

  /*
  //event listeners
  */
  let editorButton = document.querySelectorAll('.editor-button');
  let editorSelect = document.querySelectorAll('.editor-select');

  for (var i = 0; i < editorButton.length; i++) {
    editorButton[i].addEventListener('click', function (e) {
      let functions = e.target.dataset.function;
      osiaEditorComand(functions);
    }, false)
  }

  for (var i = 0; i < editorButton.length; i++) {
    editorButton[i].addEventListener('mousedown', function (e) {
      event.preventDefault();
    }, false)
  }

  for (var i = 0; i < editorSelect.length; i++) {
    editorSelect[i].addEventListener('change', function (e) {
      let functions = e.target.dataset.function;
      osiaEditorComand(functions, e.target.value);
    }, false)
  }
}

/*
* save funtion
*/
function save() {
  let contentWrapper = document.querySelectorAll('.osia-editor-wrapper');

  for (var i = 0; i < contentWrapper.length; i++) {
    let textarea = contentWrapper[i].getElementsByTagName('textarea');
    let contentToSave = contentWrapper[i].querySelector('.osia-editor-content');

    //insert value form editor into hidden textarea
    textarea[0].value = contentToSave.innerHTML;
  }
}

function renderFunctions() {
  let functions = [
    {
      name: 'bold',
      text: 'B',
      function: 'bold',
      type: 'btn'
    },
    {
      name: 'italic',
      text: 'I',
      function: 'italic',
      type: 'btn'
    },
    {
      name: 'underline',
      text: 'U',
      function: 'underline',
      type: 'btn'
    },
    {
      name: 'orderedList',
      text: '1)',
      function: 'InsertOrderedList',
      type: 'btn'
    },
    {
      name: 'unorderedList',
      text: '•',
      function: 'InsertUnorderedList',
      type: 'btn'
    },
    {
      name: 'fontSize',
      function: 'FontSize',
      type: 'select'
    },
    {
      name: 'createLink',
      text: 'Link',
      function: 'CreateLink',
      type: 'btn'
    },
    {
      name: 'unlinkButton',
      text: 'Unlink',
      function: 'UnLink',
      type: 'btn'
    },
    {
      name: 'undo',
      text: 'Undo',
      function: 'Undo',
      type: 'btn'
    },
    {
      name: 'redo',
      text: 'Redo',
      function: 'Redo',
      type: 'btn'
    },
  ];
  /*
  * list of functions above
  */

  let headers = document.querySelectorAll('.osia-editor-header-function-list');
  let buttons = "";

  for (var i = 0; i < functions.length; i++) {

    /*
    *if list button is select of FontSize
    */
    if ( functions[i].type == "select" && functions[i].name == "fontSize" ) {
      buttons += '<li class="osia-editor-button--not-hover">';
        buttons += '<select class="' + functions[i].name + ' ' + functions[i].name + '-button osia-editor-select editor-select" data-function=' + functions[i].function + '>';
          for (var j = 0; j < 5; j++) {
            buttons += '<option value=' + (j+1) + '>' + (j+1) + '</option>';
          }
        buttons += '</select>';
      buttons += '</li>';
    }
     else {
       buttons += '<li class="osia-editor-button">';
         buttons += '<button class="' + functions[i].name + ' ' + functions[i].name + '-button editor-button" data-function=' + functions[i].function + '>' + functions[i].text + '</button>';
       buttons += '</li>';
     }
  }

  /*
  * insert list of functions into DOM
  */
  for (var i = 0; i < headers.length; i++) {
    headers[i].innerHTML = buttons;
  }
}

function osiaEditorComand(name, value) {
  switch (name) {
    case 'InsertOrderedList':
        document.execCommand(name, false, 'newOL' + Math.round(Math.random() * 1000));
      break;
    case 'FontSize':
        document.execCommand(name, false, value);
      break;
    case 'CreateLink':
        let url = prompt('Enter a url', 'http://')
        document.execCommand(name, false, url);
      break;
    default:
      document.execCommand(name, false, null);
  }
}

function osiaEditorIsSupported(name) {
  return document.queryCommandSupported(name);
}
