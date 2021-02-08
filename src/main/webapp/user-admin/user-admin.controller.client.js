var $usernameFld
var $passwordFld
var $createBtn
var $updateBtn
var $firstNameFld
var $lastNameFld
var $roleFld
var $userRowTemplate
var $tbody
var userService = new AdminUserServiceClient();
var users=[];
var selectedUser=null

function main(){
    $usernameFld=$(".username-fld")
    $passwordFld=$(".password-fld")
    $firstNameFld=$(".firstName-fld")
    $lastNameFld=$(".lastName-fld")
    $roleFld=$(".role-fld")
    $createBtn=$(".wbdv-create")
    $updateBtn=$(".wbdv-update")
    $tbody=$(".wbdv-tbody")

    $createBtn.click(function(){
        createUser({
            username:$usernameFld.val(),
            password:$passwordFld.val(),
            firstname:$firstNameFld.val(),
            lastname:$lastNameFld.val(),
            role:$roleFld.val()
        })
    })

    $updateBtn.click(updateUser)

    userService.findAllUser().then(function (actualUsersFromServer){
        users=actualUsersFromServer
        renderUsers(users)
    })


}

function createUser(user){
    userService.createUser(user)
        .then(function(actualUser){
        users.push(actualUser)
        renderUsers(users)
    })
}

function findAllUsers(){

}

function findUserById(){

}

function deleteUser(event){
    console.log(event.currentTarget)
    var deleteBtn=jQuery(event.currentTarget)
    var theclass=deleteBtn.attr("class")
    var theindex=deleteBtn.attr("id")
    var theid=users[theindex]._id
    console.log(theclass)
    console.log(theindex)
    userService.deleteUser(theid).then(function(status){
        users.splice(theindex,1)
        renderUsers(users)
    })

}

function selectUser(event){
    var selectBtn=jQuery(event.currentTarget)
    var theid=selectBtn.attr("id")
    selectedUser=users.find(user =>user._id===theid)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstname)
    $lastNameFld.val(selectedUser.lastname)
    $roleFld.val(selectedUser.role)
}


function updateUser(){
    console.log(selectedUser)
    selectedUser.username=$usernameFld.val()
    selectedUser.password=$passwordFld.val()
    selectedUser.firstname=$firstNameFld.val()
    selectedUser.lastname=$lastNameFld.val()
    selectedUser.role=$roleFld.val()
    userService.updateUser(selectedUser._id,selectedUser)
        .then(function(status){
            var index=users.findIndex(user=>user.id===selectedUser._id)
            users[index]=selectedUser
            renderUsers(users)
    })
}


function renderUsers(users) {
    $tbody.empty()
    for (var i = 0; i < users.length; i++) {
            var user = users[i]
            $tbody
                .prepend(`
    <tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.role}</td>
        <td>
            <button class="wbdv-delete" id="${i}"><i class="fa-2x fa fa-times"></i></button>
            <button class="wbdv-select" id="${user._id}"><i class="fa-2x fa fa-pencil"></i></button>
        </td>
    </tr>`)
    }
    jQuery(".wbdv-delete").click(deleteUser)
    jQuery('.wbdv-select').click(selectUser)
}


jQuery(main)

