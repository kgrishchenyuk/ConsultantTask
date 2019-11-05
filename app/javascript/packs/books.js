$(function () {
    //Выделение книги
    $('#books').on('click', '.list-group-item', function() {
        if (!$(this).hasClass('active')) {
            $('#books .active').removeClass('active');
            $(this).addClass('active');
        }
    });
    //Создание книги
    $('#books .btn-success').on('click', function () {
        if (!$('#categories .active').length) {
            alert('Choose category first!')
        }
        else {
            $('#addBook form').attr('action', '/categories/' + $('#categories .active').attr('id') + '/books')
            $('#addBook').modal('show')
            $('#addBook').on('shown.bs.modal', function () {
                $('#addBook #book_name').focus()
            })
        }
    })
    //Редактирование книги
    $('#books .btn-warning').on('click', function () {
        if (!$('#categories .active').length) {
            alert('Choose a category first!')
        }
        else if (!$('#books .active').length){
            alert('Choose a book first!')
        }
        else {
            $('#editBook form').attr('action', '/categories/' + $('#categories .active').attr('id') + '/books/' + $('#books .active').attr('id'))
            $('#editBook form #book_name').val($('#books .active span').text())
            $('#editBook').modal('show')
            $('#editBook').on('shown.bs.modal', function () {
                $('#editBook #book_name').focus()
            })
        }
    })
    //Удаление книги
    $('#books .btn-danger').on ('click', function() {
        if (!$('#categories .list-group-item').hasClass('active')) {
            alert('Choose a catergory first!')
        }
        else if (!$('#books .list-group-item').length) {
            alert('The selected category has no books')
        }
        else if (!$('#books .list-group-item').hasClass('active')) {
            alert('Choose a book first!')
        }
        else {
            if (confirm('Are you sure to delete this book')) {
                $.ajax({
                    method: "DELETE",
                    url: '/categories/' + $('#categories .active').attr('id') + '/books/' + $('#books .active').attr('id'),
                    dataType: 'script'
                })
            }
        }
    })
})