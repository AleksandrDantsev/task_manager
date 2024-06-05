<script setup>
    import { ref } from "vue";
    import { capitalize } from "../../helpers/capitalize";
    import { useStore } from "vuex"
    const store = useStore();
    const inputNameProject = ref('');

    const setInputName = (e) => {
        inputNameProject.value = e.target.value;
    }

    const addProject = () => {
        if (inputNameProject.value.length) {
            const capitilizedInputText = capitalize(inputNameProject.value);

            store.commit("createProject", capitilizedInputText);
            inputNameProject.value = "";
        }
    }
</script>

<template>
    <div class="add-project-conteiner">
        <div class="title-add-project">Project creation</div>
        <div class="form-add-project">
            <input class="input-add-project" 
                :value="inputNameProject" 
                type="text" 
                placeholder="Inter a name" 
                @input.prevent="setInputName">

            <button class="button-add-project" 
                type="button" 
                @click.prevent="addProject">Create</button>
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    .title-add-project {
        border-bottom: solid 1px #e6e6e6;
        padding-bottom: 15px;
        color: #555454;
        font-size: 18px;
    }
    .add-project-conteiner {
        padding: 30px 25px;
        width: 100%;
        height: 100%;
    }
    .form-add-project {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        height: 100%;
    }
    .input-add-project {
        width: 100%;
        height: 40px;
        border-radius: 6px;
        padding: 0 15px;
        background-color: #f0f0f04b;
        outline: solid 1px #e6e6e6;
    }
    .button-add-project {
        width: 40%;
        height: 40px;
        border-radius: 6px;
        align-self: end;
        color: #fff;
        cursor: pointer;
        background-color: #cf1818;
        &:hover {
            background-color: #df1b1b;
        }
    }
</style>