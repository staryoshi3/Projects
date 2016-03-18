/**
 * Created by Cedrik on 3/3/2016.
 */
$(function () {
    // protect against cross-site script injections.
// Found in: https://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
// Original source: https://github.com/janl/mustache.js/blob/master/mustache.js#L60

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

    var submitTask = function () {
        "use strict";
        var task = $("input[name='task']").val();
        $.post('/tasklist/tasks', {task: task});
        $("input[name='task']").val("").focus();
    };
    var displayTasks = function () {
        "use strict";
        $.getJSON('/tasklist/tasks', function (data) {
            var tasks = [];
            $.each(data, function(key, val) {
                tasks.push(escapeHtml(val.task));
            });
            $("#tasklog").html(tasks.join("<br/>"));
        });
    };
    var deleteTasks = function () {
        $.delete = function(url, data, callback, type) {
            if ($.isFunction(data)){
                type = type || callback,
                    callback = data,
                    data = [];
            }

            return $.ajax({
                url: '/tasks/delete/:counter',
                type: 'DELETE',
                success: callback,
                data: data,
                contentType: type
            });
        }
    };
    $('button').button().click(submitTask);
    setInterval(displayTasks, 10000);
});
