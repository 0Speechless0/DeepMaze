<script setup>
import { ref,reactive, watch } from 'vue';
import PlayMaze from '../components/playMaze.vue';

const wallStartPos = ref([]);
const wallEndPos = ref([]);

const tryPlay = ref(false);
const setStatus = ref(0);
const mazeHistoryIndex = ref(-1);
const historyTop = ref(0);
const maze = reactive(  { 
    value : [],
    startPos : [],
    size : 20
});

maze.value = generateMaze();
localStorage.clear();

function generateMaze() {
    let array = [];
    for(let i=0; i < maze.size; i ++) {
        array[i] = [];
        for(let j=0;j < maze.size; j++) 
        array[i][j] = "white";
    
    }     
    console.log(array)
    return array;  
}

function setStartPos(col, row) {
    wallStartPos.value = [col, row];

}

function setEndPos(col, row) {

    wallEndPos.value = [col, row];
    console.log(wallEndPos.value, wallStartPos.value)
    if(setStatus.value != 0) return;
    if(wallEndPos.value[0] == wallStartPos.value[0] && wallEndPos.value[1] == wallStartPos.value[1]) 
        drawBlock(wallEndPos.value[0], wallEndPos.value[1]);
    else if(wallEndPos.value[0] == wallStartPos.value[0]) {
        drawVerticalWall();
    }
    else writeBeveledWall();
    // console.table(maze.value);

    mazeHistoryIndex.value ++;
    historyTop.value = mazeHistoryIndex.value;
    localStorage.setItem(mazeHistoryIndex.value, JSON.stringify(maze.value) );    

       
    
}

function drawVerticalWall() {
    
    let startPos = wallStartPos.value;
    let endPos  = wallEndPos.value;

    if(wallStartPos.value[1] >= wallEndPos.value[1]) {
            startPos = wallEndPos.value;
            endPos = wallStartPos.value;
    }
    for(let i = 0; i <= endPos[1] - startPos[1]; i++) {
        drawBlock(wallStartPos.value[0] , wallStartPos.value[1] +i);
    }
}

function writeBeveledWall() {
    let startPos = wallStartPos.value;
    let endPos  = wallEndPos.value;

    let slop = (startPos[1] - endPos[1])/ (startPos[0] - endPos[0]) ;
    console.log(slop);
    let time =0;

    if(Math.abs(slop) >= 1) {

        
        if(wallStartPos.value[1] >= wallEndPos.value[1]) {
            startPos = wallEndPos.value;
            endPos = wallStartPos.value;
        }

        while(startPos[1] +time <= endPos[1]) {
            console.log("123");
            let target = startPos[0] + (1/slop)*time;
            target = Math.round(target);
            drawBlock(target, startPos[1] +time );
            time ++;
        }
    
    } 
    else {
        if(wallStartPos.value[0] >= wallEndPos.value[0]) {
           
            startPos = wallEndPos.value;
            endPos = wallStartPos.value;
        }
        
        while(startPos[0] +time <= endPos[0]) {
            
            let target = startPos[1] + slop*time;
            target = Math.round(target);
            drawBlock(startPos[0] +time, target );
            time ++;
        }
    
    } 


}

function drawBlock(col, row, color = "black") {
 
    
    console.log("draw", col, row);
    if(maze.value[row][col] == "white") maze.value[row][col] = color ;
}

function exChange(ar1, ar2) {
    let temp =ar2;
    ar2= ar1;
    ar1 = temp;
}

function recoveryMaze() {
    if(mazeHistoryIndex.value <= 0) return;
    console.log("sdf");
    mazeHistoryIndex.value --;
    maze.value = JSON.parse(localStorage.getItem(mazeHistoryIndex.value));
    
    console.table(maze.value);
}
function recoveryRecoveryMaze() {
    if(mazeHistoryIndex.value >= historyTop.value) return;

    mazeHistoryIndex.value ++;
    maze.value = JSON.parse(localStorage.getItem(mazeHistoryIndex.value));
    
    console.table(maze.value);
}


function clickPos(col, row) {
    console.log("clickPos");
    switch(setStatus.value) {
        case 1 : 
            if(maze.startPos.length > 0) maze.value[maze.startPos[1]][maze.startPos[0]] = 'white'
            maze.startPos = [col, row] ; 
            drawBlock(col, row, "red")
            break;
    }

    setStatus.value = 0;
}


function tryPlayAction() {
    if(maze.startPos.length ==0) {
        alert("未設置起始點")
        return;
    }
    tryPlay.value = !tryPlay.value;
}






</script>
<template>
    <div class="container pt-1" >
        <div class="row" >
            <div class="col mt-2" v-if="!tryPlay">

                <div v-for="(maze_row, rowIndex) in maze.value" class="d-flex justify-content-center " style="height:25px">
                    <div v-for="(maze_col, index) in maze_row" :style="{border:'1px solid ', width: '25px', backgroundColor : maze.value[rowIndex][index] }" 
                    @mousedown.prevent="setStartPos(index, rowIndex)"
                    @mouseup.prevent = "setEndPos(index, rowIndex)"
                    @click="clickPos(index, rowIndex)"
                    >
                    
                        
                    </div>
                </div>


            </div>
            <div class="col mt-2" v-else="tryPlay">
                <PlayMaze :maze="maze" :sightDist="4"   /> 
            </div>

            <div class="col" v-if="!tryPlay">
                <div class="d-flex justify-content-start m-2 ">
                    <button @click="recoveryMaze" value="<" class="btn btn-outline-primary "> &larr;  </button>

                    <button @click="recoveryRecoveryMaze" value=">" class="btn btn-outline-primary "> &rarr; </button>
   
                    <button @click="tryPlayAction " value="試玩" class="btn btn-outline-success pl-2"> 試玩</button>
                    
                 </div>
                 <div class="d-flex justify-content-start">
                    <button class="btn btn-outline-danger m-2" @click="setStatus = 1">設置起始</button>
                 </div>
            </div>
            <div class="col" v-else >
                <div class="d-flex justify-content-between m-2 ">
                    <button @click="tryPlayAction " value="試玩" class="btn btn-outline-success"> 編輯</button>

                 </div>

            </div>

        </div>


            
    </div>
</template>
