const uri = 'api/employees/';
let employees = null;
function getCount(data) {
    const el = $('#counter');
    let name = 'employee';
    if (data) {
        if (data > 1) {
            name = 'employees';
        }
        el.text(data + ' ' + name);
    } else {
        el.html('No ' + name);
    }
}

$(document).ready(function () {
    getAllEmployee();
    var table = document.getElementById("displayAllTable");
    makeSortable(table);
});

function getAllEmployee() {
    $.ajax({
        type: 'GET',
        url: uri +'GetAll',
        cache: false,
        success: function (data) {
            $('#employees').empty();
            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.firstName))
                    .append($("<td></td>").text(item.lastName))
                    .append($("<td></td>").text(item.gender))
                    .append($("<td></td>").text(item.birth))
                    .append($("<td></td>").text(item.department))                    
                    .append($("<td></td>").text(item.address))
                    .append($("<td></td>").text(item.phone))
                    .append($("<td></td>").text(item.email))
                    .append($("<td></td>")
                        .append(
                            $("<button>Edit</button>").on("click", function () {
                                    editEmployee(item.id);
                            })
                         )
                        .append("&nbsp;")
                        .append(
                            $("<button>Delete</button>").on("click", function () {
                                    deleteEmployee(item.id);
                            })
                        )
                );
                tr.appendTo($('#employees'));
            });
            employees = data;
        }
    });
}

function addEmployee() {
    if (!$("#addForm").valid()) return false;
    const item = {
        'firstName': $('#add-firstName').val(),
        'lastName': $('#add-lastName').val(),
        'gender': $('#add-gender').val(),
        'birth': $('#add-birth').val(),
        'department': $('#add-department').val(),
        'address': $('#add-address').val(),
        'phone': $('#add-phone').val(),
        'email': $('#add-email').val()
    };
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri+'Create',
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getAllEmployee();
            $('#add-firstName').val('');
            $('#add-lastName').val('');
            $('#add-gender').val('');
            $('#add-birth').val('');
            $('#add-department').val('');
            $('#add-address').val('');
            $('#add-phone').val('');
            $('#add-email').val('');
            closeInput();
        }
    });
}

function deleteEmployee(id) {
    var confirmDelete = confirm("Are you sure to delete employee?");
    if (!confirmDelete)
    {
        return; 
    }
    $.ajax({
        url: uri + 'Delete/' + id,
        type: 'DELETE',
        success: function (result) {
            getAllEmployee();
        }
    });
}

function editEmployee(id) {
    $.each(employees, function (key, item) {
        if (item.id === id) {
            $('#edit-id').val(item.id);
            $('#edit-firstName').val(item.firstName);
            $('#edit-lastName').val(item.lastName);
            $('#edit-gender').val(item.gender);
            $('#edit-birth').val(item.birth);
            $('#edit-department').val(item.department);
            $('#edit-address').val(item.address);
            $('#edit-phone').val(item.phone);
            $('#edit-email').val(item.email);
        }
    });
    $('#editDiv').css({ 'display': 'block' });
}

function saveEditEmployee() {
    const item = {
        'firstName': $('#edit-firstName').val(),
        'lastName': $('#edit-lastName').val(),
        'gender': $('#edit-gender').val(),
        'birth': $('#edit-birth').val(),
        'department': $('#edit-department').val(),
        'address': $('#edit-address').val(),
        'phone': $('#edit-phone').val(),
        'email': $('#edit-email').val()
    };

    $.ajax({
        url: uri + 'Update/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getAllEmployee();
        }
    });
    closeInput();
}


function filterEmployee() {
    const item = {
        'firstName': $('#search-firstName').val(),
        'gender': $('#search-gender').val(),
        'department': $('#search-department').val()
    };
    $.ajax({
        url: uri + 'Select',
        type: 'GET',     
        accepts: 'application/json',
        contentType: 'application/json',
        data:item,
        success: function (data) {
            $('#employees').empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.firstName))
                    .append($("<td></td>").text(item.lastName))
                    .append($("<td></td>").text(item.gender))
                    .append($("<td></td>").text(item.birth))
                    .append($("<td></td>").text(item.department))
                    .append($("<td></td>").text(item.address))
                    .append($("<td></td>").text(item.phone))
                    .append($("<td></td>").text(item.email))
                    .append($("<td></td>")
                        .append(
                            $("<button>Edit</button>").on("click", function () {
                                editEmployee(item.id);
                            })
                        )
                        .append("&nbsp;")
                        .append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteEmployee(item.id);
                            })
                        )
                    );
                tr.appendTo($('#employees'));
            });
            employees = data;
        }
    });
}

function closeInput() {
    $('#editDiv').css({ 'display': 'none' });
    $('#addDiv').css({ 'display': 'none' });
}

function addDivDisplay() {
    $('#addDiv').css({ 'display': 'block' });
}


//查找表格的<th>元素，让它们可单击
function makeSortable(table) {
    var headers = table.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        (function (n) {
            var flag = false;
            headers[n].onclick = function () {
                var tbody = table.tBodies[0];//第一个<tbody>
                var rows = tbody.getElementsByTagName("tr");//tbody中的所有行
                rows = Array.prototype.slice.call(rows, 0);//真实数组中的快照

                //基于第n个<td>元素的值对行排序
                rows.sort(function (row1, row2) {
                    var cell1 = row1.getElementsByTagName("td")[n];//获得第n个单元格
                    var cell2 = row2.getElementsByTagName("td")[n];
                    var val1 = cell1.textContent || cell1.innerText;//获得文本内容
                    var val2 = cell2.textContent || cell2.innerText;

                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                if (flag) {
                    rows.reverse();
                }
                //在tbody中按它们的顺序把行添加到最后
                //这将自动把它们从当前位置移走，故没必要预先删除它们
                //如果<tbody>还包含了除了<tr>的任何其他元素，这些节点将会悬浮到顶部位置
                for (var i = 0; i < rows.length; i++) {
                    tbody.appendChild(rows[i]);
                }

                flag = !flag;
            }
        }(i));
    }

    $().ready(function () {
        // 在键盘按下并释放及提交后验证提交表单
        $("#addForm").validate({
            rules: {
                firstName: "required",
                lastName: "required",
                email: {
                    required: true,
                    email: true
                },
                phone:
                {
                    validatePhone: true
                }
            },
            messages: {
                firstName: "Can't be empty",
                lastName: "Can't be empty",
                email: "please input right email",
                phone:"number length in 3~11"
            },
            submitHandler: function () {
                alert("successful!");
            }
        });
    });
}


