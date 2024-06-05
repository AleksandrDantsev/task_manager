<script setup>
import { ref, computed } from 'vue';
import CommentUnit from '../CommentUnit/CommentUnit.vue';
import { useStore } from 'vuex';
import { capitalize } from "../../../../helpers/capitalize";
import buttonSendRed from '../../../../UI/button-send-red.vue';
import { getReadableDate } from '../../../../helpers/getReadableDate';
import { getHoursAndMin } from "../../../../helpers/getHoursAndMin";

const store = useStore();
const props = defineProps({
    date: String,
    id: Number,
});

const commentText = ref('');
const tasks = computed(() => {
    const nameProject = store.state.projectsStore.currentProject;
    return store.state.infoTask.tasksLocalArray[nameProject];
});

const listComments = computed(() => {
    if (props.date && tasks.value?.[props.date]) {
        return tasks.value[props.date].find(el => el.id === props.id)?.['comments']; 
}
    return [];
})

const dataInfoUser = computed(() => store.state.infoUser.infoUserState);

const sendComment = () => {
    const formatedText = capitalize(commentText.value)
    const idComment = (new Date).getTime();

    const creator = `${dataInfoUser.value["firstName"]} ${dataInfoUser.value["lastName"]}`;
    const timeCreated = `${getReadableDate()} ${getHoursAndMin()}`;
    const comment = { 
        creator: creator,
        name: formatedText,
        time: timeCreated,
        id: idComment, 
    } 
    if (formatedText.length > 0) {
        const nameProject = store.state.projectsStore.currentProject;
        store.commit("addCommentOrSubtask", [props.date, props.id, comment, "comments", nameProject]);
        commentText.value = '';
    }
}

const getTextComment = (e) => {
    commentText.value = e.target.value;
}

</script>
<template>
    <div class="comments-field">
        <div class="top-line-comments">
            <div class="icon">
                <svg width="18" height="18" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg" fill="#b3b3b3"><path fill-rule="evenodd" clip-rule="evenodd" d="m4 11.29 1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5v1.79zM10.29 13l1.86 1.85.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5h3.79zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14-.35-.15z"/></svg>
            </div>
            <div class="title">Comments</div>
            <div class="counter-comments">{{ listComments?.length || 0 }}</div>
        </div>
        <div class="comments">
            <CommentUnit v-for="item of listComments"
                        :key="item.id"
                        :data="item"
                        :id="props.id"
                        :date="props.date"
                        :dataInfoUser="dataInfoUser"
            />

        </div>
        <div class="comment-input-wrapper">
            <div class="comment-input">
                <textarea @input="getTextComment" 
                        @keydown.enter.prevent="sendComment"
                        :value="commentText" 
                        type="text" 
                        placeholder="Text"></textarea>
            </div>
            <div class="send-button-conteiner">
                <div class="send-button" :class="{'disallow-click': !commentText.length}">
                    <buttonSendRed :text="'Send'" @click="sendComment" />
                </div>
            </div>
        </div>
    </div>
        
</template>

<style lang="scss" scoped>
    $heightInputWrapper: 25%;
    .comment-input-wrapper {
        position: fixed;
        z-index: 10;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px 25px 0 25px;
        height: $heightInputWrapper;
        background-color: #f5f5f5d8;
        box-shadow: 0 -10px 20px 0 #fff;
    }

    $baseColor: #e01212;
    .comments-field {
        width: 100%;
    }
    .disallow-click {
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
    }
    .top-line-comments {
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: solid 1px #e6e6e6;
    }
    .icon,
    .title {
        margin-right: 10px;
    }
    .counter-comments {
        padding: 1px 4px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 16px;
        background-color: $baseColor;
        color: #fff;
    }
    .comments {
        width: 100%;
        height: auto;
        padding: 15px 5px;
    }
    .comment-input {
        padding: 10px 0;
        textarea {
            width: 100%;
            height: 100%;
            padding: 12px;
            background-color: #fff;
            resize: none;
        }
    }
    .send-button {
        width: 120px;
        height: 35px;
    }
    .send-button-conteiner {
        display: flex;
        width: 100%;
        justify-content: end;
    }

</style>