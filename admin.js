async function getData(url, table) {
    const response = await fetch(url);
    const table_data = await response.json();
    var table = document.querySelector('#tbody')

    var state = {
        'querySet': table_data,
        'page': 1,
        'rows': 10
    }
    function pagination(querySet, page, rows) {
        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows
        var trimeData = querySet.slice(trimStart, trimEnd)
        var pages = Math.ceil(querySet.length / rows)
        return {
            'querySet': trimeData,
            'pages': pages
        }
    }
    buildTable()
    function pageButtons(pages) {
        var wrapper = document.getElementById("pagination_wrapper")
        wrapper.innerHTML = " "
        for (var page = 1; page <= pages; page++) {
            wrapper.innerHTML += `<button value=${page}  class="page btn btn-md m-2  btn-outline-primary">${page}</button>`
        }
        $('.page').on('click', function () {
            $('#tbody').empty();
            state.page = $(this).val()
            buildTable()
        })
    }
    $('#search_input').on('keyup', function () {
        var value = $(this).val()
        console.log('value:', value);
        var data = searchTable(value, table_data)

        // buildTable(data)
    })

    function searchTable(value, data) {
        var filterdArray = []
        for (var j = 0; j < data.length; j++) {
            value = value.toLowerCase()
            var name = data[j].name.toLowerCase()
            if (name.includes(value)) {
                filterdArray.push(data[j])
            }
            var email = data[j].email.toLowerCase()
            if (email.includes(value)) {
                filterdArray.push(data[j])
            }
            var role = data[j].role.toLowerCase()
            if (role.includes(value)) {
                filterdArray.push(data[j])
            }
        }
        return filterdArray

    }

    //buildTable()
    function buildTable() {
        var data = pagination(state.querySet, state.page, state.rows)
        console.log('table_data:', data);
        mylist = data.querySet
        for (let i = 0; i < mylist.length; i++) {
            var row = `<tr>
        <td>${mylist[i].id}</td>
        <td>${mylist[i].name}</td>
        <td>${mylist[i].email}</td>
        <td>${mylist[i].role}</td>
       <td ><i class="fas fa-edit text-info" ></i>
       <i class="fas fa-trash text-danger" ></i></td>
        </tr>`
            table.innerHTML += row
        }
        pageButtons(data.pages)
    }
    // function editData(){
    //     var testid=$(this).val("testid")
    //     var editBtn=$('#edit-${testid}')

    // }
    // function deleteData() {
    //     var testid=$(this).val("testid")
    //     var deleteBtn=$('#delete-${testid}')
    //   }
    // function deleteAll() {
    //     // document.querySelector('#delete').value=mylist
    //     document.querySelector("#id").value=remove()
    //   }

}
getData("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", document.querySelector("#table"))
