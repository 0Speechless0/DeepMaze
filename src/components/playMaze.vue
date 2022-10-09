<script setup>

import { reactive ,ref, onUnmounted, onMounted } from 'vue';
const props = defineProps(['maze', "sightDist"]);



function initMazeRender() {
    let length = 2*props.sightDist+1;
    for(let i =0; i < length ; i++) {
        mazeRender.value[i] = [];
        for(let j=0; j < length ; j++) {
            mazeRender.value[i][j] = "lightgray";
        }
    }
}

function generateSight() {
    let maze = props.maze.value;
    let Pos = [   
        startPos[0] -1,
        startPos[1] + 1
    ] ;
    // let nextRef = ref(path.next);
    // nextRef.value = { id :1, next :ref({}) };
    // console.log("next", path.next);
    // nextRef =   nextRef.value.next;
    // nextRef.value = {id:2, next :{} };
    // console.log("next2", path.next);
    let speed =2;
    let loop = 0 ;

    let sqrSightDist = props.sightDist*props.sightDist;
    while(
        loop < props.sightDist
    ) {
            for(let i = 0 ; i < 4; i ++) {
                let j = 1;
                for(j=1; j<= speed ; j ++) {
                    
                    switch(i) {
                        case 0 : 
                            Pos = [ Pos[0]+1, Pos[1]];
                            break;
                        case 1 : 
                            Pos = [ Pos[0], Pos[1]-1];
                            break;
                        case 2 : 
                            Pos = [ Pos[0]-1, Pos[1]];
                            break;
                        case 3 : 
                            Pos = [ Pos[0],Pos[1]+1];
                            break;

                    }
                    
                    let relativeRow = Pos[1] + props.sightDist - startPos[1];
                    let relativeCol = Pos[0] + props.sightDist - startPos[0];
                    if( 
                        (startPos[0] - Pos[0])*(startPos[0] - Pos[0]) 
                        +(startPos[1] - Pos[1])*(startPos[1] - Pos[1]) >= sqrSightDist) {
                            mazeRender.value[relativeRow ][relativeCol ] = "lightgray";
                            continue;
                    }
                    if(         
                        Pos[0] <0 ||
                        Pos[0] >= props.maze.size ||
                        Pos[1] < 0 ||
                        Pos[1] >= props.maze.size) {
                            mazeRender.value[relativeRow ][relativeCol ] = "black";
                            continue;
                        }
                    
                    // nextRef.value = { col :relativeCol , row : relativeRow , next : ref({}) }    ;
                    // nextRef = nextRef.value.next ;
                    if(props.maze.value[Pos[1]][Pos[0]] == 'red'){
                        mazeRender.value[relativeRow ][relativeCol ] = "white";
                    }   
                    else {
                        mazeRender.value[relativeRow ][relativeCol ] = props.maze.value[Pos[1]][Pos[0]];
                    }
                

                }
            }
            Pos = [ Pos[0]-1,Pos[1]+1];
            speed +=2 ;
            loop ++; 
    }

    console.log("mazeRender", mazeRender);
    
console.log("maze", props.maze);
}



let startPos = reactive(props.maze.startPos);

// const path = {
//     col : startPos.value[0] -1,
//     row : startPos.value[1] + 1,
//     next : ref({}),
// };

const mazeRender = ref([]);

initMazeRender();
generateSight();


// console.log("path", path.next);  
// let pt =path;
// console.log("pt", pt);
// do {
//     console.log(pt.col, pt.row );
   
    
// }while(pt = pt.next.value)
function keyboardHandler(e) {
    let cmd = String.fromCharCode(e.keyCode).toLowerCase();
    switch(cmd) {
        case "a" : 
            if(mazeRender.value[props.sightDist][props.sightDist -1 ] == "black") return;
            break;
        case "w" :
            if(mazeRender.value[props.sightDist -1 ][props.sightDist  ] == "black") return;
            break;
        case "d" : 
            if(mazeRender.value[props.sightDist][props.sightDist +1 ] == "black") return;
            break;
        case "s" :
            if(mazeRender.value[props.sightDist +1 ][props.sightDist  ] == "black") return;
            break;

    }
    switch(cmd) {
        case "a" : 
            startPos = [ startPos[0] -1, startPos[1]]; break;
        case "w" :
            startPos = [ startPos[0], startPos[1] - 1] ;break;
        case "d" : 
            startPos = [startPos[0]+1, startPos[1]]; break;
        case "s" :
            startPos = [startPos[0], startPos[1] +1];break;

    }
    console.log(startPos[0], startPos[1]);
    generateSight(startPos);
}

onMounted( () => {
    console.log('mounted');
    window.addEventListener('keypress', keyboardHandler)
});

onUnmounted( () => {
    window.removeEventListener('keypress', keyboardHandler);
})
</script>


<template>
    <div class="container" >
        <div class="d-flex justify-content-center" v-for=" (row, rowIndex) in mazeRender">


        <div    v-for="(col, index) in row" :style="{backgroundColor : mazeRender[rowIndex][index], width: '25px', height: '25px'  }" >
           
            <div v-if="rowIndex == sightDist && index == sightDist ">
                <img src="./icons/Screenshot_1.png" width="25" height="25" /> 
            </div>
        </div>

        </div>
    </div>

</template>