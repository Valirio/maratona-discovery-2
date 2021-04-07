let data = [
    {
        id: 1,
        name: "Projeto da Pizzaria",
        "daily-hours": 10,
        "total-hours": 25,
        createdAt: Date.now(),
    },{
        id: 2,
        name: "Projeto da hanburgueria",
        "daily-hours": 15,
        "total-hours": 8,
        createdAt: Date.now(),
    },{
        id: 3,
        name: "Projeto da livraria",
        "daily-hours": 2,
        "total-hours": 4,
        createdAt: Date.now(),
    },{
        id: 4,
        name: "Projeto da lojinha",
        "daily-hours": 2,
        "total-hours": 1,
        createdAt: Date.now(),
    }
]

module.exports = {
    get(){
        return data;
    },
    update(newJobe){
        data = newJobe;
    },
    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id));
    }

}