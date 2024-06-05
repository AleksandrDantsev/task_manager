<script setup>
import { ref } from "vue";
import { capitalize } from "../../../../helpers/capitalize";
import { useStore } from "vuex";
const props = defineProps({
    data: Object,
    id: Number,
    date: String,
    dataInfoUser: Object,
});

const store = useStore();
const isOpenEdit = ref(false);
const changedTextInput = ref(props.data.name);

const allowEditAndSubmit = () => {
    if (isOpenEdit.value === false) {
        isOpenEdit.value = true;
    }
    else {
        const capitalizeText = capitalize(changedTextInput.value);
        if (capitalizeText.length) {
            const nameProject = store.state.projectsStore.currentProject;
            store.commit("changeFieldCommentOrSubtask", [
                props.date, 
                props.id, 
                props.data.id, 
                capitalizeText,
                "comments",
                "name",
                nameProject,
            ]);
            isOpenEdit.value = false;
        }
    }
}

const deleteComment = () => {
    const nameProject = store.state.projectsStore.currentProject;
    store.commit("deleteCommentOrSubtask", [props.date, props.id, props.data.id, "comments", nameProject])
}

const changeTextComment = (e) => {
    changedTextInput.value = e.target.value;
}

</script>

<template>
    <div class="comment">
        <div class="line-info">
            <div class="line-info__user">
                <div class="name">{{ props.data["creator"] }}</div>
                <div class="time">{{ props.data["time"] }}</div>
            </div>
            <div class="line-info__user-actions">
                <button type="button" class="edit-button" @click.prevent="allowEditAndSubmit">
                    <span v-if="!isOpenEdit">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="17" height="17" fill="none" viewBox="0 0 192 192">
                            <g stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="12">
                                <path d="M26.25 131.62 22 170l38.38-4.25L170 56.07V43.14L148.86 22h-12.93zm98.17-96.96 31.67 31.67" class="cls-1"/>
                                <path stroke-miterlimit="5" d="M117.73 73.92 64.85 126.8"/>
                            </g>
                        </svg>
                    </span>
                    <span v-else >
                        <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.7 14.3 9.6 19 20.3 5"/></svg>
                    </span>
                </button>
                <button type="button" class="delete-button" @click.prevent="deleteComment">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24">
                        <g stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M9 5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9V5Z"/>
                            <path d="M9 5H7a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3m5-16h2a2 2 0 0 1 2 2v5m-5 4 2.5 2.5M19 21l-2.5-2.5m0 0L19 16m-2.5 2.5L14 21"/>
                        </g>
                        </svg>
                </span>
                </button>
            </div>
        </div>
        <div class="text-comment">
            <div class="avatar-creator">
                <img src="" alt="">
            </div>
            <input type="text"
                class="input-comment"
                @keydown.prevent.enter="allowEditAndSubmit"
                @input.prevent="changeTextComment"
                :class="{'allow-edit-input': isOpenEdit}" 
                :value="changedTextInput">
        </div>
    </div>    
</template>

<style scoped lang="scss">
    
    .input-comment {
        width: 100%;
        max-width: 100%;
        min-height: min-content;
        pointer-events: none;
        outline: solid 1px transparent;
        padding: 10px;
        border-radius: 8px;
    }
    .allow-edit-input {
        pointer-events: unset;
        outline-color: #e9e9e9;
    }
    $fontSizeLine: 12px;

    @mixin styleLineInfo($size: 13px, $color:#5f5f5f) {
        font-size: $size;
        color: $color;
    }

    .comment {
        width: 100%;
        margin: 20px 0;
    }
    .line-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 25px;
    }
    .line-info__user {
        display: flex;
        @include styleLineInfo;
        div {
            margin-right: 5px;
        }
    }
    .line-info__user-actions {
        button {
            cursor: pointer;
            svg path{
                transition-duration: 400ms;     
            }
            &:hover path {
                stroke: #da0404da;
            }
        }
    }
    .time {
        margin-left: 10px;
        @include styleLineInfo(12px, #a3a3a3)
    }
    .text-comment {
        @include styleLineInfo(16px);
        padding: 15px 10px 25px 10px;
        border-bottom: 1px solid #e6e6e6;
    }
    .edit-button {
        @include styleLineInfo;
        margin-right: 8px;
    }
    .delete-button {
        @include styleLineInfo;
    }
</style>