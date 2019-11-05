$(function () {
    //Клик по кнопке раскрыть
    $('#categories').on('click', '.fa-plus', function(e) {
        e.stopPropagation();
        let cur_level = parseInt($(this).parent().attr('data-level'));
        let exp_items = $(this).parent().nextAll();
        $(this).removeClass('fa-plus');
        $(this).addClass('fa-minus');
        exp_items.each(function() {
            if (parseInt($(this).attr('data-level')) == cur_level) {
                return false;
            }
            if (parseInt($(this).attr('data-level')) == (cur_level + 1)) {
                $(this).slideDown()
            }
        })
    })
    //Клик по кнопке свернуть
    $('#categories').on('click', '.fa-minus', function (e) {
        e.stopPropagation();
        let cur_level = parseInt($(this).parent().attr('data-level'));
        let exp_items = $(this).parent().nextAll();
        $(this).removeClass('fa-minus');
        $(this).addClass('fa-plus');
        exp_items.each(function() {
            if (parseInt($(this).attr('data-level')) <= cur_level) {
                return false;
            }           
            $(this).slideUp();
            $(this).children('.fa-minus').addClass('fa-plus');
            $(this).children('.fa-minus').removeClass('fa-minus');     
        })
    })
    //Выделение категории и отображение книг, находящихся в ней
    $('#categories').on('click', '.list-group-item', function() {
        if ($('#books .active').length) {
            $('#books .active').stop(true, false);  //Останавливаем анимацию c предыдущей вкладки с книгами
            if ($('#books .btn').prop('disabled')) {
                $('#books .btn').prop('disabled', false)    //Включаем кнопки для книг    
            }
        }
        if (!$(this).hasClass('active')) {
            $('#categories .active').removeClass('active');
            $(this).addClass('active');
            $.ajax({
                method: "GET",
                url: '/categories/' + $(this).attr('id') + '/books',
                dataType: 'script'
            })
        }
        else {
            $('#categories .active').removeClass('active');
            $('#books .list-group').empty();
            $('#books .list-group').append('<span>Choose category first</span>')
        }
    })
    //Создание категории
    $('#categories .btn-success').on('click', function() {
        $('#addCategory form').attr('action', '/categories')
        if ($('#categories .active').length) {
            $('#addCategory #category_supercategory_id').val($('#categories .active').attr('id'))
            $('#addCategory #category_level').val(parseInt($('#categories .active').data('level')) + 1)
        }
        else {
            $('#addCategory #category_supercategory_id').val('')
            $('#addCategory #category_level').attr('value', '1')
        }
        $('#addCategory').modal('show')
        $('#addCategory').on('shown.bs.modal', function() {
            $('#addCategory #category_name').focus()
        })
    })
    //Редактирование категории
    $('#categories .btn-warning').on('click', function() {
        if ($('#categories .active').length) {
            $('#editCategory form').attr('action', '/categories/' + $('#categories .active').attr('id'))
            $('#editCategory form #category_name').val($('#categories .active span').text())
            $('#editCategory').modal('show')
            $('#editCategory').on('shown.bs.modal', function () {
                $('#editCategory #category_name').focus()
            })
        }
        else {
            alert('Choose category first!')
        }
    })
    //Удаление категории, ее подкатегорий и всех книг, содержащихся там
    $('#categories .btn-danger').on('click', function() {
        if ($('#categories .active').length) {
            if (confirm('Are you sure to delete this category? This will delete its books and all connected categories and their books also!')) {
                $.ajax({
                    method: "DELETE",
                    url: '/categories/' + $('#categories .active').attr('id'),
                    dataType: 'script'
                })
            }
        }
        else {
            alert('Choose category first!')
        }
    })
})