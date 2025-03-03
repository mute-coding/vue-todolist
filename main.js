const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const newtodoText = ref('');
        const index = ref(1);
        const todos = ref([]);
        const filter = ref('all');

        const filtertodos = computed(() => {
            if (filter.value === "completed") {
                return todos.value.filter(todo => todo.completed);
            } else if (filter.value === "pending") {
                return todos.value.filter(todo => !todo.completed);
            }
            return todos.value;
        });

        const changeStatus = (idx) => {
            const todo = todos.value[idx];
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
                    id: index.value++,
                    list: item,
                    createdAt: new Date().toISOString().split('T')[0],
                    finishAt: "",
                    completed: false
                });
                newtodoText.value = ''; // 清空輸入框
            }
        };

        const removeTodo = (idx) => {
            todos.value.splice(idx, 1);
        };

        return { 
            newtodoText, 
            todos, 
            filter, 
            filtertodos, 
            changeStatus, 
            setFilter, 
            addList, 
            removeTodo 
        };
    }
}).mount('#app');