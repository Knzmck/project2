$(document).ready(function () {
  // Get references to page elements
  const $ = window.$;
  const $exampleText = $('#example-text');
  const $exampleDescription = $('#example-description');
  const $submitBtn = $('#submit');
  const $exampleList = $('#example-list');
  const $createBtn = $('#create-button');


  // The API object contains methods for each kind of request we'll make
  const API = {
    saveExample: function (example) {
      return $.ajax({
        headers: {
          'Content-Type': 'application/json'
        },
        type: 'POST',
        url: 'api/examples',
        data: JSON.stringify(example)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: 'api/examples',
        type: 'GET'
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: 'api/examples/' + id,
        type: 'DELETE'
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  const refreshExamples = function () {
    API.getExamples().then(function (data) {
      const $examples = data.map(function (example) {
        const $a = $('<a>')
          .text(example.text)
          .attr('href', '/example/' + example.id);

        const $li = $('<li>')
          .attr({
            class: 'list-group-item',
            'data-id': example.id
          })
          .append($a);

        const $button = $('<button>')
          .addClass('btn btn-danger float-right delete')
          .text('ｘ');

        $li.append($button);

        return $li;
      });

      $exampleList.empty();
      $exampleList.append($examples);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  const handleFormSubmit = function (event) {
    event.preventDefault();

    const example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      window.alert('You must enter an example text and description!');
      return;
    }

    API.saveExample(example).then(function () {
      refreshExamples();
    });

    $exampleText.val('');
    $exampleDescription.val('');
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  const handleDeleteBtnClick = function () {

    const idToDelete = $(this).parent().attr('data-id');


    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons


  $exampleList.on('click', '.delete', handleDeleteBtnClick);

  //Creating event for group creation button
  // When the createGroup button is clicked, eventually validate the name and description are not blank

  var groupName = $('#groupName');
  var groupDescription = $('#groupDescription');


  function createGroup(event) {
    event.preventDefault();

    var groupData = {
      name: groupName.val().trim(),
      description: groupDescription.val().trim()
    };
    console.log(groupData);
    // if (!groupData.name || !groupData.password) {
    //   return;
    // }
    
  //create function "create group " w/ the API call

  function createGroupAPI(groupName, groupDescription) {
    $.post('/api/groups', {
      name: groupName,
      description: groupDescription
    }).then(function (data) {
      console.log(data);
    });
  }
  $createBtn.on('click', createGroup);
});

