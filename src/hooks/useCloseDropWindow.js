import { ref, onMounted, onUnmounted, reactive } from "vue"

export const useCloseDropWindow = (initial, classOpenTarget='mock', classCloseTarget='mock', classCrossClose='template') => {
    const isObject = initial instanceof Object;
    const isOpen = isObject ? reactive(initial) : ref(initial);
    
    const whereIsClicked = (e) => {
        const target = e.target;


        if (isObject) {
            for (let nameWindow in isOpen) {
                    let targetForOpen = isOpen[nameWindow][1];
                    let targetForClose = isOpen[nameWindow][2];

                    if (!target.closest("." + targetForClose)) {
                        if (isOpen[nameWindow][0] !== false) isOpen[nameWindow][0] = false;
                    }
                    
                    if (target.closest("." + targetForOpen) && !target.closest("." + targetForClose)) {
                        if (isOpen[nameWindow][0] !== true) isOpen[nameWindow][0] = true;
                    }
                }
            }
        else {
            if (!target.closest("." + classCloseTarget) || target.closest("." + classCrossClose)) isOpen.value = false;
            if (target.closest("." + classOpenTarget) && !target.closest("." + classCloseTarget)) isOpen.value = true;
        }

    }

    onMounted(() => {
        document.addEventListener('click', whereIsClicked);
    })

    onUnmounted(() => {
        document.removeEventListener('click', whereIsClicked);
    })

    return isObject ? isOpen : [isOpen];
}

