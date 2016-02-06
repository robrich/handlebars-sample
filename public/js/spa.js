(function () {
  'use strict';

  function dataAccessGetAll(cb) {
    $.getJSON('/api', function (results) {
      cb(null, results);
    });
  }

  function dataAccessGetById(id, cb) {
    $.getJSON('/api/'+encodeURIComponent(id), function (results) {
      cb(null, results);
    });
  }

  function dataAccessAdd(obj, cb) {
    $.ajax({
      url: '/api/add',
      type: 'POST',
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (/*results*/) {
        cb(null);
      }
    });
  }

  function dataAccessUpdate(id, obj, cb) {
    $.ajax({
      url: '/api/'+encodeURIComponent(id),
      type: 'POST',
      data: JSON.stringify(obj),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (/*results*/) {
        cb(null);
      }
    });
  }

  var container = $('#container');
  var listTemplate;
  var editTemplate;
  $.get('/templates/list.html', function (listHtml) {
    listTemplate = Handlebars.compile(listHtml);
  });
  $.get('/templates/edit.html', function (editHtml) {
    editTemplate = Handlebars.compile(editHtml);
  });

  function showList() {
    dataAccessGetAll(function (err, list) {
      if (err) {
        // TODO: error handling
      }
      container.html(listTemplate({data: list}));
    });
  }

  function showNew(e) {
    e.preventDefault();
    var data = {active:true};
    container.html(editTemplate({data: data, isNew: true}));
  }

  function saveNew(e) {
    e.preventDefault();
    var name = $('#name').val();
    var active = $('#active').is(':checked');
    var obj = {
      name: name,
      active: active
    };
    dataAccessAdd(obj, function (err) {
      if (err) {
        // TOOD: error handling
      }
      showList();
    });
  }

  function showEdit(e) {
    e.preventDefault();
    var id = $(this).text();
    dataAccessGetById(id, function (err, data) {
      if (err) {
        // TOOD: error handling
      }
      container.html(editTemplate({data: data, isNew: false}));
    });
  }

  function saveEdit(e) {
    e.preventDefault();
    var id = $('#id').val();
    var name = $('#name').val();
    var active = $('#active').is(':checked');
    var obj = {
      id: id,
      name: name,
      active: active
    };
    dataAccessUpdate(id, obj, function (err) {
      if (err) {
        // TOOD: error handling
      }
      showList();
    });
  }

  container.on('click', '.add', showNew);
  container.on('click', '.edit', showEdit);
  container.on('submit', '.addForm', saveNew);
  container.on('submit', '.editForm', saveEdit);
  $(document).ready(showList); // FRAGILE: ASSUME: templates have loaded already

}());
