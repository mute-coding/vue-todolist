const {createApp,ref,computed} = Vue;
createApp({
    setup(){
        const todos = ref(
            [
                {id:1,list:'打掃房間',createdAt:'2025/02/20',finishAt:'2025/02/21',completed:true},
                {id:2,list:'背英文單字、做習題',createdAt:'2025/02/22',finishAt:'',completed:false}
            ]
        )
        const filter = ref('all');
        const filtertodos = computed(()=>{
            if (filter.value === "completed") {
                return todos.value.filter(todo => todo.completed);
            } else if (filter.value === "pending") {
                return todos.value.filter(todo => !todo.completed);
            }
            return todos.value;
        })
        const changeStute = (index) =>{
            const todo = todos.value[index];
            todo.completed = !todo.completed;
            todo.finishAt = todo.completed ? new Date().toISOString().split('T')[0] : "";
        }
        const setFilter = (type) => {
            filter.value = type;
        }
        return {todos,changeStute,filter,filtertodos,setFilter};
    }
}).mount('#app');