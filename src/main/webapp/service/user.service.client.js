function AdminUserServiceClient(){
    this.createUser=createUser;
    this.findAllUser=findAllUsers;
    this.findUserById=findUserById;
    this.deleteUser=deleteUser;
    this.updateUser=updateUser;
    this.url='https://wbdv-generic-server.herokuapp.com/api/001053190/users';
    var self=this;
    function createUser(user){
        return fetch(self.url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
        },
            body: JSON.stringify(user)
    }).then(function(response){
        return response.json()
        })


    }
    function findAllUsers(){
        var promise= fetch(self.url)
        return promise.then(function(response){
            console.log(response)
            return response.json()
        })

    }

    function findUserById(userId){

    }

    function updateUser(userId,user){
        return fetch(`${self.url}/${userId}`,
            {method:'PUT',
            headers:{
                'content-type':'application/json'
            },
                body: JSON.stringify(user)
            }).then(response=>response.json())


    }
    function deleteUser(userId){
        return fetch(`${self.url}/${userId}`,
            {method:'DELETE'})

    }
}