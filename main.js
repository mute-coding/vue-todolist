const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const newtodoText = ref('');
        // const index = ref(1);
        const todos = ref([]);
        const filter = ref('all');
        //目前頁數
        const currentPage = ref(1);
        //
        const limitList = 4;
        const filtertodos = computed(() => {
            if (filter.value === "completed") {
                return todos.value.filter(todo => todo.completed);
            } else if (filter.value === "pending") {
                return todos.value.filter(todo => !todo.completed);
            }
            return todos.value;
        });
        //換頁後function
        const newPage = computed(() =>{
            const start = (currentPage.value - 1)*limitList;
            return filtertodos.value.slice(start,start+limitList);
        })
        //總頁數
        const totalPages =computed(() =>{
            return Math.ceil(filtertodos.value.length/limitList);
        })
        const changeStatus = (index) => {
            const todo = todos.value[index];
            todo.completed = !todo.completed;
            todo.finishAt = todo.completed ? new Date().toISOString().split('T')[0] : "";
        };

        const setFilter = (type) => {
            filter.value = type;
        };

        const addList = () => {
            const item = newtodoText.value.trim();
            if (item) {
                todos.value.push({
                    id: Date.now(),
                    list: item,
                    createdAt: new Date().toISOString().split('T')[0],
                    finishAt: "",
                    completed: false
                });
                newtodoText.value = ''; // 清空輸入框
            }
        };
        const removeTodo = (index) => {
            if(confirm('確定要刪除嗎?')){
                const getList = newPage.value[index];
                const findListIndex = todos.value.findIndex(todo => todo.id === getList.id);
                if(findListIndex !== -1){
                    todos.value.splice(findListIndex, 1);
                }
            }
        };

        const nextPage = () =>{
            if(currentPage.value < totalPages.value){
                currentPage.value++;
            }
        }
        const postPage = () =>{
            if(currentPage.value > 1){
                currentPage.value--;
            }
        }
        return { 
            newtodoText, 
            todos, 
            filter, 
            filtertodos, 
            currentPage,
            newPage,
            totalPages,
            changeStatus, 
            setFilter, 
            addList, 
            removeTodo,
            nextPage,
            postPage
        };
    }
}).mount('#app');