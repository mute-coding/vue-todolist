const {createApp,ref,computed} = Vue;
createApp({
    setup(){
        const todos = ref(
            [
                {id:1,list:'打掃房間',createdAt:'2025/02/20',finishAt:'2025/02/21',completed:true},
                {id:2,list:'背英文單字、做習題',createdAt:'2025/02/22',finishAt:'',completed:false}
            ]
        )
        return {todos};
    }
}).mount('#app');