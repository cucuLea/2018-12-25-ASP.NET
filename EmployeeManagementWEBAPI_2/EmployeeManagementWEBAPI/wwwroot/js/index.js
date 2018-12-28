const uri = 'api/employees/';
let employees = null;
var table;
$(document).ready(function () {
     table = $('#displayAllTable').DataTable({        
         "columnDefs": [
             {
                 "targets": 0,
                 "visible": false,
                 "searchable": false
             },
            {
                "targets": 9,
                "data": null,
                "render": function (data, type, row) {
                    var id = '"' + data[0] + '"';
                    var html = "<button onclick='editEmployee(this," + id + ")' >Edit</button>"
                    html += "<button onclick='deleteEmployee(this," + id + ")'>Delete</button>"
                    return html;
                }
            }
        ]
    });
    getAllEmployee();
});

function getAllEmployee() {    
    $.ajax({
        type: 'GET',
        url: uri +"GetAll",
        cache: false,
        success: function (data) {             
            $.each(data, function (key, item) {
                table.row.add([
                    item.id,
                    item.firstName,
                    item.lastName,
                    item.gender,
                    item.birth,
                    item.department,
                    item.address,
                    item.phone,
                    item.email,
                ]).draw();
            });
        }
    });
}

function reloadTable()
{
    location.href = '/index.html';
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
        success: function (data) {
            table.row.add([
                data.id,
                item.firstName,
                item.lastName,
                item.gender,
                item.birth,
                item.department,
                item.address,
                item.phone,
                item.email,
            ]).draw();      
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

function deleteEmployee(obj,id) {
    var confirmDelete = confirm("Are you sure to delete employee?");
    if (!confirmDelete)
    {
        return; 
    }
    $.ajax({
        url: uri + 'Delete/' + id,
        type: 'DELETE',
        success: function (result) {
            alert("delete successful!");
            table.row($(obj).parents('tr')).remove().draw();
        }
    });
}
var getCol;
function editEmployee(obj,id) {
    getCol = $(obj).parents('tr').children();
    $('#edit-id').val(id);
    $('#edit-firstName').val(getCol.eq(0).text());
    $('#edit-lastName').val(getCol.eq(1).text());
    $('#edit-gender').val(getCol.eq(2).text());
    $('#edit-birth').val(getCol.eq(3).text());
    $('#edit-department').val(getCol.eq(4).text());
    $('#edit-address').val(getCol.eq(5).text());
    $('#edit-phone').val(getCol.eq(6).text());
    $('#edit-email').val(getCol.eq(7).text());
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
            getCol.eq(0).text($('#edit-firstName').val());
            getCol.eq(1).text($('#edit-lastName').val());
            getCol.eq(2).text($('#edit-gender').val());
            getCol.eq(3).text($('#edit-birth').val());
            getCol.eq(4).text($('#edit-department').val());
            getCol.eq(5).text($('#edit-address').val());
            getCol.eq(6).text($('#edit-phone').val());
            getCol.eq(7).text($('#edit-email').val());
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
            table.clear().draw();
            $.each(data, function (key, item) {
                table.row.add([
                    item.id,
                    item.firstName,
                    item.lastName,
                    item.gender,
                    item.birth,
                    item.department,
                    item.address,
                    item.phone,
                    item.email,
                ]).draw();
            });
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


//校验
    $().ready(function () {
        // 在键盘按下并释放及提交后验证提交表单
        $("#addForm").validate({
            rules: {
                firstName: "required",
                lastName: "required",
                email: {
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



